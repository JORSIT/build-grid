// Timer variables
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let isBreak = false; // Checks if it's currently a break session
let cycles = 0; // Number of completed Pomodoro sessions
let hasStartedBefore = false; // Tracks if timer was started at least once

// Converts seconds to MM:SS format for display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Updates timer and cycles values in the UI
function render() {
    document.getElementById('timer').textContent = formatTime(timeLeft);
    document.getElementById('cycles').textContent = cycles;
}

// Starts the countdown if not already running
function startTimer() {
    if (isRunning) return;
    isRunning = true;

    // Update button text based on whether it's the first start or a resume
    if (hasStartedBefore) {
        document.getElementById('start').textContent = 'Continue';
    } else {
        document.getElementById('start').textContent = 'Start';
        hasStartedBefore = true;
    }

    // Run the countdown every second
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            render();
        } else {
            clearInterval(timer);
            isRunning = false;

            // Toggle between work and break sessions
            if (!isBreak) {
                timeLeft = 5 * 60; // Start 5-minute break
                isBreak = true;
                cycles++; // Count finished Pomodoro session
            } else {
                timeLeft = 25 * 60; // Start next 25-minute focus session
                isBreak = false;
            }

            render();
            startTimer(); // Auto-start the next session
        }
    }, 1000);
}

// Pauses the countdown
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('start').textContent = 'Continue';
}

// Resets timer and UI to initial state
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    hasStartedBefore = false;
    isBreak = false;
    timeLeft = 25 * 60;
    document.getElementById('start').textContent = 'Start';
    render();
}

// Setup event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('pause').addEventListener('click', pauseTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    render();
});
