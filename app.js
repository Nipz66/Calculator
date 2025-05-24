document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyContainer = document.getElementById('history-container'); // Added
    const numberButtons = document.querySelectorAll('.number-btn');
    const decimalButton = document.getElementById('btn-decimal');
    const clearButton = document.getElementById('btn-clear');
    const equalsButton = document.getElementById('btn-equals');
    // Specific operator buttons for calculation logic
    const addButton = document.getElementById('btn-add');
    const subtractButton = document.getElementById('btn-subtract');
    const multiplyButton = document.getElementById('btn-multiply');
    const divideButton = document.getElementById('btn-divide');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetDisplay = false;
    let history = []; // Added

    function updateDisplay() {
        display.value = (currentInput === '' || currentInput === '-') ? '0' : currentInput;
    }

    function updateHistoryDisplay() { // Added
        historyContainer.innerHTML = ''; // Clear previous history
        if (history.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No history yet.';
            historyContainer.appendChild(p);
            return;
        }
        const ul = document.createElement('ul');
        history.slice().reverse().forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            ul.appendChild(li);
        });
        historyContainer.appendChild(ul);
    }

    function performCalculation() {
        if (previousInput === '' || operator === null || currentInput === '' || currentInput === 'Error' || currentInput === 'Error: Div by 0') {
            return false; 
        }

        const prev = parseFloat(previousInput);
        const currentVal = parseFloat(currentInput); // Store current value for history
        const currentNumStr = currentInput; // Store original string for history

        if (isNaN(prev) || isNaN(currentVal)) {
            currentInput = 'Error';
            return false; 
        }

        let result;
        switch (operator) {
            case '+':
                result = prev + currentVal;
                break;
            case '-':
                result = prev - currentVal;
                break;
            case '*':
                result = prev * currentVal;
                break;
            case '/':
                if (currentVal === 0) {
                    currentInput = 'Error: Div by 0';
                    return false; 
                }
                result = prev / currentVal;
                break;
            default:
                return false; 
        }
        
        const resultStr = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(10)).toString();
        
        // Add to history before currentInput is updated with the result for this specific calculation
        const historyEntry = `${previousInput} ${operator} ${currentNumStr} = ${resultStr}`;
        history.push(historyEntry);
        updateHistoryDisplay();

        currentInput = resultStr; // Now update currentInput with the result
        return true;
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.textContent;
            // If the current display shows an error, start fresh
            if (currentInput === 'Error' || currentInput === 'Error: Div by 0') {
                currentInput = number; // Start new input
            } else if (shouldResetDisplay) {
                currentInput = number;
                shouldResetDisplay = false;
            } else {
                // If currentInput is '0', replace it with the number, otherwise append
                currentInput = currentInput === '0' ? number : currentInput + number;
            }
            updateDisplay();
        });
    });

    decimalButton.addEventListener('click', () => {
        if (currentInput === 'Error' || currentInput === 'Error: Div by 0') {
            currentInput = '0.'; // Start new input as 0.
        } else if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            // Append decimal point only if one doesn't already exist
            currentInput += '.';
        }
        updateDisplay();
    });

    // Operator buttons (+, -, *, /)
    const calcOperatorButtons = [addButton, subtractButton, multiplyButton, divideButton];
    calcOperatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedOperator = button.textContent;
            
            // If current input is an error, don't proceed with operator logic
            if (currentInput === 'Error' || currentInput === 'Error: Div by 0') {
                shouldResetDisplay = true; // Ensure next number input clears error
                return;
            }

            // If an operator is already set, and we have a previousInput, 
            // and currentInput is not empty (and display wasn't just reset for new input),
            // then perform the pending calculation. This handles chained operations like "5 + 3 - 2".
            if (operator !== null && previousInput !== '' && currentInput !== '' && !shouldResetDisplay) {
                if (!performCalculation()) { // If calculation fails (e.g. div by zero)
                    // Error message is already set in currentInput by performCalculation
                    shouldResetDisplay = true; // Reset display for next input
                    updateDisplay(); // Show the error
                    return; // Stop further processing for this click
                }
                // After successful calculation, result is in currentInput. This becomes previousInput for the new operation.
            }
            
            // Set the new operator
            operator = selectedOperator;
            // Store the current number (which might be a result of a previous calculation) as previousInput
            previousInput = currentInput; 
            shouldResetDisplay = true; // Next number input should clear the display for the new number
        });
    });

    equalsButton.addEventListener('click', () => {
        // If current input is an error, do nothing more than ensure display is reset for next input
        if (currentInput === 'Error' || currentInput === 'Error: Div by 0') {
            shouldResetDisplay = true;
            updateDisplay(); // Ensure error is shown if not already
            return;
        }

            // performCalculation now handles history and updates currentInput
            if (performCalculation()) { 
                operator = null; 
                previousInput = ''; 
        }
            // If performCalculation returned false, currentInput has error or hasn't changed.
            shouldResetDisplay = true; 
            updateDisplay(); 
    });

    clearButton.addEventListener('click', () => {
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
            // Note: History is NOT cleared by AC button as per requirements
    });

        // Initialize display and history display when the script loads
    updateDisplay();
        updateHistoryDisplay(); // Added
});