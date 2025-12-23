#!/bin/bash

echo "🚀 Deploying Srinidhi Sarees to Netlify..."

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify
echo "🔐 Logging in to Netlify..."
netlify login

# Build the project
echo "🔨 Building the project..."
npm run build:client

# Deploy to production
echo "📤 Deploying to production..."
netlify deploy --prod

echo "✅ Deployment complete!"
echo "🌐 Your site should be live now. Check the URL provided above."
echo ""
echo "📝 Next steps:"
echo "1. Configure environment variables in Netlify Dashboard (JWT_SECRET)"
echo "2. Set up Neon database via Netlify Integrations (optional)"
echo "3. Set up custom domain (optional)"
echo "4. Submit to Google Search Console"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"