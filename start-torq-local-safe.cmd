@echo off
setlocal

set "ROOT=%~dp0"
set "BACKEND=%ROOT%Antigravity Skill\Antigravity skills\torq-central\backend"
set "FRONTEND=%ROOT%Antigravity Skill\Antigravity skills\torq-central\frontend"

echo Iniciando Torq Jarvis local em modo SAFE...
start "Torq Jarvis Backend SAFE" cmd /k "cd /d ""%BACKEND%"" && set JARVIS_RUNTIME_MODE=heuristic && set JARVIS_ALLOW_INSECURE_DEV_AUTH=false && npm start"
start "Torq Jarvis Frontend SAFE" cmd /k "cd /d ""%FRONTEND%"" && set VITE_APP_MODE=jarvis && npm run dev -- --host 127.0.0.1"

echo.
echo Backend:  http://127.0.0.1:8787/api/health
echo Frontend: http://127.0.0.1:5173/jarvis
echo Runtime:  heuristico governado
echo.
echo Feche as duas janelas para encerrar o sistema.
