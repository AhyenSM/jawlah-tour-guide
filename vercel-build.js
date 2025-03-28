// This is a build script specifically for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Ensure dist/public exists
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

// Copy public directory contents to dist/public
console.log('Copying public assets...');
if (fs.existsSync('public')) {
  fs.cpSync('public', 'dist/public', { recursive: true });
}

// Manually copy attached assets to dist/public
console.log('Copying Qatar images...');
if (fs.existsSync('attached_assets')) {
  const qatarImages = fs.readdirSync('attached_assets')
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
  
  qatarImages.forEach(image => {
    fs.copyFileSync(
      path.join('attached_assets', image),
      path.join('dist/public', image)
    );
  });
}

// Run the build command
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}