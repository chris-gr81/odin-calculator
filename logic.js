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

function operate (firstNumber, secondNumber, operator) {
    let result = ""
    switch (operator) {
        case "+":
            result = add (firstNumber, secondNumber);
            break;
        case "-":
            result = substract (firstNumber, secondNumber);
            break;
        case "*":
            result = multiply (firstNumber, secondNumber);
            break;
        case "/":
            result = divide (firstNumber, secondNumber);
            break;
    }
    return result;
}

let firstNumber = ""; 
let secondNumber = ""; 
let operator = "";

console.log(operate(5, 9, "/"));
// console.log(substract(a, b));
// console.log(mulitply(a, b));
// console.log(divide(a, b));