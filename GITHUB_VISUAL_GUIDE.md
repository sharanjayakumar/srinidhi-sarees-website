# 📸 GitHub Repository Creation - Visual Guide

This guide shows you exactly what you'll see on each screen.

---

## 🌐 Step 1: Go to GitHub

**What to do:** Open https://github.com in your browser

**What you'll see:**
- GitHub homepage with "Sign in" and "Sign up" buttons in top-right corner
- If you have an account → Click "Sign in"
- If you don't have an account → Click "Sign up"

---

## 👤 Step 2: Sign Up (if needed)

**What you'll see:**
1. Email input field
2. Password creation field
3. Username selection field
4. Email verification step

**Recommended username:** `srinidhisarees` or `srinidhi-sarees`

---

## ➕ Step 3: Create New Repository

**What to do:** After logging in:

1. **Look at top-right corner** - you'll see:
   - Your profile picture
   - A "+" icon (plus sign)
   - Click the "+" icon

2. **A dropdown menu appears** with options:
   - New repository ← **Click this**
   - Import repository
   - New gist
   - New organization
   - New project

---

## 📝 Step 4: Fill Repository Form

**What you'll see:** A form with these fields:

### Repository Name
```
┌────────────────────────────────────────┐
│ srinidhi-sarees-website                │
└────────────────────────────────────────┘
```
**Type exactly:** `srinidhi-sarees-website`

### Description (Optional)
```
┌────────────────────────────────────────┐
│ E-commerce website for Srinidhi Sarees │
└────────────────────────────────────────┘
```

### Visibility
```
○ Public  ← Select this (it's free!)
○ Private
```
**Choose:** Public

### Initialize Repository
```
☐ Add a README file
☐ Add .gitignore
☐ Choose a license
```
**Important:** Leave ALL checkboxes UNCHECKED ❌

### Create Repository Button
```
┌────────────────────────────┐
│   Create repository        │  ← Click this green button
└────────────────────────────┘
```

---

## 🔗 Step 5: Copy Repository URL

**What you'll see:** After creating, GitHub shows a page with commands.

**Look for this section:**
```
…or push an existing repository from the command line

git remote add origin https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git
git branch -M main
git push -u origin main
```

**What to copy:**
```
https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git
```
(YOUR_USERNAME will be your actual username)

**How to copy:**
- Click the 📋 (copy) icon next to the URL, OR
- Select the URL and press Ctrl+C

---

## 💻 Step 6: Push Code from PowerShell

**What to do:**

1. **Open PowerShell** in your project folder:
   - Press `Win + X`
   - Select "Windows PowerShell" or "Terminal"
   - Navigate to: `C:\Users\LENOVO\Desktop\Srinidhi`

2. **Run these commands one by one:**

```powershell
# Command 1: Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git

# Command 2: Set main branch
git branch -M main

# Command 3: Upload code
git push -u origin main
```

**What you'll see:**
```
Enumerating objects: 112, done.
Counting objects: 100% (112/112), done.
Delta compression using up to 8 threads
Compressing objects: 100% (100/100), done.
Writing objects: 100% (112/112), 1.5 MiB | 2.5 MiB/s, done.
Total 112 (delta 20), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git
 * [new branch]      main -> main
```

---

## 🔐 Step 7: Authentication

**If asked for credentials:**

### Option A: Username and Password
```
Username for 'https://github.com': YOUR_USERNAME
Password for 'https://YOUR_USERNAME@github.com': YOUR_PASSWORD
```

### Option B: Personal Access Token (Recommended)

**If password doesn't work:**

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Fill in:
   - Note: `Srinidhi Sarees Deploy`
   - Expiration: `90 days` or `No expiration`
   - Select scopes: ☑ **repo** (check all repo permissions)
4. Click "Generate token" (green button at bottom)
5. **COPY THE TOKEN** (you won't see it again!)
6. Use token as password when pushing

---

## ✅ Step 8: Verify Success

**What to do:** Go back to GitHub in your browser

**What you'll see:**
- Refresh the repository page
- You should now see all your files:
  - 📁 client/
  - 📁 server/
  - 📁 public/
  - 📄 package.json
  - 📄 README.md
  - And many more files!

**Success indicators:**
- Green checkmark ✓ next to "Initial commit - Srinidhi Sarees website"
- File count showing "112 files"
- All folders and files visible

---

## 🎉 You're Done!

Your repository is now live at:
```
https://github.com/YOUR_USERNAME/srinidhi-sarees-website
```

**Next step:** Deploy to Netlify (see DEPLOY_NOW.txt)

---

## 🆘 Common Issues

### Issue: "remote origin already exists"
**Solution:**
```powershell
git remote remove origin
# Then try again
git remote add origin https://github.com/YOUR_USERNAME/srinidhi-sarees-website.git
```

### Issue: "Authentication failed"
**Solution:** Use Personal Access Token (see Step 7, Option B)

### Issue: "Permission denied"
**Solution:** Make sure you're logged into the correct GitHub account

### Issue: "Repository not found"
**Solution:** Check that the repository URL is correct and matches your username

---

## 📞 Need More Help?

- GitHub Help: https://docs.github.com
- GitHub Support: https://support.github.com

---

**Bookmark this page for future reference!**