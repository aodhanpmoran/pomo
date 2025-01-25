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

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const toggleModeBtn = document.getElementById('toggle-mode');

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
            // Start
            startBtn.textContent = 'Pause';
            isRunning = true;
            timerId = setInterval(() => {
                seconds--;
                if (seconds < 0) {
                    clearInterval(timerId);
                    alert('Time is up!');
                    seconds = isWorkMode ? WORK_TIME : REST_TIME;
                    // Optionally restart the timer here
                }
                updateDisplay();
            }, 1000);
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
        updateDisplay();
    });
}

// Add event listener for the toggle button
if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', function() {
        isWorkMode = !isWorkMode; // Toggle the mode
        seconds = isWorkMode ? WORK_TIME : REST_TIME; // Set the timer based on the mode
        toggleModeBtn.textContent = isWorkMode ? 'Switch to Rest' : 'Switch to Work'; // Update button text
        updateDisplay(); // Update the display to reflect the new time
    });
}

// Initial display
updateDisplay();
console.log('Script initialization complete'); 

});