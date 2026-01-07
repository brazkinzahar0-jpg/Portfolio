@echo off
title Запуск портфолио
color 0A
cls

echo.
echo    ====================================
echo        ЗАПУСК ПОРТФОЛИО
echo    ====================================
echo.

REM Переход в директорию скрипта
cd /d "%~dp0"

REM Проверка Node.js
where node >nul 2>&1
if errorlevel 1 (
    color 0C
    echo    [X] Node.js НЕ УСТАНОВЛЕН
    echo.
    echo    Скачайте и установите Node.js с:
    echo    https://nodejs.org/
    echo.
    echo    Выберите LTS версию (20.x или выше)
    echo.
    echo    После установки перезапустите этот файл.
    echo.
    pause
    start https://nodejs.org/
    exit /b 1
)

color 0A
echo    [OK] Node.js установлен
for /f "tokens=*" %%i in ('node --version') do echo    Версия: %%i
echo.

REM Установка зависимостей
if not exist "node_modules" (
    echo    Установка зависимостей (первый запуск)...
    echo    Подождите 1-2 минуты...
    echo.
    call npm install
    if errorlevel 1 (
        color 0C
        echo.
        echo    [X] Ошибка при установке зависимостей
        pause
        exit /b 1
    )
    echo.
    echo    [OK] Зависимости установлены!
    echo.
)

REM Запуск
color 0B
echo    ====================================
echo    ЗАПУСК СЕРВЕРА...
echo    ====================================
echo.
echo    Сайт будет доступен по адресу:
echo    http://localhost:3000
echo.
echo    Браузер откроется автоматически
echo    Нажмите Ctrl+C чтобы остановить
echo.
echo    ====================================
echo.

REM Открытие браузера с задержкой
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

REM Запуск сервера
call npm run dev

pause


