import {test, expect} from '@playwright/test'



test('local fields', async ({page}, testInfo)=>{
        await page.goto('http://localhost:4200/')
        if (testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        if (testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click()
        }

        const usingTheGridEmailFieldInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailFieldInput.fill('test@test.com')
        await usingTheGridEmailFieldInput.clear()
        await usingTheGridEmailFieldInput.pressSequentially('test2@test.com')
        

    })