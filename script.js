let output = BigInt(0);
outputField = document.getElementById('output');
outputField.textContent = output;

const bitButtons = []; // global array to store button references
const bitboard = document.getElementById('bitboard');

const setBtn = document.getElementById('set-bit');
const resetBtn = document.getElementById('reset-bit');

let dropdown = document.getElementById('number-system');


for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('bit-row');
    
    for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        const btn = document.createElement('button');
        btn.classList.add('bit-btn');
        btn.dataset.index = index;
        
        btn.textContent = '0';
        bitButtons.push(btn); // Store for later access
        rowDiv.appendChild(btn);
    }
    bitboard.appendChild(rowDiv);
}

let isMouseDown = false;
let setMode = true; 

bitButtons.forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        setMode = e.button === 0; 
        e.preventDefault(); 
        toggleBit(btn);
    });

    btn.addEventListener('mouseover', () => {
        if (isMouseDown) {
            toggleBit(btn);
        }
    });

    btn.addEventListener('contextmenu', (e) => e.preventDefault()); // Disable right-click menu
});

//function to handle bit toggling
function toggleBit(btn) {
    const index = 63 - parseInt(btn.dataset.index);
    if (setMode && btn.textContent === '0') {
        btn.textContent = '1';
        btn.classList.add('active');
        output += BigInt(2 ** index);
    } else if (!setMode && btn.textContent === '1') {
        btn.textContent = '0';
        btn.classList.remove('active');
        output -= BigInt(2 ** index);
    }
    outputField.textContent = format(output);t
}

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function format(output){
    if(dropdown.value === 'decimal')
        return output.toString(10);
    else if(dropdown.value === 'hexadecimal')
        return '0x' + output.toString(16).toUpperCase();
    else if(dropdown.value === 'octal')
        return '0o' + output.toString(8);
}

dropdown.addEventListener('change', () => {
    outputField.textContent = format(output);
});

// Set ALL bits to 1
setBtn.addEventListener('click', () => {
    bitButtons.forEach((btn, i) => {
        const index = 63 - parseInt(btn.dataset.index);
        if (btn.textContent === '0') {
            btn.textContent = '1';
            btn.classList.add('active');
            output += BigInt(2 ** index);
        }
    });
    outputField.textContent = format(output);
});

// Reset ALL bits to 0
resetBtn.addEventListener('click', () => {
    bitButtons.forEach((btn, i) => {
        const index = 63 - parseInt(btn.dataset.index);
        if (btn.textContent === '1') {
            btn.textContent = '0';
            btn.classList.remove('active');
            output -= BigInt(2 ** index);
        }
    });
    outputField.textContent = format(output);
});