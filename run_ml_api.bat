@echo off
echo Starting ML API Server...
if exist .venv\Scripts\activate.bat call .venv\Scripts\activate.bat

echo Checking dependencies...
pip install flask-cors >nul 2>&1

python ml/api.py
pause
