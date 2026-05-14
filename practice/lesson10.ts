
// typescript is very similar to JS, but once you initialize a certain value to a variable, you can't change it.
let customerFirstname: string = "Joe"
let customerLastname = "Smith"
let age: number = 25

// my own type of data that i created. In this case it's an object
type customer = {firstName: string, lastname: string, active: boolean}

let newCustomer: customer =  {
    firstName: "Jone",
    lastname: "Smithens",
    active: true
}