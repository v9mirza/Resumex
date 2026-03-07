const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error));
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
    await browser.close();
})();
