import {test, expect} from '@playwright/test'
// running all tests in this spec file only parallel
// test.describe.configure({mode: 'parallel'})

test.beforeEach(async({page}) =>{
    await page.goto('http://localhost:4200/')

})

test.describe('Form layouts page @block', ()=>{
    test.describe.configure({retries: 0})

    test.beforeEach('Forms layout page',async ({page})=>{

        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
    test('local fields', async ({page})=>{
        const usingTheGridEmailFieldInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailFieldInput.fill('test@test.com')
        await usingTheGridEmailFieldInput.clear()
        await usingTheGridEmailFieldInput.pressSequentially('test2@test.com')

        // generic assertion

        const inputValue = await usingTheGridEmailFieldInput.inputValue()
        expect(inputValue).toEqual("test2@test.com")

        // locator assertion
        await expect(usingTheGridEmailFieldInput).toHaveValue('test@test.com')

    })
    test.only('radio buttons', async ({page})=>{
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

        // check is used for radio buttons, but it can't be hidden, use force: true for it when the UI element is visually hidden

        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        // get the status of a radio button 2 ways
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        // await expect(usingTheGridForm).toHaveScreenshot()

        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        await usingTheGridForm.getByLabel('Option 2').check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()

    })
    
})

test('checkboxes', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    // check on a checked checkbox will not change it's value, uncheck will
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allCheckBoxes = page.getByRole('checkbox')
    // turn a list of items into an array
    for (const box of await allCheckBoxes.all()){
         await box.check({force: true})
         expect(await box.isChecked()).toBeTruthy()

    }

})
test('lists and dropdowns', async({page})=>{
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    // ul is the parent element of li
    page.getByRole('list') //used when list has a ul tag
    page.getByRole('listitem') //used when the list has li tag

    // const optionList = page.getByRole('list').locator('nb-option')

    // got the list, now we validate the options
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    const header = page.locator('nb-layout-header')
    // to have css needs 2 params, the class, and then it's value, separated by a comma
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // looping through an object, changing the background, and checking if the value is equal to what's in the object
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"    
    
    }
    await dropDownMenu.click()
    for(const color in colors){

        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color as keyof typeof colors])
        if (color !='Corporate'){
            await dropDownMenu.click()
        }
        

        }

})
test('tooltips', async ({page})=>{

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip') //only works if the role tooltip was created
    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')

})


test('dialog box', async ({page})=>{

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // for browser dialog
    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})

test('web tables', async ({page})=>{

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // get row by any text in the row
    const  targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    // get the row based on a specific value in a column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()

    const targetRowByID = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText("test@test.com")

    // test filter of the table

    const ages = ["20", "30", "40", "200"]

    for (let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()

            if (age =='200'){
                expect(await page.getByRole('table').textContent()).toContain("No data found")
            }else {
                expect(cellValue).toEqual(age)
            }
            
        }
    }
})

test('datepicker', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    const calenderInputField = page.getByPlaceholder('Form Picker')
    await calenderInputField.click()

    let date = new Date()
    date.setDate(date.getDate() +  7)
    const expectedDate = date.getDate().toString()
    const expecteMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expecteMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const expectedOutputDate = `${expecteMonthShort} ${expectedDate}, ${expectedYear}`

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() || ''
    const expectedMonthAndYear = ` ${expecteMonthLong} ${expectedYear} `
    while (!calenderMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() || ''
    }    

    // exact true will look only for the text provided
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click()
    await expect(calenderInputField).toHaveValue(expectedOutputDate)

    
})
test('sliders', async ({page})=>{
    // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // changes the value of the gauge thing
    // await tempGauge.evaluate( node =>{
    //     node.setAttribute('cx', '229.0515')
    //     node.setAttribute('cy', '229.0515')
    // })
    // await tempGauge.click()

    // test by changing the mouse
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()
    // creates a limit of how far the mouse can go. imagine an x and y box. to go outside the box, give a negative value
    const box = await tempBox.boundingBox()
    if (!box) throw new Error('Could not get bounding box for temperature dragger')
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y)
    // mouse.down is like left click
    await page.mouse.down()
    await page.mouse.move(x+100, y)
    // x+100 moves to the right, y+100 moves down, not up. 
    await page.mouse.move(x+100, y+100)
    // mouse.up is like releasing the mouse
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})