const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      // Prevent multiple dots
      const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
      if (value === '.' && lastNumber.includes('.')) return;

      currentInput += value;
    }

    else if (button.classList.contains('operator')) {
      if (currentInput === '' || isOperator(currentInput.slice(-1))) return;
      currentInput += value;
    }

    else if (button.classList.contains('equal')) {
      try {
        if (currentInput && !isOperator(currentInput.slice(-1))) {
          currentInput = eval(currentInput).toString();
          resetNext = true;
        }
      } catch {
        currentInput = 'Error';
        resetNext = true;
      }
    }

    else if (button.classList.contains('clear')) {
      currentInput = '';
    }

    else if (button.classList.contains('delete')) {
      currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
  });
});

// Optional: Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.'].includes(e.key)) {
    currentInput += e.key;
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key === 'Enter') {
    try {
      if (currentInput && !isOperator(currentInput.slice(-1))) {
        currentInput = eval(currentInput).toString();
        resetNext = true;
      }
    } catch {
      currentInput = 'Error';
      resetNext = true;
    }
  } else if (e.key === 'Escape') {
    currentInput = '';
  }
  updateDisplay();
});
