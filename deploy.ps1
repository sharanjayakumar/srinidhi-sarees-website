Write-Host "🚀 Deploying Srinidhi Sarees to Netlify..." -ForegroundColor Green

# Check if netlify-cli is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyInstalled) {
    Write-Host "❌ Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# Login to Netlify
Write-Host "🔐 Logging in to Netlify..." -ForegroundColor Cyan
netlify login

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Cyan
npm run build:client

# Deploy to production
Write-Host "📤 Deploying to production..." -ForegroundColor Cyan
netlify deploy --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site should be live now. Check the URL provided above." -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables in Netlify Dashboard (JWT_SECRET)"
Write-Host "2. Set up Neon database via Netlify Integrations (optional)"
Write-Host "3. Set up custom domain (optional)"
Write-Host "4. Submit to Google Search Console"
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan