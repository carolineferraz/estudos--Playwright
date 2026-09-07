const {chromium} = require('playwright');
const { expect } = require('@playwright/test');

(async() => {
    const browser = await chromium.launch({headless:false, slowMo: 100})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://demowebshop.tricentis.com/login')

    // await page.locator('#Email').fill('carol123@email.com');
    // await page.press('#Email', 'Tab');
    // await page.fill('#Password', 'test123');

    // await page.locator('input.login-button').click({position: {x: 0, y: 0}, button: 'left', force: true, timeout: 1000});

    // await page.focus('#Email');

    await page.waitForTimeout(5000);

    const text = await page.$eval('.text', el => el.innerText)
    console.log('text: ' + text)
    expect(text).toContain('By creating an account on our website you will be able to shop faster')

    const booksHref = await page.$eval('a[href="/books"]', el => el.href)
    console.log('booksHref: ', booksHref)
    expect(booksHref).toBeDefined()

    const popularTagsCount = await page.$$eval('.buttons', el => el.length)
    console.log('buttonClassesCount: ' + popularTagsCount)
    expect(popularTagsCount).toBeGreaterThan(1)
    expect(popularTagsCount).toBeLessThanOrEqual(3) 

    const content = await page.textContent('a[href="/books"]')
    console.log('content: ' + content)

    const booksText = await page.innerText('a[href="/books"]')
    console.log('booksText: ' + booksText)

    const html = await page.innerHTML('.text')
    console.log('html: ' + html)

    const href = await page.getAttribute('a[href="/books"]', 'href')
    console.log('href: ' + href)

    await browser.close() 

}) ()