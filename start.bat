@echo off
cd /d "%~dp0"
where node >nul 2>&1 || (
    echo Node.js не найден! Установите с https://nodejs.org/
    pause
    exit /b 1
)
if not exist node_modules npm install
echo.
echo Открытие http://localhost:3000 через 3 секунды...
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"
npm run dev


