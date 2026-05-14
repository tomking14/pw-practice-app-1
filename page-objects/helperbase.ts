import { Page,expect } from '@playwright/test'

export class HelperBase {
    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInseconds: number){

        await this.page.waitForTimeout(timeInseconds * 1000)

    }
}