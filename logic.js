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

function operate (cacheNumber, workingNumber, operator) {
    console.log(cacheNumber, workingNumber, operator)
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


function mainProcess(inpVal, keyType) {
    if (keyType === "operator" && calcValues.workingNumber === "") 
        return;
    else if (keyType === "operator" && calcValues.workingNumber != "")
        calcValues.stage++;
    else {


        switch (calcValues.stage) {
            case 0:
            case 2:
                updateValues(
                    calcValues.cacheNumber, // cache
                    calcValues.workingNumber += inpVal, // work
                    calcValues.operator, // operator
                    calcValues.stage, // stage
                    calcValues.workingNumber, //dspWork
                    calcValues.displayHistory // dspHistory
                );
                printDisplay();
                break;
            case 1:
                updateValues(
                    calcValues.workingNumber, // cache
                    "", // work
                    inpVal, // operator
                    2, // stage
                    calcValues.displayWork,// dspWork
                    `${calcValues.workingNumber} ${inpVal}`,// dspHistory
                );
                printDisplay();
                break;
            case 3:
                const calculation = operate(
                    calcValues.workingNumber, 
                    calcValues.cacheNumber, 
                    calcValues.operator
                );
                const temp = calcValues.workingNumber

                updateValues(
                    calculation,// cache
                    "",// work
                    inpVal,// operator
                    0, // stage
                    calculation,// dspWork
                    `${calcValues.displayHistory} ${temp} =` ,// dspHistory
                )
                printDisplay();
                break;
        }
    }
    console.log(calcValues)
    

}

function updateValues(cache, working, operator, stage, dspWork, dspHist) {
    calcValues.cacheNumber = cache;
    calcValues.workingNumber = working;
    calcValues.operator = operator;
    calcValues.stage = stage;
    calcValues.displayWork = dspWork;
    calcValues.displayHistory = dspHist;
   
}

function printDisplay() {
    displayWork.innerText = calcValues.displayWork;
    displayHistory.innerText = calcValues.displayHistory;
};



// declaring objects and globals
const calcValues = {
    stage: 0,
    cacheNumber: "",
    workingNumber: "",
    operator: "",
    displayWork: "",
    displayHistory: "",
    
}

const displayWork = document.querySelector("#display-working");
const displayHistory = document.querySelector("#display-history");
const numberKeys = document.querySelectorAll(".numberKey");
const operatorKeys = document.querySelectorAll(".operatorKey");


numberKeys.forEach((numberKey) => {
    numberKey.addEventListener(
        "click", () => mainProcess(numberKey.innerText, "number"))
})

operatorKeys.forEach((operatorKey) => {
    operatorKey.addEventListener(
        "click", () => mainProcess(operatorKey.innerText, "operator")
    )
})

// initialize display
updateValues("history", "", "", 0, "", "");
printDisplay();
