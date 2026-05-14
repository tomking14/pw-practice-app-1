import {helpingme} from './helper.js'
// import everything
import * as helper from './helper.js'

let firstname= "John"
let lastname = "smith"

const newsentance = "your name is " + firstname + " " + lastname + ". please remember that"
const newsentance2 = `your name is ${firstname} ${lastname}. please remember that`
console.log(newsentance2)

let human = {
    firstname: "Joe",
    lastname: "Mcmuffin"
}
human.firstname = "whatttt"
console.log(human.firstname)

let cars = ["Tesla","BMW","Mercedes"]


// for (let car of cars) {
//     console.log(car)
// }
// different syntax
cars.forEach(car =>{
    console.log(car)
})

function hello1() {
    console.log("hello world")
}
hello1()

let anynymousFunction = function () {
    console.log("testing shit")
}
anynymousFunction()

let onemorefunction = () =>{
    console.log("give me one more chance")
}
onemorefunction()
// === checks both value and data type, == only checks value

helpingme()
console.log(helper.morehelp())

// classes

helper.oneCustomer.newcustomer("Joe")
