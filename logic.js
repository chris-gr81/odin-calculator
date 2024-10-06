/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number. 
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
    return Number(a) + Number(b);
}

/**
 * Subtracts the second number from the first.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @return {number} The result of a - b.
 */
function substract(a, b) {
    return Number(a) - Number(b);
}

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @return {number} The product of a and b.
 */
function multiply(a, b) {
    return Number(a) * Number(b);
}

/**
 * Divides the first number by the second. Returns an error message
 * if attempting to divide by zero.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @return {number|string} The quotient or an error message.
 */
function divide(a, b) {
    if (b === "0") return "Div 0 Error";
    return Number(a) / Number(b);
}

/**
 * Performs the arithmetic operation based on the given operator.
 * @param {number} number1 - The first operand.
 * @param {number} number2 - The second operand.
 * @param {string} operator - The operator (+, -, *, /).
 * @return {number} The result of the operation.
 */
function operate(number1, number2, operator) {
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

/**
 * Rounds the result to a predefined number of decimal places.
 * @param {number} number - The number to be rounded.
 * @return {number} The rounded number.
 */
function roundIt(number) {
    let factor = Math.pow(10, ROUND_FACTOR);
    return Math.round(number * factor) / factor;

}

/**
 * Main process to handle input from the calculator buttons.
 * Handles arithmetic operations, number inputs, and updating the display.
 * @param {string} inpVal - The input value from the user.
 */
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
}

/**
 * Handles service-related keys like "C", "=", "CE", "+/-", and ".".
 * @param {string} inpVal - The input value from the service key.
 */
function serviceHandling(inpVal) {
    if (inpVal === "C") return resetCalc();
    if (inpVal === "=") return equalStop();
    if (inpVal === "CE") return resetDisMain();
    if (inpVal === "+/-") return manipulateNumber("-1");
    if (inpVal === ".") return manipulateNumber(".");
}

/**
 * Manipulates the current number based on the given mode (e.g., 
 * toggle sign, add decimal point).
 * @param {string} modus - The mode to manipulate the number 
 * ("-1" for sign, "." for decimal).
 */
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
}

/**
 * Checks if a number is a floating-point number.
 * @param {number|string} a - The number to be checked.
 * @return {boolean} True if the number has a decimal point, false otherwise.
 */
function isFloated(a) {
    return String(a).includes(".");
}

/**
 * Resets the current display (disMain) without affecting the history.
 */
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

/**
 * Resets the entire calculator, clearing all inputs and states.
 */
function resetCalc() {
    cval.state = 0;
    cval.number1 = "";
    cval.number2 = "";
    cval.operator = "";
    cval.disMain = "";
    cval.disUpper = "";
    cval.firstRound = true;
    printDisplay();
}

/**
 * Finalizes the current calculation, performing the pending operation.
 */
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
}

/**
 * Updates the display for the main calculation and history.
 * Resizes the font if the number of characters exceeds certain limits.
 */
function printDisplay() {
    // creating display main section
    const mainLength = String(cval.disMain).length;
    let sizVal = "";
    if (mainLength <= 9) sizVal = "1.6em";
    else if (mainLength <= 14) sizVal = "0.8em";
    else if (mainLength <= 18) sizVal = "0.6em";
    else sizVal = "0.3em";

    displayWork.style.fontSize = sizVal;
    displayWork.style.lineHeight = sizVal;

    displayWork.innerText = cval.disMain;

    //creating display history section
    const slicedUpper = String(cval.disUpper).slice(-MAX_HISTORY_LENGTH)
    displayHistory.innerText = slicedUpper;
}

/**
 * Validates if the display exceeds the maximum allowed length.
 * @param {string} test - The current display value.
 * @param {string} inpVal - The input value to be added.
 * @return {boolean} Whether the input can be accepted based on the display length.
 */
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

// Declaring calculator state and variables

/**
 * `cval` holds the current state of the calculator, including:
 * - `state`: The current state of the calculator (0: initial, 1: operator selected, 2: second number input).
 * - `number1`: The first number in the calculation.
 * - `number2`: The second number in the calculation.
 * - `operator`: The current operator (e.g., +, -, *, /).
 * - `disMain`: The main display value (current number shown).
 * - `disUpper`: The upper display value (history of operations).
 * - `firstRound`: A flag to indicate if it's the first operation in the session.
 */
const cval = {
    state: 0,
    number1: "",
    number2: "",
    operator: "",
    disMain: "",
    disUpper: "",
    firstRound: true,
};

/** The maximum number of input characters allowed for the display. */
const MAX_INPUT_LENGTH = 18;

/** The maximum number of characters displayed in the history area. */
const MAX_HISTORY_LENGTH = 40;

/** Number of decimal places to round the result to. */
const ROUND_FACTOR = 6;

// ------------------------------- DOM Element Selection -----------------------------------

/**
 * Selecting DOM elements for the calculator:
 * - `displayWork`: The main display area for the current number.
 * - `displayHistory`: The upper display area for the history of operations.
 */
const displayWork = document.querySelector("#display-working");
const displayHistory = document.querySelector("#display-history");

/**
 * Selecting all calculator keys:
 * - `numberKeys`: Array of all number keys (0-9).
 * - `operatorKeys`: Array of all operator keys (+, -, *, /).
 * - `serviceKeys`: Array of service keys (e.g., Clear, Equals, etc.).
 */
const numberKeys = document.querySelectorAll(".numberKey");
const operatorKeys = document.querySelectorAll(".operatorKey");
const serviceKeys = document.querySelectorAll(".serviceKey");

// ------------------------------- Valid Input Lists --------------------------------------

/**
 * Defining valid input values for the calculator:
 * - `arithmetics`: List of valid arithmetic operators.
 * - `numbers`: List of valid number inputs (0-9).
 * - `service`: List of valid service key inputs (e.g., Escape, Backspace, Enter, etc.).
 */
const arithmetics = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const service = ["Escape", "Backspace", "=", "Enter", ".", "F9"];

// ------------------------------- Event Listeners ----------------------------------------

/**
 * Adding event listeners for the number, operator, and service keys.
 * - Number keys call `mainProcess` with the number pressed.
 * - Operator keys call `mainProcess` with the operator pressed.
 * - Service keys (e.g., Clear, Equals, +/-) call `serviceHandling`.
 */
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

// ------------------------------- Keyboard Support ----------------------------------------

/**
 * Adding support for keyboard inputs:
 * - Handles number, arithmetic operators, and service keys.
 * - Supports key inputs like Enter (=), Escape (Clear), Backspace (Clear Entry), and F9 (+/-).
 */
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
});

// ------------------------------- Initialize Display --------------------------------------

/** Initializing the display by showing default values. */
printDisplay(cval.disMain, cval.disUpper);
