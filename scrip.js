let output = 0;
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

bitButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const index = 63 - parseInt(btn.dataset.index);
        console.log("Clicked bit index:", index);
        
        // toggle button state (visual feedback)
        btn.classList.toggle('active');
        
        // toggle the text from 0 to 1
        if(btn.textContent === '0') output += 2 ** index;
        else output -= 2 ** index;
        outputField.textContent = format(output);
        btn.textContent = btn.textContent === '0' ? '1' : '0';
    });
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

setBtn.addEventListener('click', () => {
    bitButtons.forEach((btn) => {
        if(btn.textContent === '0')
            btn.click();
    });
});

resetBtn.addEventListener('click', () => {
    bitButtons.forEach((btn) => {
        if(btn.textContent === '1')
            btn.click();
    });
    output = 0;
    outputField.textContent = output;
});