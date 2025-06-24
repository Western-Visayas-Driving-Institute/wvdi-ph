import puppeteer from 'puppeteer';

async function runTest() {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // Overcome limited resource problems
      '--disable-gpu', // Disable GPU hardware acceleration
      '--single-process', // Run in single process mode
      '--no-zygote' // Disable zygote process
    ],
    // Try to use system Chrome/Chromium if available
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null
  });

  try {
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the local development server
    console.log('Navigating to local development server...');
    await page.goto('http://localhost:5173', {
      waitUntil: 'networkidle2' // Wait until network is idle
    });
    
    // Take a screenshot
    const screenshotPath = './screenshots/homepage.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    
    // Get page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if key elements exist
    const heroSection = await page.$('.hero-section');
    console.log('Hero section exists:', !!heroSection);
    
    const coursesSection = await page.$('#courses');
    console.log('Courses section exists:', !!coursesSection);
    
    // Click on a navigation item
    const aboutLink = await page.$('a[href="#about"]');
    if (aboutLink) {
      await aboutLink.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      console.log('Clicked on About link');
    }
    
    // Get text content from a specific element
    const aboutText = await page.$eval('#about h2', el => el.textContent);
    console.log('About section heading:', aboutText);
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed');
  }
}

// Run the test
runTest().catch(console.error);