import {test, expect} from '@playwright/test'

test.beforeEach(async({page},testInfo) =>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByRole('button').filter({hasText: 'Button Triggering AJAX Request'}).click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test.skip('auto waiting', async({page})=>{
    const successButton = page.locator('.bg-success')

    // this will help the issue of certain functions that aren't waiting for the page to change states.
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    
    expect(text).toContain('Data loaded with AJAX get request.')

    // you can bypass by adding your own timeout
    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})

test.skip('alternative waits', async({page})=>{
    const successButton = page.locator('.bg-success')

    // ___ wait for element
    await page.waitForSelector('.bg-success')

    // ___ wait for a particular response. need to provide the URL of the response in the network page
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___ wait for network calls to be completed (NOT RECCOMENDED). if some API gets stuck, the entire test will be stuck
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    
    expect(text).toContain('Data loaded with AJAX get request.')



})

test.skip('timeouts test', async ({page})=>{
    test.setTimeout(10000)
    // in case there's a timeout for a test, this will increase the time limit by 3
    test.slow()

    const successButton = page.locator('.bg-success')
    // bypass the timeouts by adding one
    await successButton.click({timeout: 16000})

})