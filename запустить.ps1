# Скрипт автоматической установки и запуска портфолио
# PowerShell скрипт

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Запуск премиум портфолио" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Функция проверки команды
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Проверка наличия Node.js
if (-not (Test-Command node)) {
    Write-Host "[ОШИБКА] Node.js не найден!" -ForegroundColor Red
    Write-Host ""
    
    # Попытка установки через winget
    if (Test-Command winget) {
        Write-Host "Попытка установки Node.js через winget..." -ForegroundColor Yellow
        try {
            winget install --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
            Write-Host "[OK] Node.js установлен!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Перезапустите скрипт после установки." -ForegroundColor Yellow
            Read-Host "Нажмите Enter для выхода"
            exit
        } catch {
            Write-Host "[ОШИБКА] Не удалось установить через winget" -ForegroundColor Red
        }
    }
    
    # Попытка установки через Chocolatey
    if (Test-Command choco) {
        Write-Host "Попытка установки Node.js через Chocolatey..." -ForegroundColor Yellow
        try {
            choco install nodejs-lts -y
            Write-Host "[OK] Node.js установлен!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Перезапустите скрипт после установки." -ForegroundColor Yellow
            Read-Host "Нажмите Enter для выхода"
            exit
        } catch {
            Write-Host "[ОШИБКА] Не удалось установить через Chocolatey" -ForegroundColor Red
        }
    }
    
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   Node.js не установлен!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Пожалуйста, установите Node.js вручную:" -ForegroundColor Yellow
    Write-Host "1. Перейдите на https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Скачайте LTS версию" -ForegroundColor White
    Write-Host "3. Установите её" -ForegroundColor White
    Write-Host "4. Перезапустите этот скрипт" -ForegroundColor White
    Write-Host ""
    Write-Host "Или установите через winget:" -ForegroundColor Yellow
    Write-Host "  winget install OpenJS.NodeJS.LTS" -ForegroundColor White
    Write-Host ""
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "[OK] Node.js найден" -ForegroundColor Green
node --version
npm --version
Write-Host ""

# Переход в директорию скрипта
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Проверка наличия node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Установка зависимостей..." -ForegroundColor Yellow
    Write-Host "Это может занять 1-2 минуты..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "npm install завершился с ошибкой"
        }
        Write-Host ""
        Write-Host "[OK] Зависимости установлены!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host ""
        Write-Host "[ОШИБКА] Не удалось установить зависимости!" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Read-Host "Нажмите Enter для выхода"
        exit 1
    }
} else {
    Write-Host "[OK] Зависимости уже установлены" -ForegroundColor Green
    Write-Host ""
}

# Открытие браузера автоматически (через 5 секунд после запуска)
$job = Start-Job -ScriptBlock {
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"
}

# Запуск dev сервера
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Запуск сервера разработки..." -ForegroundColor Cyan
Write-Host "========================================" -Foreground Cyan
Write-Host ""
Write-Host "Сервер запускается на http://localhost:3000" -ForegroundColor Green
Write-Host "Браузер откроется автоматически через несколько секунд" -ForegroundColor Yellow
Write-Host ""
Write-Host "Нажмите Ctrl+C для остановки сервера" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    npm run dev
} finally {
    # Остановка фонового процесса открытия браузера
    Stop-Job $job -ErrorAction SilentlyContinue
    Remove-Job $job -ErrorAction SilentlyContinue
}


