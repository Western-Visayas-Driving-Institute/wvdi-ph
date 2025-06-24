import { execSync } from 'child_process';

console.log('🔍 Checking Puppeteer setup...\n');

// Check for Chrome/Chromium installations
const browsers = [
  { name: 'Chromium', commands: ['chromium-browser', 'chromium'] },
  { name: 'Google Chrome', commands: ['google-chrome', 'google-chrome-stable'] }
];

let foundBrowser = null;

for (const browser of browsers) {
  for (const cmd of browser.commands) {
    try {
      const path = execSync(`which ${cmd} 2>/dev/null`).toString().trim();
      if (path) {
        console.log(`✅ Found ${browser.name} at: ${path}`);
        foundBrowser = path;
        break;
      }
    } catch (e) {
      // Command not found, continue
    }
  }
  if (foundBrowser) break;
}

if (!foundBrowser) {
  console.log('❌ No Chrome/Chromium browser found on system');
  console.log('\nTo fix Puppeteer, you have several options:\n');
  console.log('Option 1 - Install system dependencies (requires sudo):');
  console.log('sudo apt-get update && sudo apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2\n');
  
  console.log('Option 2 - Install Chromium browser (requires sudo):');
  console.log('sudo apt-get install chromium-browser\n');
  
  console.log('Option 3 - Use Puppeteer with Firefox instead:');
  console.log('npm install puppeteer-firefox\n');
  
  console.log('Option 4 - Run in Docker container with Chrome pre-installed');
} else {
  console.log('\n🎯 To use system browser with Puppeteer, run scripts like this:');
  console.log(`PUPPETEER_EXECUTABLE_PATH="${foundBrowser}" npm run test:puppeteer`);
  console.log(`PUPPETEER_EXECUTABLE_PATH="${foundBrowser}" npm run screenshot`);
  console.log(`PUPPETEER_EXECUTABLE_PATH="${foundBrowser}" npm run e2e`);
}

// Check Puppeteer cache
try {
  const puppeteerPath = execSync('find ~/.cache/puppeteer -name chrome -type f 2>/dev/null | head -1').toString().trim();
  if (puppeteerPath) {
    console.log(`\n📦 Puppeteer Chrome cached at: ${puppeteerPath}`);
    
    // Check missing libraries
    console.log('\n🔧 Checking for missing libraries...');
    try {
      execSync(`ldd ${puppeteerPath} | grep "not found"`);
    } catch (e) {
      const output = e.stdout?.toString() || '';
      if (output.includes('not found')) {
        console.log('Missing libraries:');
        console.log(output);
      } else {
        console.log('✅ All libraries seem to be present');
      }
    }
  }
} catch (e) {
  console.log('\n📦 No Puppeteer Chrome cache found');
}

console.log('\n💡 Current workaround:');
console.log('The Puppeteer scripts have been updated with additional flags that might help.');
console.log('Try running: npm run test:puppeteer');