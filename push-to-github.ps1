Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📁 PUSH TO GITHUB - Interactive Helper" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Git is not initialized in this folder!" -ForegroundColor Red
    Write-Host "This script should be run in the project folder." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository found!" -ForegroundColor Green
Write-Host ""

# Ask for GitHub username
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 1: Enter Your GitHub Username" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "First, make sure you've created a repository on GitHub:" -ForegroundColor White
Write-Host "1. Go to https://github.com" -ForegroundColor Gray
Write-Host "2. Click '+' icon → 'New repository'" -ForegroundColor Gray
Write-Host "3. Name it: srinidhi-sarees-website" -ForegroundColor Gray
Write-Host "4. Click 'Create repository'" -ForegroundColor Gray
Write-Host ""

$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Username: $username" -ForegroundColor Green
Write-Host ""

# Construct repository URL
$repoUrl = "https://github.com/$username/srinidhi-sarees-website.git"

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 2: Connecting to GitHub" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository URL: $repoUrl" -ForegroundColor White
Write-Host ""

# Remove existing origin if it exists
Write-Host "Checking for existing remote..." -ForegroundColor Gray
git remote remove origin 2>$null

# Add new origin
Write-Host "Adding GitHub remote..." -ForegroundColor Gray
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to add remote!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Remote added successfully!" -ForegroundColor Green
Write-Host ""

# Set main branch
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 3: Setting Main Branch" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

git branch -M main

Write-Host "✅ Branch set to 'main'" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 4: Pushing Code to GitHub" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  You will be asked for your GitHub credentials:" -ForegroundColor Yellow
Write-Host "   - Username: $username" -ForegroundColor Gray
Write-Host "   - Password: Your GitHub password" -ForegroundColor Gray
Write-Host "   - OR use Personal Access Token if password doesn't work" -ForegroundColor Gray
Write-Host ""
Write-Host "Pushing code..." -ForegroundColor Gray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common reasons:" -ForegroundColor Yellow
    Write-Host "1. Wrong password - Try using Personal Access Token" -ForegroundColor Gray
    Write-Host "2. Repository doesn't exist - Create it on GitHub first" -ForegroundColor Gray
    Write-Host "3. No internet connection" -ForegroundColor Gray
    Write-Host ""
    Write-Host "To use Personal Access Token:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host "2. Generate new token (classic)" -ForegroundColor Gray
    Write-Host "3. Check 'repo' permissions" -ForegroundColor Gray
    Write-Host "4. Use token as password when pushing" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  🎉 SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Your repository: https://github.com/$username/srinidhi-sarees-website" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/$username/srinidhi-sarees-website" -ForegroundColor Gray
Write-Host "2. Verify all files are there" -ForegroundColor Gray
Write-Host "3. Deploy to Netlify (see DEPLOY_NOW.txt)" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")