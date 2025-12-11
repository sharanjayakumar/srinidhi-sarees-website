# 🚀 Quick Deploy Guide for Srinidhi Sarees

Follow these exact steps to get your website live on the internet!

## Step 1: Create GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

## Step 2: Create a New Repository on GitHub

1. After logging in, click the "+" icon in top-right corner
2. Click "New repository"
3. Fill in:
   - **Repository name**: `srinidhi-sarees-website`
   - **Description**: "E-commerce website for Srinidhi Sarees"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click "Create repository"
5. **COPY the repository URL** shown (looks like: `https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git`)

## Step 3: Push Your Code to GitHub

Open PowerShell in your project folder and run these commands:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Srinidhi Sarees website"

# Add your GitHub repository (replace with YOUR URL from Step 2)
git remote add origin https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git

# Push to GitHub
git push -u origin main
```

**Note:** If you get an error about "master" vs "main", run:
```powershell
git branch -M main
git push -u origin main
```

## Step 4: Deploy on Netlify

1. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Click "Sign up" and choose "Sign up with GitHub"
   - Authorize Netlify to access your GitHub

2. **Import Your Project:**
   - Click "Add new site" button
   - Click "Import an existing project"
   - Click "Deploy with GitHub"
   - Find and select `srinidhi-sarees-website` repository

3. **Configure Build Settings:**
   - Netlify should auto-detect settings from `netlify.toml`
   - Verify these settings:
     - **Build command**: `npm run build:client`
     - **Publish directory**: `dist/spa`
     - **Functions directory**: `netlify/functions`
   - Click "Deploy site"

4. **Wait for Deployment:**
   - Watch the build logs
   - When complete, you'll see "Site is live" with a URL

5. **Your Site is Live!**
   - URL will be like: `https://random-name-12345.netlify.app`
   - Click on it to view your website

## Step 5: Customize Your Site URL (Optional)

1. In Netlify Dashboard, go to "Site settings"
2. Click "Change site name"
3. Enter: `srinidhi-sarees` (or any available name)
4. Your URL becomes: `https://srinidhi-sarees.netlify.app`

## Step 6: Set Up Environment Variables

1. In Netlify Dashboard, go to "Site settings" → "Environment variables"
2. Click "Add a variable"
3. Add this required variable:
   - **Key**: `JWT_SECRET`
   - **Value**: `srinidhi-sarees-secret-2025` (or any random string)

**Optional variables** (add later if needed):
- `MONGODB_URI` - for database
- `WHATSAPP_TOKEN` - for automated WhatsApp messages
- `WHATSAPP_PHONE_NUMBER_ID` - WhatsApp phone ID

4. Click "Save"
5. Go to "Deploys" tab and click "Trigger deploy" → "Deploy site"

## Step 7: Get on Google Search

### A. Google Search Console (Free)

1. Go to https://search.google.com/search-console
2. Click "Start now" and sign in with Google account
3. Click "Add property"
4. Enter your Netlify URL: `https://srinidhi-sarees.netlify.app`
5. Choose verification method:
   - **Easiest**: HTML tag method
   - Copy the meta tag provided
   - I'll help you add it to your site
6. After verification, submit your sitemap: `https://srinidhi-sarees.netlify.app/sitemap.xml`

### B. Google Business Profile (Recommended for Local Business)

1. Go to https://business.google.com
2. Click "Manage now"
3. Enter business name: "Srinidhi Sarees"
4. Choose business category: "Clothing Store" or "Saree Shop"
5. Add location: Trivandrum, Kerala
6. Add contact: +91 7012124919
7. Add website: Your Netlify URL
8. Verify your business (Google will send verification code)

### C. Wait for Google Indexing

- It takes **1-2 weeks** for Google to index your site
- After that, searching "Srinidhi Sarees" will show your website

## 🎉 You're Done!

Your website is now live on the internet!

**Your live URL:** `https://srinidhi-sarees.netlify.app` (or your custom name)

## 📞 Need Help?

If you encounter any issues:
1. Check Netlify build logs for errors
2. Verify all files are pushed to GitHub
3. Check environment variables are set correctly

## 🔄 Making Updates

Whenever you want to update your website:

```powershell
# Make your changes in the code
# Then commit and push:
git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically rebuild and deploy your site!

---

**Important URLs to Bookmark:**
- Your GitHub Repo: `https://github.com/YOUR_USERNAME/srinidhi-sarees-website`
- Netlify Dashboard: `https://app.netlify.com`
- Your Live Site: `https://srinidhi-sarees.netlify.app`
- Google Search Console: `https://search.google.com/search-console`