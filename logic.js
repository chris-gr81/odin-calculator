function add(a, b) {
    return Number(a) + Number(b);
}

function substract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (b === "0") return "Div 0 Error";
    return Number(a) / Number(b);
}

function operate(number1, number2, operator) {
    console.log(number1, number2, operator);
    let result = "";
    switch (operator) {
        case "+":
            result = add(number1, number2);
            break;
        case "-":
            result = substract(number1, number2);
            break;
        case "*":
            result = multiply(number1, number2);
            break;
        case "/":
            result = divide(number1, number2);
            break;
    }
    return result;
}

function mainProcess(inpVal) {
    if (cval.disMain === "Div 0 Error") {
        console.log("huhu");
        resetCalc();
        printDisplay();
    }

    if (cval.state === 0) {
        if (arithmetics.includes(inpVal) && cval.number1 === "") {
            // if coming from equal
            if (cval.disMain != "") {
                cval.disUpper += ` ${inpVal}`;
                cval.number1 = cval.disMain;
                cval.state = 1;
                cval.operator = inpVal;
                printDisplay();
            } else {
                // forbit operator as very first input
                return;
            }
        } else if (arithmetics.includes(inpVal) && cval.number1 != "") {
            cval.state = 1;
            cval.operator = inpVal;
        } else if (numbers.includes(inpVal)) {
            cval.number1 += inpVal;
            cval.disMain = cval.number1;
            printDisplay();
        }
    }

    if (cval.state === 1) {
        if (cval.firstRound) cval.disUpper = cval.number1;
        if (numbers.includes(inpVal)) {
            cval.state = 2;
        } else {
            // if arithmetics
            cval.operator = inpVal;
        }
        console.log(cval.firstRound);
        if (cval.firstRound === true) {
            cval.disUpper = `${cval.number1} ${cval.operator}`;
        } else {
            cval.disUpper = `${cval.disUpper.slice(0, -1)} ${cval.operator}`;
        }

        printDisplay();
    }

    if (cval.state === 2) {
        cval.firstRound = false;
        if (arithmetics.includes(inpVal)) {
            cval.number1 = operate(cval.number1, cval.number2, cval.operator);
            cval.operator = inpVal;
            cval.disUpper += ` ${cval.number2} ${cval.operator}`;
            cval.disMain = cval.number1;
            cval.number2 = "";
            cval.state = 1;
        } else if (numbers.includes(inpVal)) {
            cval.number2 += inpVal;
            cval.disMain = cval.number2;
        }
        printDisplay();
    }

    console.log(cval);
}

function serviceHandling(inpVal) {
    switch (inpVal) {
        case "C":
            resetCalc();
            break;
        case "=":
            equalStop();
            break;
        case "CE":
            resetDisMain();
            break;
        case "+/-":
            togglePM();
            break;
    }
}

function togglePM() {
    if (cval.state === 0) {
        if (cval.disUpper != "") {
            cval.number1 = operate(cval.disMain, "-1", "*");
            cval.disMain = cval.number1;
        } else {
            cval.number1 = operate(cval.number1, "-1", "*");
            cval.disMain = cval.number1;
        }
    }
    if (cval.state === 2) {
        cval.number2 = operate(cval.number2, "-1", "*");
        cval.disMain = cval.number2;
    }
    printDisplay();
}
function resetDisMain() {
    if (cval.state === 0) {
        cval.number1 = "";
        cval.disMain = "";
        cval.disUpper = "";
    } else if (cval.state === 2) {
        cval.number2 = "";
        cval.state = 1;
        cval.disMain = "";
    }
    printDisplay();
}

function resetCalc() {
    cval.state = 0;
    cval.number1 = "";
    cval.number2 = "";
    (cval.operator = ""),
        (cval.disMain = ""),
        (cval.disUpper = ""),
        (cval.firstRound = true),
        printDisplay();
}

function equalStop() {
    if (cval.state === 2 && cval.number2 !== "") {
        cval.number1 = operate(cval.number1, cval.number2, cval.operator);
        cval.disMain = cval.number1;
        cval.disUpper = cval.number1;
        cval.number1 = "";
        cval.number2 = "";
        cval.operator = "";
        cval.state = 0;
        cval.firstRound = true;
        printDisplay();
    }
    console.log(cval);
}

function printDisplay() {
    displayWork.innerText = cval.disMain;
    displayHistory.innerText = cval.disUpper;
}

// Starting point "main"--------------------------------------------------------------

// declaring objects and globals
const cval = {
    state: 0,
    number1: "",
    number2: "",
    operator: "",
    disMain: "",
    disUpper: "",
    firstRound: true,
};

let expression = "";

const displayWork = document.querySelector("#display-working");
const displayHistory = document.querySelector("#display-history");
const numberKeys = document.querySelectorAll(".numberKey");
const operatorKeys = document.querySelectorAll(".operatorKey");
const serviceKeys = document.querySelectorAll(".serviceKey");

const arithmetics = ["+", "-", "*", "/", "="];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = ["clear"];

numberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => mainProcess(numberKey.innerText));
});

operatorKeys.forEach((operatorKey) => {
    operatorKey.addEventListener("click", () =>
        mainProcess(operatorKey.innerText)
    );
});

serviceKeys.forEach((serviceKey) => {
    serviceKey.addEventListener("click", () =>
        serviceHandling(serviceKey.innerText)
    );
});

// initialize display
printDisplay(cval.disMain, cval.disUpper);
