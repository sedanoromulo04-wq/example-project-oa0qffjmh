# organize_c_level.ps1
# Remove a pasta legada Orquestrador/ apos migracao da inteligencia para agents/c-level-squad/

$AgentsDest = "agents\c-level-squad"
$RequiredAgents = @("vision-chief.md", "coo-orchestrator.md", "cmo-architect.md", "cto-architect.md", "cio-engineer.md", "caio-architect.md")
$LegacyPath = "Orquestrador"

Write-Host "Verificando migracao dos agentes..." -ForegroundColor Cyan

$AllPresent = $true
foreach ($agent in $RequiredAgents) {
    $fullPath = Join-Path $AgentsDest $agent
    if (Test-Path $fullPath) {
        Write-Host "  OK: $agent" -ForegroundColor Green
    } else {
        Write-Host "  AUSENTE: $agent" -ForegroundColor Red
        $AllPresent = $false
    }
}

if (-not $AllPresent) {
    Write-Host ""
    Write-Host "ABORTADO: Nem todos os agentes foram migrados. A pasta '$LegacyPath' foi mantida." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Todos os 6 agentes confirmados em '$AgentsDest'." -ForegroundColor Green
Write-Host "Removendo pasta legada '$LegacyPath'..." -ForegroundColor Yellow

Remove-Item -Recurse -Force $LegacyPath

if (-not (Test-Path $LegacyPath)) {
    Write-Host "Pasta '$LegacyPath' removida com sucesso." -ForegroundColor Green
} else {
    Write-Host "FALHA ao remover '$LegacyPath'. Remova manualmente." -ForegroundColor Red
}

Write-Host ""
Write-Host "ESTRUTURA FINAL:" -ForegroundColor Cyan
Write-Host "  agents/c-level-squad/                         -> 6 agentes brutos" -ForegroundColor White
Write-Host "  skills/torq-c-level-strategy/SKILL.md         -> Orquestrador com Filtro Torq" -ForegroundColor White
Write-Host "  skills/torq-c-level-strategy/assets/templates -> Payload JSON para o frontend" -ForegroundColor White
Write-Host ""
Write-Host "Arquitetura Terceira Via do C-Level Squad - COMPLETA." -ForegroundColor Green
