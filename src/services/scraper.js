const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { v4: uuidv4 } = require('uuid');

async function scrapeTrends() {
  let driver;
  try {
    console.log('Starting scraping process...');
    const options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--start-maximized');
    console.log('Setting up ChromeDriver...');
    
    // Create driver without explicitly setting service
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    console.log('Navigating to Twitter...');
    await driver.get('https://twitter.com/login');
    await driver.sleep(5000); // Wait for page to fully load

    console.log('Attempting login...');
    // Wait for username field and enter username
    const usernameInput = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="username"]')),
      10000
    );
    await usernameInput.sendKeys(process.env.TWITTER_USERNAME);
    await usernameInput.sendKeys(Key.RETURN);
    await driver.sleep(3000);

    // Wait for password field and enter password
    const passwordInput = await driver.wait(
      until.elementLocated(By.css('input[name="password"]')),
      10000
    );
    await passwordInput.sendKeys(process.env.TWITTER_PASSWORD);
    await passwordInput.sendKeys(Key.RETURN);
    await driver.sleep(5000);

    console.log('Waiting for trends to load...');
    // Wait for the trends section to load
    await driver.wait(
      until.elementLocated(By.css('[data-testid="trend"]')),
      15000
    );
    await driver.sleep(3000);

    console.log('Fetching trends...');
    const trends = await driver.findElements(By.css('[data-testid="trend"]'));
    
    const trendTexts = [];
    for (let i = 0; i < 5 && i < trends.length; i++) {
      try {
        const trendText = await trends[i].getText();
        console.log(`Found trend ${i + 1}:`, trendText);
        const parts = trendText.split('\n');
        trendTexts.push(parts[1]);
      } catch (error) {
        console.error(`Error getting trend ${i + 1}:`, error);
        trendTexts.push(`Error getting trend ${i + 1}`);
      }
    }

    const result = {
      uniqueId: uuidv4(),
      nameoftrend1: trendTexts[0] || 'No trend found',
      nameoftrend2: trendTexts[1] || 'No trend found',
      nameoftrend3: trendTexts[2] || 'No trend found',
      nameoftrend4: trendTexts[3] || 'No trend found',
      nameoftrend5: trendTexts[4] || 'No trend found',
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1'
    };

    console.log('Scraping completed successfully:', result);
    return result;
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    if (driver) {
      console.log('Closing browser...');
      await driver.quit().catch(err => console.error('Error closing browser:', err));
    }
  }
}

module.exports = { scrapeTrends };