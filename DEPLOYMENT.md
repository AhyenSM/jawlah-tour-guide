# Deploying Jawlah to Vercel

This guide provides step-by-step instructions for deploying the Jawlah interactive tour game to Vercel for free.

## Prerequisites

1. A GitHub account
2. A Vercel account (can be created for free at [vercel.com](https://vercel.com))

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" button in the top-right corner and select "New repository"
3. Name your repository (e.g., "jawlah-qatar-tour-game")
4. Choose "Public" visibility (required for free Vercel deployment)
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

In your local project directory (after downloading from Replit), run the following commands:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/jawlah-qatar-tour-game.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (or create a free account)
2. Click "Add New" > "Project"
3. Import your GitHub repository "jawlah-qatar-tour-game"
4. Vercel will auto-detect the project settings
5. Configure the following settings:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: node vercel-build.js
6. Click "Deploy"

## Step 4: Environment Variables (if needed)

If your project requires environment variables:

1. Go to your project settings in Vercel
2. Click on "Environment Variables"
3. Add any necessary variables (like API keys)

## Step 5: Domain Setup

By default, Vercel provides a domain like `jawlah-qatar-tour-game.vercel.app`. If you want to use a custom domain:

1. Go to your project settings
2. Click on "Domains"
3. Add your custom domain and follow the verification steps

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs for specific error messages
2. Verify that all environment variables are correctly set
3. Ensure all dependencies are properly listed in package.json
4. Check if all files are correctly included in your GitHub repository

## Maintenance and Updates

To update your deployed application:

1. Make changes to your local code
2. Commit and push changes to GitHub
3. Vercel will automatically deploy the new version

## Important Notes

- The free tier of Vercel has usage limitations, but they are generous for small to medium-sized projects
- Images and assets are served from the public directory
- All Qatar-specific images have been properly included for deployment