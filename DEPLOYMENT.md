# Deployment Guide - Srinidhi Sarees

## Deploy to Netlify

### Prerequisites
1. A Netlify account (sign up at https://netlify.com)
2. Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Push to Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GIT_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Netlify

#### Option A: Using Netlify CLI (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

#### Option B: Using Netlify Dashboard

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/spa`
   - **Functions directory**: `netlify/functions`

### Step 3: Configure Environment Variables

In Netlify Dashboard:
1. Go to Site settings → Environment variables
2. Add the following variables:

**Required:**
- `JWT_SECRET`: A random secret key for admin authentication

**Optional (for MongoDB):**
- `MONGODB_URI`: Your MongoDB connection string

**Optional (for WhatsApp Business API):**
- `WHATSAPP_TOKEN`: Your WhatsApp Business API token
- `WHATSAPP_PHONE_NUMBER_ID`: Your WhatsApp phone number ID
- `WHATSAPP_TO_DEFAULT`: Default WhatsApp number (e.g., 917012124919)

### Step 4: Configure Custom Domain

1. In Netlify Dashboard, go to Domain settings
2. Add your custom domain (e.g., srinidhi-sarees.com)
3. Update DNS records as instructed by Netlify
4. Enable HTTPS (automatic with Netlify)

### Step 5: SEO Configuration for Google Search

To make your site appear when searching "Srinidhi Sarees" on Google:

1. **Verify ownership with Google Search Console**:
   - Go to https://search.google.com/search-console
   - Add your website
   - Verify ownership using one of the methods

2. **Submit sitemap**:
   - In Google Search Console, submit: `https://your-domain.com/sitemap.xml`

3. **Optimize for SEO**:
   - The site already has proper meta tags
   - Ensure all pages have descriptive titles and descriptions
   - Add structured data (Schema.org) for better search results

4. **Local Business Optimization**:
   - Create Google Business Profile
   - Add your business location, hours, and contact info
   - Link your website to the Google Business Profile

### Step 6: Monitor Deployment

- Check build logs in Netlify Dashboard
- Test all functionality on the live site
- Monitor for any errors in the Functions tab

## Troubleshooting

### Build Fails
- Check build logs in Netlify
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### API Routes Not Working
- Check Functions logs in Netlify Dashboard
- Verify environment variables are set
- Check that netlify.toml redirects are correct

### Database Issues
- If MongoDB is not configured, the app will use local JSON files
- For production, set up MongoDB Atlas (free tier available)

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Shop functionality works
- [ ] Orders can be placed
- [ ] WhatsApp integration works
- [ ] Admin panel is accessible
- [ ] Custom domain is configured
- [ ] SSL certificate is active
- [ ] Google Search Console is set up
- [ ] Site appears in Google search results

## Support

For issues or questions, check:
- Netlify documentation: https://docs.netlify.com
- Netlify support: https://answers.netlify.com