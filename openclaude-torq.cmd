@echo off
setlocal
cd /d "%~dp0"
call openclaude.cmd --provider openai --model codexplan --teammate-mode in-process --agent torq-orchestrator %*
exit /b %errorlevel%
