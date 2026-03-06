@echo off
echo ========================================
echo Indian Real Estate Analytics Platform
echo ========================================
echo.
echo Installing dependencies and setting up the project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed. Proceeding with installation...
echo.

REM Install root dependencies
echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies.
    pause
    exit /b 1
)

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install server dependencies.
    pause
    exit /b 1
)
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install client dependencies.
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installation completed successfully!
echo ========================================
echo.
echo To start the application:
echo 1. Run: npm run dev
echo 2. Open: http://localhost:3000
echo 3. API will be available at: http://localhost:4000
echo.
echo Press any key to exit...
pause >nul 