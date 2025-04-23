// === Global Variables ===
let output = BigInt(0);
let isInteracting = false;
let setMode = true;
let lastToggledIndex = null;

const bitButtons = [];
const bitboard = document.getElementById('bitboard');
const outputField = document.getElementById('output');
const setBtn = document.getElementById('set-bit');
const resetBtn = document.getElementById('reset-bit');
const dropdown = document.getElementById('number-system');

outputField.textContent = output;

// === Helper Functions ===

// Convert output to selected number system
function format(output) {
    switch (dropdown.value) {
        case 'decimal':
            return output.toString(10);
        case 'hexadecimal':
            return '0x' + output.toString(16).toUpperCase();
        case 'octal':
            return '0o' + output.toString(8);
    }
}

// Toggle individual bit
function toggleBit(btn) {
    const index = 63 - parseInt(btn.dataset.index);
    if (lastToggledIndex === index) return;
    lastToggledIndex = index;

    const currentValue = btn.textContent;

    if ((setMode && currentValue === '0') || (!setMode && currentValue === '1')) {
        btn.textContent = currentValue === '0' ? '1' : '0';
        btn.classList.toggle('active');

        const bitValue = BigInt(1) << BigInt(index);
        output = currentValue === '0' ? output + bitValue : output - bitValue;
        outputField.textContent = format(output);
    }
}

// Set all bits to 1
function setAllBits() {
    bitButtons.forEach((btn) => {
        const index = 63 - parseInt(btn.dataset.index);
        if (btn.textContent === '0') {
            btn.textContent = '1';
            btn.classList.add('active');
            output += BigInt(1) << BigInt(index);
        }
    });
    outputField.textContent = format(output);
}

// Reset all bits to 0
function resetAllBits() {
    bitButtons.forEach((btn) => {
        const index = 63 - parseInt(btn.dataset.index);
        if (btn.textContent === '1') {
            btn.textContent = '0';
            btn.classList.remove('active');
            output -= BigInt(1) << BigInt(index);
        }
    });
    outputField.textContent = format(output);
}

// Create bitboard buttons
for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('bit-row');

    for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        const btn = document.createElement('button');
        btn.classList.add('bit-btn');
        btn.dataset.index = index;
        btn.textContent = '0';

        // Mouse Events
        btn.addEventListener('mousedown', (e) => {
            isInteracting = true;
            setMode = btn.textContent === '0';
            toggleBit(btn);
            e.preventDefault();
        });

        btn.addEventListener('mouseover', () => {
            if (isInteracting) {
                toggleBit(btn);
            }
        });

        // Touch Events
        btn.addEventListener('touchstart', (e) => {
            isInteracting = true;
            setMode = btn.textContent === '0';
            toggleBit(btn);
            e.preventDefault();
        }, { passive: false });

        // Prevent long-press context menu
        btn.addEventListener('contextmenu', (e) => e.preventDefault());

        bitButtons.push(btn);
        rowDiv.appendChild(btn);
    }

    bitboard.appendChild(rowDiv);
}

// === Global Event Listeners ===

// Handle drag on mobile across buttons
bitboard.addEventListener('touchmove', (e) => {
    if (!isInteracting) return;

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains('bit-btn')) {
        toggleBit(element);
    }

    e.preventDefault();
}, { passive: false });

// End interaction
document.addEventListener('mouseup', () => {
    isInteracting = false;
    lastToggledIndex = null;
});

document.addEventListener('touchend', () => {
    isInteracting = false;
    lastToggledIndex = null;
});

// Number system dropdown change
dropdown.addEventListener('change', () => {
    outputField.textContent = format(output);
});

// Set/Reset button clicks
setBtn.addEventListener('click', setAllBits);
resetBtn.addEventListener('click', resetAllBits);