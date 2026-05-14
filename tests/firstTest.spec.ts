import {test, expect} from '@playwright/test'

// beforeAll hook runs once at the beginning of running the file. will apply to all
// you also have afterAll and afterEach hook

// a hook used to do something that's done for every test regardless. runs everytime before a test starts
test.beforeEach(async({page}) =>{
    // set an environment varialbe in ts config file, so now it will just go to it that way.
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

// test has 2 params, the name of the test, and the actual test method
// need to pass a fixture, page is the blank page of a browser
// all methods that return a promise must be an async function
test('the first test', async ({page}) =>{
    await page.getByText('Form Layouts').click()

})
test('navigate to datepicker page', async ({page}) =>{
    await page.getByText('Datepicker').click()

})


// a test suite
// you can use before and after hooks for different suites
test.describe('test suite one', ()=>{

    test.beforeEach(async({page}) =>{
    await page.getByText('Forms').click()
    })

    test('the first test in a suite', async ({page}) =>{
        await page.getByText('Form Layouts').click()

    })
    test('2nd navigate to datepicker page', async ({page}) =>{
        await page.getByText('Datepicker').click()

    })

})

test('locator syntax rules', async ({page}) =>{
    // By tag name
    await page.locator('input').first().click()

    // by ID
     page.locator('#inputEmail1')

    // by class value
    page.locator('.shape-rectangle')

    // by attribute

    page.locator('[placeholder="Email"]')

    // by class value (full class)

    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors, no spaces

    page.locator('input[placeholder="Email"]')

    // by partial text match

    page.locator(':text("Using")')

    // by exact text match

    page.locator(':text-is("Using the Grid")')
})

// it's important to test with user facing items and locators. something a user will see

test('user facing locators', async ({page})=>{
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('SignIn').click()

})
// finding child elements
test('locating child elements', async ({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
// chaining the locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})
// using parent elements
test('locating parent elements', async ({page})=>{
    await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card',{has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()

    // you can use filter to chain them one by one
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
})

test('reusing the locators', async ({page}) =>{

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})


test('extracting values', async ({page})=>{
    // single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // value of input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    // getting value for a text thats in input field
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // attribute value like a placeholder
    const emailplaceholder = await emailField.getAttribute('placeholder')
    expect(emailplaceholder).toEqual('Email')

})

test('assertions', async ({page})=>{
    
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    const buttonText = await basicFormButton.textContent()
    expect(buttonText).toEqual('Submit')


    //assertions on a locator must have an await. the previous already "located", this one still needs to locate
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertion means that even if it fails this assertion, it will move on to the next step.
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

    
})


