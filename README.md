# Srinidhi Sarees - E-commerce Website

A modern, full-stack e-commerce website for Srinidhi Sarees built with React, Express, and MongoDB.

## 🚀 Quick Deploy to Internet

### Option 1: One-Click Deploy (Easiest)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Option 2: Manual Deployment

**For Windows:**
```powershell
.\deploy.ps1
```

**For Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 3: Using Netlify Dashboard

1. **Create a GitHub repository** and push this code
2. **Go to [Netlify](https://app.netlify.com)**
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`
6. Click "Deploy site"

## 🔧 Environment Variables

After deployment, add these in Netlify Dashboard (Site settings → Environment variables):

**Required:**
- `JWT_SECRET`: Random secret key for admin login

**Optional:**
- `MONGODB_URI`: MongoDB connection string (uses local files if not set)
- `WHATSAPP_TOKEN`: WhatsApp Business API token
- `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp phone number ID

## 🌐 Making Your Site Appear on Google

After deployment:

1. **Get your site URL** from Netlify (e.g., `https://srinidhi-sarees.netlify.app`)

2. **Add to Google Search Console:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your site URL
   - Verify ownership

3. **Submit sitemap:** `https://your-site.com/sitemap.xml`

4. **Create Google Business Profile:**
   - Go to [Google Business](https://business.google.com)
   - Add your business details
   - Link your website

5. **Wait 1-2 weeks** for Google to index your site

## 📱 Features

- 🛍️ Product catalog with collections
- 🛒 Shopping cart functionality
- 📱 WhatsApp order integration
- 👨‍💼 Admin panel for managing products
- 📊 Order management system
- 🎨 Modern, responsive design
- 🌙 Dark mode support

## 🏃‍♂️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📞 Contact

- **Phone:** +91 7012124919
- **WhatsApp:** +91 9447051531
- **Location:** Trivandrum, Kerala

## 📄 License

All rights reserved © 2025 Srinidhi Sarees

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)