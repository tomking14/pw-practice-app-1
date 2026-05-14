import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/page-manager'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) =>{
    await page.goto('http://localhost:4200/')

})

test('navigate to form page', async ({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTabPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})
test('parameterized methods', async ({page})=>{
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    // replace is a js method to change one value with another of a string
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
// page manger will call the method to return the page object that was created in the page manager ts.
// imagine the same way you construct the object instance here, instead it was done in the pm manager
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormsLayoutPage().submitUsingGridFormWithCredentialsAndSelectOption('test@test.com','moretesting123','Option 1')

    // screenshotting right after a certain step of a test was completed. give a path and name of the screenshot
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    await pm.onFormsLayoutPage().submitInlineFormWithNameAndCheckbox(randomFullName, randomEmail, true)
    // get a screenshot of only a specific area on the page
    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/formLayoutsPage.png'})
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3,12)



})
test.only('testing with argos ci', async ({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
})

    // convert screenshots for other applications
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64'))