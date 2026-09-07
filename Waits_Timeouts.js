const { chromium } = require('playwright');
const { expect } = require('expect');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const context = await browser.newContext()
  context.setDefaultTimeout(45000)
  const page = await context.newPage()
  page.setDefaultTimeout(45000)

  await page.goto('https://demowebshop.tricentis.com/login')
  const title = await page.title()
  expect(title).toBe('Demo Web Shop. Login')

  // await page.waitForTimeout(5000)
  const emailInput = page.locator('.email')
  await emailInput.waitFor({ state: 'visible' })
  await emailInput.fill('carol123@email.com')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[target="_blank"]') // Opens a new tab
  ])

  await page.waitForLoadState()

  await browser.close()
})()