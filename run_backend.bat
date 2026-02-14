@echo off
echo ===================================
echo   VitalGuard Backend Setup & Run
echo ===================================

if exist .venv\Scripts\activate.bat call .venv\Scripts\activate.bat

echo [1/2] Installing/Checking Dependencies...
pip install -r backend/requirements.txt
if %errorlevel% neq 0 (
    echo Error installing dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Starting Backend Server on Port 8000...
echo API Docs will be available at http://localhost:8000/docs
echo.
uvicorn backend.main:app --reload --port 8000

pause
