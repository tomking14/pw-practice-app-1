import { Page,expect } from '@playwright/test'

export class DatepickerPage {

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }
// uses a helper method to get the value selected. 

    async selectCommonDatepickerDateFromToday(numberofDaysFromToday: number){
            const calenderInputField = this.page.getByPlaceholder('Form Picker')
            await calenderInputField.click()
            const datetoAssert = await this.selectDateInCalender(numberofDaysFromToday)
        
            await expect(calenderInputField).toHaveValue(datetoAssert)

    }

    async selectDatepickerWithRangeFromToday(startDate: number, endDate: number){
            const calenderInputField = this.page.getByPlaceholder('Range Picker')
            await calenderInputField.click()

            const datetoAssertStart = await this.selectDateInCalender(startDate)
            const datetoAssertEnd = await this.selectDateInCalender(endDate)

            const dateToAssert = `${datetoAssertStart} - ${datetoAssertEnd}`
            await expect(calenderInputField).toHaveValue(dateToAssert)

    }

    private async selectDateInCalender(numberofDaysFromToday: number) {
            let date = new Date()
            date.setDate(date.getDate() +  numberofDaysFromToday)
            const expectedDate = date.getDate().toString()
            const expecteMonthShort = date.toLocaleString('En-US', {month: 'short'})
            const expecteMonthLong = date.toLocaleString('En-US', {month: 'long'})
            const expectedYear = date.getFullYear()
            const expectedOutputDate = `${expecteMonthShort} ${expectedDate}, ${expectedYear}`
        
            let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() || ''
            const expectedMonthAndYear = ` ${expecteMonthLong} ${expectedYear} `
            while (!calenderMonthAndYear.includes(expectedMonthAndYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() || ''
            }    
        
            // exact true will look only for the text provided
            await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate,{exact: true}).click()

            return expectedOutputDate
        
    }
}