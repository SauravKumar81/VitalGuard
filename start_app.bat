@echo off
echo ==================================================
echo   Starting VitalGuard System (Backend + Frontend)
echo ==================================================

echo.
echo [1/2] Launching Backend Server...
start "VitalGuard Backend" call run_backend.bat

echo.
echo [2/2] Launching Frontend...
start "VitalGuard Frontend" call run_frontend.bat

echo.
echo --------------------------------------------------
echo Both services are starting in new windows.
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:5173
echo --------------------------------------------------
echo.
pause
