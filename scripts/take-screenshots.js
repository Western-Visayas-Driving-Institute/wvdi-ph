import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

async function takeScreenshots() {
  // Ensure screenshots directory exists
  if (!existsSync('./screenshots')) {
    await mkdir('./screenshots', { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null
  });

  try {
    const page = await browser.newPage();
    
    // Define viewport sizes for different devices
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'laptop', width: 1366, height: 768 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];
    
    // Define pages to screenshot
    const pages = [
      { name: 'homepage', url: 'http://localhost:5173', fullPage: true },
      { name: 'courses', url: 'http://localhost:5173#courses', fullPage: false },
      { name: 'instructors', url: 'http://localhost:5173#instructors', fullPage: false },
      { name: 'contact', url: 'http://localhost:5173#contact', fullPage: false }
    ];
    
    for (const viewport of viewports) {
      console.log(`\nTaking screenshots for ${viewport.name} (${viewport.width}x${viewport.height})`);
      await page.setViewport({ width: viewport.width, height: viewport.height });
      
      for (const pageInfo of pages) {
        console.log(`  - Capturing ${pageInfo.name}...`);
        
        await page.goto(pageInfo.url, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });
        
        // Wait a bit for any animations
        await page.waitForTimeout(1000);
        
        const filename = `./screenshots/${pageInfo.name}-${viewport.name}.png`;
        await page.screenshot({
          path: filename,
          fullPage: pageInfo.fullPage
        });
        
        console.log(`    ✓ Saved to ${filename}`);
      }
    }
    
    console.log('\n✨ All screenshots captured successfully!');
    
  } catch (error) {
    console.error('Error taking screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Check if dev server is running
console.log('Make sure your development server is running (npm run dev)');
console.log('Starting screenshot capture...\n');

takeScreenshots().catch(console.error);