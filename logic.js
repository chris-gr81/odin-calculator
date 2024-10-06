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
    return roundIt(result);
}

function roundIt(number) {
    let factor = Math.pow(10, ROUND_FACTOR);
    return Math.round(number * factor) / factor;

}

function mainProcess(inpVal) {
    if (!passDisplayLength(cval.disMain, inpVal)) {
        return null;
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
            manipulateNumber("-1");
            break;
        case ".":
            manipulateNumber(".");
            break;
    }
}

function manipulateNumber(modus) {
    if (cval.state === 0) {
        if (cval.disUpper != "") {
            switch (modus) {
                case "-1":
                    cval.number1 = operate(cval.disMain, modus, "*");
                    break;
                case ".":
                    if (!isFloated(cval.disMain))
                        cval.number1 = cval.disMain + modus;
                    break;
            }
            cval.disMain = String(cval.number1);
        } else {
            switch (modus) {
                case "-1":
                    cval.number1 = operate(cval.number1, modus, "*");
                    break;
                case ".":
                    if (!isFloated(cval.number1)) cval.number1 += modus;
                    break;
            }
            cval.disMain = cval.number1;
        }
    }
    if (cval.state === 2) {
        switch (modus) {
            case "-1":
                cval.number2 = operate(cval.number2, "-1", "*");
                break;
            case ".":
                if (!isFloated(cval.number2)) cval.number2 += modus;
                break;
        }

        cval.disMain = cval.number2;
    }
    printDisplay();
    console.log(cval);
}

function isFloated(a) {
    return String(a).includes(".");
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
        cval.disMain = String(cval.number1);
        cval.disUpper = String(cval.number1);
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
    // creating display main section
    const mainLength = String(cval.disMain).length;
    let sizVal = "";
    if (mainLength <= 10) sizVal = "1.6em";
    else if (mainLength <= 16) sizVal = "1.0em";
    else if (mainLength <= 20) sizVal = "0.8em";
    else sizVal = "0.6em";

    displayWork.style.fontSize = sizVal;
    displayWork.style.lineHeight = sizVal;

    displayWork.innerText = cval.disMain;

    //creating display history section
    const slicedUpper = String(cval.disUpper).slice(-MAX_HISTORY_LENGTH)
    displayHistory.innerText = slicedUpper;
}

function passDisplayLength(test, inpVal) {
    if (
        test.length >= MAX_INPUT_LENGTH &&
        numbers.includes(inpVal) &&
        (cval.state === 0 || cval.state === 2)
    ) {
        return false;
    } else {
        return true;
    }
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

const MAX_INPUT_LENGTH = 20;
const MAX_HISTORY_LENGTH = 40;
const ROUND_FACTOR = 6;

const displayWork = document.querySelector("#display-working");
const displayHistory = document.querySelector("#display-history");
const numberKeys = document.querySelectorAll(".numberKey");
const operatorKeys = document.querySelectorAll(".operatorKey");
const serviceKeys = document.querySelectorAll(".serviceKey");

const arithmetics = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const service = ["Escape", "Backspace", "=", "Enter", ".", "F9"];

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

// keyboard-support
document.addEventListener("keydown", (e) => {
    numbers.includes(e.key) && mainProcess(e.key);
    arithmetics.includes(e.key) && mainProcess(e.key);
    if (service.includes(e.key)) {
        switch (e.key) {
            case "Enter":
            case "=":
                serviceHandling("=");
                break;
            case "Escape":
                serviceHandling("C");
                break;
            case "Backspace":
                serviceHandling("CE");
                break;
            case ".":
                serviceHandling(".");
                break;
            case "F9":
                serviceHandling("+/-");
                break;
        }
    }
    console.log(e.key);
});

// initialize display
printDisplay(cval.disMain, cval.disUpper);
