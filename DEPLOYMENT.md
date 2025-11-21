# Xuper Frontend - Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New Project"

4. Import your `xuper-frontend` repository

5. Configure Environment Variables:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `your-backend-url`
   - Example: `https://api.xuper.com` or `http://localhost:5000` for development

6. Click "Deploy"

7. Your app will be live at: `https://xuper-frontend.vercel.app`

### Option 2: Deploy from CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## ⚙️ Environment Variables

Make sure to set these in Vercel Dashboard:

- `VITE_API_URL` - Your backend API URL

## 📝 Notes

- The app is configured with `vercel.json` for proper routing
- All routes will redirect to `index.html` for client-side routing
- Build output is in the `dist` folder
- Framework is set to Vite for optimal performance

## 🔗 Custom Domain

To add a custom domain:
1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain and follow DNS instructions

## 🔄 Automatic Deployments

Every push to your main branch will automatically deploy to production.
Pull requests will get preview deployments.
