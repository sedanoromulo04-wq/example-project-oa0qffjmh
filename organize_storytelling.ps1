# organize_storytelling.ps1 - Moves Storytelling agents and performs cleanup

Write-Host "Creating agents\storytelling-squad\agents directory..."
New-Item -ItemType Directory -Force -Path ".\agents\storytelling-squad\agents" | Out-Null

Write-Host "Moving Storytelling\storytelling\agents to agents\storytelling-squad..."
if (Test-Path ".\Storytelling\storytelling\agents") {
    Move-Item -Path ".\Storytelling\storytelling\agents\*" -Destination ".\agents\storytelling-squad\agents\" -Force
}

Write-Host "Removing legacy Storytelling directory and extraneous CLI logic..."
if (Test-Path ".\Storytelling") {
    Remove-Item -Path ".\Storytelling" -Recurse -Force
}

Write-Host "Storytelling Organization complete! The raw agents have been securely moved."
