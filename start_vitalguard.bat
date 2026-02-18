@echo off
echo ==================================================
echo   VitalGuard - Unified Start Script
echo ==================================================

echo.
echo [1/3] Checking/Seeding Database...
.venv\Scripts\python create_default_user.py

echo.
echo [2/3] Starting Backend and Frontend...
echo Backend: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers.
echo.

npm start
