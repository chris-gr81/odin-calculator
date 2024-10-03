function add (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (cacheNumber, workingNumber, operator) {
    let result = ""
    switch (operator) {
        case "+":
            result = add (cacheNumber, workingNumber);
            break;
        case "-":
            result = substract (cacheNumber, workingNumber);
            break;
        case "*":
            result = multiply (cacheNumber, workingNumber);
            break;
        case "/":
            result = divide (cacheNumber, workingNumber);
            break;
    }
    return result;
}

function getInput(inpVal, keyType) {
    workingNumber += inpVal;
    displayWork.innerText = workingNumber;
}
let cacheNumber = ""; 
let workingNumber = ""; 
let operator = "";

let displayWork = document.querySelector("#display-working");
let numberKeys = document.querySelectorAll(".numberKey");

numberKeys.forEach((numberKey) => {
    numberKey.addEventListener(
        "click", () => getInput(numberKey.innerText, "number"))
})

console.log(display.innerText)
// console.log(substract(a, b));
// console.log(mulitply(a, b));
// console.log(divide(a, b));