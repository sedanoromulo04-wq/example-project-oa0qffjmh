@echo off
for %%P in (8787 5173) do (
  for /f "tokens=5" %%A in ('netstat -aon ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /PID %%A /F >nul 2>&1
  )
)
echo Torq Jarvis local encerrado nas portas 8787 e 5173.
