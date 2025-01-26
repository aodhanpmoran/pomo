console.log('Script starting...');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

// Timer state
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds
let seconds = WORK_TIME;
let isRunning = false;
let isWorkMode = true;
let timerId = null;
let currentMoto = '';

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const modeToggle = document.getElementById('mode-toggle');
const modal = document.getElementById('motoModal');
const motoInput = document.getElementById('motoInput');
const submitMotoBtn = document.getElementById('submitMoto');
const timerTitle = document.querySelector('.timer-frame h1');
if (modeToggle) modeToggle.classList.add(isWorkMode ? 'work' : 'rest');

// Update display
function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    minutesDisplay.textContent = String(mins).padStart(2, '0');
    secondsDisplay.textContent = String(secs).padStart(2, '0');
}

console.log('Start button element:', startBtn);

if (startBtn) {
    console.log('Attaching event listener to Start button');
    startBtn.addEventListener('click', function() {
        console.log('Start clicked, isRunning:', isRunning);
        if (isRunning) {
            // Pause
            clearInterval(timerId);
            startBtn.textContent = 'Start';
            isRunning = false;
        } else {
            // Show modal before starting
            modal.style.display = 'flex';
        }
    });
} else {
    console.error('Start button not found');
}

// Reset button
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        console.log('Reset clicked');
        clearInterval(timerId);
        seconds = isWorkMode ? WORK_TIME : REST_TIME;
        isRunning = false;
        startBtn.textContent = 'Start';
        timerTitle.textContent = "Paula's Pomodoro";
        currentMoto = '';
        updateDisplay();
    });
}

// Add event listener for the mode toggle
if (modeToggle) {
    modeToggle.addEventListener('click', function() {
        isWorkMode = !isWorkMode;
        this.classList.toggle('work', isWorkMode);
        this.classList.toggle('rest', !isWorkMode);
        seconds = isWorkMode ? WORK_TIME : REST_TIME;
        updateDisplay();
    });
}

// Add modal submit handler
submitMotoBtn.addEventListener('click', function() {
    currentMoto = motoInput.value.trim();
    if (currentMoto) {
        modal.style.display = 'none';
        timerTitle.textContent = currentMoto;
        motoInput.value = '';
        
        // Start the timer
        startBtn.textContent = 'Pause';
        isRunning = true;
        timerId = setInterval(() => {
            seconds--;
            if (seconds < 0) {
                clearInterval(timerId);
                alert('Time is up!');
                seconds = isWorkMode ? WORK_TIME : REST_TIME;
                timerTitle.textContent = "Paula's Pomodoro";
                isRunning = false;
                startBtn.textContent = 'Start';
            }
            updateDisplay();
        }, 1000);
    }
});

// Initial display
updateDisplay();
console.log('Script initialization complete'); 

});