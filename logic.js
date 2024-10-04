function add (a, b) {
    return Number(a) + Number(b);
}

function substract (a, b) {
    return Number(a) - Number(b);
}

function multiply (a, b) {
    return Number(a) * Number(b);
}

function divide (a, b) {
    return Number(a) / Number(b);
}

function operate (number1, number2, operator) {
    console.log(number1, number2, operator)
    let result = ""
    switch (operator) {
        case "+":
            result = add (number1, number2);
            break;
        case "-":
            result = substract (number1, number2);
            break;
        case "*":
            result = multiply (number1, number2);
            break;
        case "/":
            result = divide (number1, number2);
            break;
    }
    return result;
}


function mainProcess(inpVal) {

    if(cval.state === 0) {
        if(arithmetics.includes(inpVal) && cval.number1 === "") { 
            // forbit operator as very fist input
            return null; 
        } else if(arithmetics.includes(inpVal) && cval.number1 != "") {
            cval.state = 1; 
            cval.operator = inpVal; 
        } else if(numbers.includes(inpVal)) { 
            cval.number1 += inpVal;
            cval.disMain = cval.number1;
            printDisplay();
        }
    }

    if(cval.state === 1) {
        cval.disUpper = cval.number1;
        if(numbers.includes(inpVal)) {
            cval.state = 2;
            cval.number2 += inpVal;
        } else {
            cval.operator = inpVal;      
        }
        cval.disUpper = `${cval.number1} ${cval.operator}`
        printDisplay();
    }   
    
    if(cval.state === 2) {
        if(arithmetics.includes(inpVal)) {
            console.log("wuff")
        }
        
    }
    
    
    console.log(cval);
}

function printDisplay() {
    displayWork.innerText = cval.disMain;
    displayHistory.innerText = cval.disUpper;
};



// declaring objects and globals
const cval = {
    state: 0,
    number1: "",
    number2: "",
    operator: "",
    disMain: "",
    disUpper: "",
    
}

let expression = "";

const displayWork = document.querySelector("#display-working");
const displayHistory = document.querySelector("#display-history");
const numberKeys = document.querySelectorAll(".numberKey");
const operatorKeys = document.querySelectorAll(".operatorKey");

const arithmetics = ["+", "-", "*", "/", "="];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = ["clear"];

numberKeys.forEach((numberKey) => {
    numberKey.addEventListener(
        "click", () => mainProcess(numberKey.innerText, cval.state)
    );
});

operatorKeys.forEach((operatorKey) => {
    operatorKey.addEventListener(
        "click", () => mainProcess(operatorKey.innerText, cval.state)
    );
});

// initialize display
printDisplay(cval.disMain, cval.disUpper);
