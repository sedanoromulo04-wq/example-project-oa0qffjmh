# organize.ps1 - Moves directories into the new structural standard

Write-Host "Creating agents directory..."
New-Item -ItemType Directory -Force -Path ".\agents" | Out-Null

Write-Host "Moving Copywriter\copy-squad to agents\copy-squad..."
if (Test-Path ".\Copywriter\copy-squad") {
    Move-Item -Path ".\Copywriter\copy-squad" -Destination ".\agents\copy-squad" -Force
}

write-Host "Removing legacy Copywriter directory..."
if (Test-Path ".\Copywriter") {
    Remove-Item -Path ".\Copywriter" -Recurse -Force
}

Write-Host "Creating docs\vision_and_strategy directory..."
New-Item -ItemType Directory -Force -Path ".\docs\vision_and_strategy" | Out-Null

Write-Host "Moving skills\01_VISION_AND_STRATEGY contents to docs\vision_and_strategy..."
if (Test-Path ".\skills\01_VISION_AND_STRATEGY") {
    Move-Item -Path ".\skills\01_VISION_AND_STRATEGY\*" -Destination ".\docs\vision_and_strategy" -Force
    Remove-Item -Path ".\skills\01_VISION_AND_STRATEGY" -Recurse -Force
}

Write-Host "Organization complete!"
