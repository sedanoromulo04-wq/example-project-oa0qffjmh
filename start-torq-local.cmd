@echo off
setlocal

set "ROOT=%~dp0"
set "BACKEND=%ROOT%Antigravity Skill\Antigravity skills\torq-central\backend"
set "FRONTEND=%ROOT%Antigravity Skill\Antigravity skills\torq-central\frontend"

echo Iniciando Torq Jarvis localmente...
start "Torq Jarvis Backend" cmd /k "cd /d ""%BACKEND%"" && npm start"
start "Torq Jarvis Frontend" cmd /k "cd /d ""%FRONTEND%"" && npm run dev -- --host 127.0.0.1"

echo.
echo Backend:  http://127.0.0.1:8787/api/health
echo Frontend: http://127.0.0.1:5173/jarvis
echo.
echo Feche as duas janelas para encerrar o sistema.
