
Write-Host "1. Installing dependencies..." -ForegroundColor Green
pip install -r requirements.txt

Write-Host "2. Generating dummy data..." -ForegroundColor Green
python ml/create_dummy_data.py

Write-Host "3. Preprocessing data..." -ForegroundColor Green
python ml/preprocess.py

Write-Host "4. Training model..." -ForegroundColor Green
python ml/train_model.py

Write-Host "Setup complete!" -ForegroundColor Cyan
Write-Host "To run the backend API, execute: python ml/api.py" -ForegroundColor Yellow
