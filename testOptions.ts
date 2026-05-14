import {test as base} from "@playwright/test";
import { PageManager } from './page-objects/page-manager';

export type testOptions = {
    globalsQaURL: string
    formLayoutPage: string
    pageManager: PageManager

}
export const test = base.extend<testOptions>({
    globalsQaURL: ['',{option: true}],
// setting auto to true says that this fixture will be automatically initialized before anything else
// BAD idea to set it this way, only set it for really global fixtures
    formLayoutPage: async ({page}, use) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        // everything before the use will be done as preconditions for the test as setting up the env
        await use('') 
        
        // everything after will be after the test is done

    },
    // dependecy fixture, so pageManager will initialize formsLayoutPage first, and then pageManager
    pageManager: async({page, formLayoutPage}, use) =>{
        const pm = new PageManager(page)
        await use(pm)

    }
})
