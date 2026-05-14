import {test} from '../testOptions'
import {faker} from '@faker-js/faker'



test('parameterized methods', async ({pageManager})=>{
    const randomFullName = faker.person.fullName()
    // replace is a js method to change one value with another of a string
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

// page manger will call the method to return the page object that was created in the page manager ts.
// imagine the same way you construct the object instance here, instead it was done in the pm manager

    await pageManager.onFormsLayoutPage().submitUsingGridFormWithCredentialsAndSelectOption('test@test.com','moretesting123','Option 1')
    await pageManager.onFormsLayoutPage().submitInlineFormWithNameAndCheckbox(randomFullName, randomEmail, true)
})
