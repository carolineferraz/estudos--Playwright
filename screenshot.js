const { chromium } = require('playwright');
const { expect } = require('expect');

(async () => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://demowebshop.tricentis.com/login')

    await page.locator('#Email').fill('carol123@email.com');
    await page.press('#Email', 'Tab');
    await page.fill('#Password', 'test123');

    await page.locator('input.login-button').click();

    const accountLink = page.locator('div.header-links >> a[href="/customer/info"]');
    await accountLink.waitFor({ state: 'visible' });
    const html = await accountLink.innerHTML();
    expect(html).toMatch('carol123@email.com')

    // Screeshot
    await page.screenshot({path: 'SignIn.png', fullPage: true})

    await browser.close()
})()