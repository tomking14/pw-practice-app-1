function helpingme() {
    console.log("yes I am helping")
}
export {helpingme}

export function morehelp() {
    return "MOREEEE"
}

 class customerDetails {
    /**
     * this method prints the name and noice
     * @param {string} parameter 
     */
    newcustomer(parameter) {
        console.log("noice " + parameter)
    }
}
export let oneCustomer = new customerDetails()