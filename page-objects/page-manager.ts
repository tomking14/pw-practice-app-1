import { Page } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigation-page'
import { FormsLayoutPage } from '../page-objects/formsLayoutPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager {

    private readonly page: Page
    private readonly navigationPage:  NavigationPage
    private readonly formLayoutPage: FormsLayoutPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormsLayoutPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }
    
    navigateTo(){
        return this.navigationPage
    
    }
    onFormsLayoutPage(){
        return this.formLayoutPage
    }
    onDatepickerPage(){
        return this.datepickerPage
    }
}