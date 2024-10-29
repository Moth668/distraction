let timer;
let timeRemaining = 24 * 60; // 24 minutes in seconds
let points = 0.0;

// Timer Functions
function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            addPoints(0.4); // Add points for one 24-minute session
            resetTimer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer-display').innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function resetTimer() {
    clearInterval(timer);
    timeRemaining = 24 * 60; // Reset to 24 minutes
    updateTimerDisplay();
}

function addPoints(amount) {
    points += amount;
    document.getElementById('points-display').innerText = `Points: ${points.toFixed(1)}`;
}

// Kanban Board Logic
document.getElementById('add-task-button').addEventListener('click', () => {
    const taskText = document.getElementById('todo-input').value;
    if (taskText) {
        const li = document.createElement('li');
        li.innerText = taskText;
        document.getElementById('todo-list').appendChild(li);
        document.getElementById('todo-input').value = '';
    }
});

// Event Listeners for Timer
document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('pause-button').addEventListener('click', () => clearInterval(timer));
document.getElementById('reset-button').addEventListener('click', resetTimer);

// Initialize Timer Display
updateTimerDisplay();
