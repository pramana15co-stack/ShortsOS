# Deployment Guide for ShortsOS

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications. It's free and takes less than 2 minutes.

### Step 1: Push to GitHub
Your code is already on GitHub at: `https://github.com/pramana15co-stack/ShortsOS.git`

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository: `pramana15co-stack/ShortsOS`
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Your site will be live in ~2 minutes!

### Step 3: Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain

## Alternative: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `ShortsOS`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## Manual Build & Deploy

### Build the project:
```bash
npm install
npm run build
```

### Test locally:
```bash
npm start
```

### Deploy to any hosting:
1. Build the project: `npm run build`
2. Upload the `.next` folder and `package.json` to your server
3. Run `npm install --production`
4. Run `npm start`

## Environment Variables

Currently, no environment variables are required. All features work without external APIs.

## Build Requirements

- Node.js 18+ 
- npm or yarn
- No database required
- No external APIs required

## Troubleshooting

### Build fails:
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `rm -rf .next node_modules/.cache`
- Check Node.js version: `node --version` (should be 18+)

### Deployment fails:
- Ensure all files are committed to GitHub
- Check that `package.json` has correct scripts
- Verify Next.js version is compatible

## Post-Deployment

After deployment, your site will be available at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`

Update your README with the live URL!



