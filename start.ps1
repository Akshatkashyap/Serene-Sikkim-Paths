# Start both frontend and backend servers

Write-Host "🚀 Starting Serene Sikkim Paths Application..." -ForegroundColor Cyan
Write-Host ""

# Start backend server in a new window
Write-Host "📦 Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend server in current window
Write-Host "🎨 Starting frontend server..." -ForegroundColor Green
Write-Host ""
npm run dev
