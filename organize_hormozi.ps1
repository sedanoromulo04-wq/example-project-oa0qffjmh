# organize_hormozi.ps1 - Moves Hormozi agents and performs cleanup of remaining YAML/config files

Write-Host "Creating agents\hormozi-squad\agents directory..."
New-Item -ItemType Directory -Force -Path ".\agents\hormozi-squad\agents" | Out-Null

Write-Host "Moving Hormozi\hormozi-squad\agents to agents\hormozi-squad..."
if (Test-Path ".\Hormozi\hormozi-squad\agents") {
    Move-Item -Path ".\Hormozi\hormozi-squad\agents\*" -Destination ".\agents\hormozi-squad\agents\" -Force
}

Write-Host "Removing legacy Hormozi directory..."
if (Test-Path ".\Hormozi") {
    Remove-Item -Path ".\Hormozi" -Recurse -Force
}

Write-Host "Torq Offer Engineering integration complete! The raw agents have been securely moved."
