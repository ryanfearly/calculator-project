//MATH
let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;
let operate = function(operator, x, y) {
    let output;
    if (operator === '+') output = add(x, y);
    if (operator === '−') output = subtract(x, y);
    if (operator === 'x') output = multiply(x, y);
    if (operator === '÷') {
        if (y === 0) {
            alert("You know better than to divide by zero! Let's start over.")
            output = 'reset';
        } else output = divide(x, y);
    }
    
    //Round if needed
    let outputLength = output.toString().length;
    let maxDisplay = 14;    
    if (outputLength >= maxDisplay) { //Maximum the calc can display
        if ((output.toString().indexOf('.') >= 0) && (output.toString().indexOf('.') < 12)) { //Does a decimal appear early enough to round off?
            output = output.toFixed(maxDisplay - output.toString().indexOf('.')); //Round
        } else {
            alert("I can't handle numbers this big! Let's start over");
            output = 'reset';
        }
    }

    return output;
}

//Calculator operation
let displayValue = '';
let arg1 = '';
let arg2 = '';
let lastOperator = '';
let lastKeyWas = '';


//Number keys
let numKeys = document.querySelectorAll('.number')
numKeys.forEach(button => {
    button.addEventListener('click', () => {
        let numPressed = button.innerHTML;
        if (lastKeyWas == 'equals') {
            displayValue = '';
            arg1 = '';
            arg2 = '';
            lastOperator = '';
            lastKeyWas = '';
        } else if (lastKeyWas == 'operator') displayValue = '';
        
        if (!(numPressed == '.' && displayValue.indexOf('.') != -1)) displayValue += numPressed;
        document.querySelector('#display').innerHTML = displayValue;
        lastKeyWas = 'number';
    })
})

//Operators
let operatorKeys = document.querySelectorAll('.operator')
operatorKeys.forEach(button => {
    button.addEventListener('click', () => {
        let operatorPressed = button.innerHTML;
        if (lastKeyWas == 'number') {
            (arg1 != '') ? arg1 = operate(lastOperator, +arg1, +displayValue) : arg1 = displayValue;
        } else if (lastKeyWas == 'equals') {
            arg1 = displayValue;
            arg2 = '';
        }
        
        displayValue = arg1;
        document.querySelector('#display').innerHTML = displayValue;
        lastOperator = operatorPressed; //covers the lastKeyWas=='operator' condition
        lastKeyWas = 'operator';
        if (displayValue == 'reset') clearAll();
    })
})


//Equals sign
let equalsKey = document.querySelector('#equals')
equalsKey.addEventListener('click', () => {
    if (arg1 != '') {
        if ((lastKeyWas == 'number') || (lastKeyWas == 'operator')) {
            arg2 = displayValue;
        } else if (lastKeyWas == 'equals') arg1 = displayValue;

        arg1 = operate(lastOperator, +arg1, +arg2);
        displayValue = arg1;
        document.querySelector('#display').innerHTML = displayValue;
    }

    lastKeyWas = 'equals'
    if (displayValue == 'reset') clearAll();
})

//All clear function
let clearAll = function() {
    displayValue = '';
    arg1 = '';
    arg2 = '';
    lastOperator = '';
    lastKeyWas = '';
    document.querySelector('#display').innerHTML = '0';
}

//All clear button
let clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', () => {
    clearAll();
})

//Percent Button
let percentButton = document.querySelector('#percent')
percentButton.addEventListener('click', () => {
    if (displayValue != '') {
        displayValue /= 100;
        document.querySelector('#display').innerHTML = displayValue;
        lastKeyWas = 'equals';
        arg1 = '';
        arg2 = '';
        lastOperator = '';
    }
})

//Negative Button
let negativeButton = document.querySelector('#negative')
negativeButton.addEventListener('click', () => {
    if (displayValue != '') {
        displayValue *= -1;
        document.querySelector('#display').innerHTML = displayValue;
        lastKeyWas = 'equals';
        arg1 = '';
        arg2 = '';
        lastOperator = '';
    }
})