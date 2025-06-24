import puppeteer from 'puppeteer';

async function runE2ETests() {
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
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  async function test(name, fn) {
    try {
      await fn();
      console.log(`✓ ${name}`);
      testsPassed++;
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(`  Error: ${error.message}`);
      testsFailed++;
    }
  }
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the site
    await page.goto('http://localhost:5173', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('\n🧪 Running E2E Tests...\n');
    
    // Test 1: Page loads successfully
    await test('Page loads with correct title', async () => {
      const title = await page.title();
      if (!title.includes('WVDI')) {
        throw new Error(`Expected title to contain "WVDI", got "${title}"`);
      }
    });
    
    // Test 2: Navigation menu exists
    await test('Navigation menu is present', async () => {
      const nav = await page.$('nav');
      if (!nav) throw new Error('Navigation element not found');
    });
    
    // Test 3: Hero section exists
    await test('Hero section is visible', async () => {
      const hero = await page.$('.hero-section');
      if (!hero) throw new Error('Hero section not found');
    });
    
    // Test 4: Smooth scrolling works
    await test('Smooth scrolling to courses section', async () => {
      const coursesLink = await page.$('a[href="#courses"]');
      if (!coursesLink) throw new Error('Courses link not found');
      
      await coursesLink.click();
      await page.waitForTimeout(1500); // Wait for smooth scroll
      
      // Check if courses section is in viewport
      const coursesSection = await page.$('#courses');
      const isVisible = await coursesSection.isIntersectingViewport();
      if (!isVisible) throw new Error('Courses section not scrolled into view');
    });
    
    // Test 5: Carousel functionality
    await test('Carousel navigation works', async () => {
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      // Find carousel navigation buttons
      const nextButton = await page.$('.carousel-control-next');
      if (!nextButton) throw new Error('Carousel next button not found');
      
      // Click next button
      await nextButton.click();
      await page.waitForTimeout(1000); // Wait for slide transition
    });
    
    // Test 6: Course cards are displayed
    await test('Course cards are displayed', async () => {
      const courseCards = await page.$$('.course-card');
      if (courseCards.length === 0) throw new Error('No course cards found');
      console.log(`  Found ${courseCards.length} course cards`);
    });
    
    // Test 7: Instructor section loads
    await test('Instructor section displays team members', async () => {
      await page.goto('http://localhost:5173#instructors', {
        waitUntil: 'networkidle2'
      });
      await page.waitForTimeout(1000);
      
      const instructorCards = await page.$$('.instructor-card');
      if (instructorCards.length === 0) throw new Error('No instructor cards found');
      console.log(`  Found ${instructorCards.length} instructor cards`);
    });
    
    // Test 8: Contact form exists
    await test('Contact form is present', async () => {
      await page.goto('http://localhost:5173#contact', {
        waitUntil: 'networkidle2'
      });
      await page.waitForTimeout(1000);
      
      const contactForm = await page.$('form');
      if (!contactForm) throw new Error('Contact form not found');
      
      // Check for form fields
      const nameInput = await page.$('input[name="name"], input[placeholder*="name" i]');
      const emailInput = await page.$('input[type="email"], input[name="email"]');
      if (!nameInput || !emailInput) {
        throw new Error('Contact form fields not found');
      }
    });
    
    // Test 9: Responsive menu toggle (mobile view)
    await test('Mobile menu toggle works', async () => {
      // Set mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      await page.goto('http://localhost:5173', {
        waitUntil: 'networkidle2'
      });
      
      // Look for hamburger menu
      const menuToggle = await page.$('.menu-toggle, .navbar-toggler, [aria-label*="menu" i]');
      if (menuToggle) {
        await menuToggle.click();
        await page.waitForTimeout(500);
        console.log('  Mobile menu toggle clicked');
      }
    });
    
    // Test 10: Footer information
    await test('Footer contains contact information', async () => {
      await page.setViewport({ width: 1280, height: 800 });
      const footer = await page.$('footer');
      if (!footer) throw new Error('Footer not found');
      
      const footerText = await page.evaluate(el => el.textContent, footer);
      if (!footerText.includes('Contact') && !footerText.includes('WVDI')) {
        throw new Error('Footer missing expected content');
      }
    });
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`   Passed: ${testsPassed}`);
    console.log(`   Failed: ${testsFailed}`);
    console.log(`   Total:  ${testsPassed + testsFailed}`);
    
    if (testsFailed > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Check if dev server is running
console.log('Make sure your development server is running (npm run dev)');
console.log('Starting E2E tests...');

runE2ETests().catch(console.error);