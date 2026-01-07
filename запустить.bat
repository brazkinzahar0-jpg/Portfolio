@echo off
chcp 65001 >nul 2>&1
cls
echo ========================================
echo    Запуск премиум портфолио
echo ========================================
echo.

REM Получение пути к скрипту
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM Проверка наличия Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Node.js не найден!
    echo.
    echo Попытка установки Node.js...
    echo.
    
    REM Попытка установки через winget
    where winget >nul 2>&1
    if not errorlevel 1 (
        echo Установка через winget...
        winget install --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements --silent 2>nul
        if errorlevel 1 (
            echo Не удалось установить через winget.
        ) else (
            echo Установка завершена! Обновите PATH и перезапустите скрипт.
            echo.
            echo Для обновления PATH закройте и откройте командную строку заново.
            pause
            exit /b 0
        )
    )
    
    echo.
    echo ========================================
    echo   Node.js не установлен!
    echo ========================================
    echo.
    echo Пожалуйста, установите Node.js вручную:
    echo 1. Перейдите на https://nodejs.org/
    echo 2. Скачайте LTS версию (20.x или выше)
    echo 3. Установите её
    echo 4. Перезапустите этот файл
    echo.
    echo Или установите через winget вручную:
    echo   winget install OpenJS.NodeJS.LTS
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js найден
node --version
npm --version
echo.

REM Переход в директорию скрипта (на всякий случай)
cd /d "%SCRIPT_DIR%"

REM Проверка наличия package.json
if not exist "package.json" (
    echo [ОШИБКА] Файл package.json не найден!
    echo Убедитесь, что вы запускаете скрипт из правильной директории.
    pause
    exit /b 1
)

REM Проверка наличия node_modules
if not exist "node_modules" (
    echo Установка зависимостей...
    echo Это может занять 1-2 минуты...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ОШИБКА] Не удалось установить зависимости!
        echo Попробуйте выполнить вручную: npm install
        pause
        exit /b 1
    )
    echo.
    echo [OK] Зависимости установлены!
    echo.
) else (
    echo [OK] Зависимости уже установлены
    echo.
)

REM Запуск dev сервера
echo ========================================
echo   Запуск сервера разработки...
echo ========================================
echo.
echo Сервер запускается на http://localhost:3000
echo.
echo Нажмите Ctrl+C для остановки сервера
echo.
echo ========================================
echo.
echo Открытие браузера через 5 секунд...
echo.

REM Запуск браузера через 5 секунд в фоне
start "" cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"

REM Запуск dev сервера
call npm run dev

pause
