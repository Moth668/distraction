// import Sortable from 'sortablejs';


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

// Function to add points based on task completion
function addPointsForTaskCompletion() {
    // Add 0.1 points for each completed task
    addPoints(0.1);
}

// Add event listener for clicking on tasks
function moveTaskToDone(taskElement) {
    // Remove from current list and move to 'Done' column
    document.getElementById('done-list').appendChild(taskElement);
    // Call the function to add points when a task is marked done
    addPointsForTaskCompletion();
}

// Initialize SortableJS for drag-and-drop functionality
document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list'); // Ensure the todo-list element is correctly referenced

    new Sortable(todoList, {
        animation: 150, // Smooth dragging animation
    });
});


// Kanban Board Logic - add tasks with checkboxes
document.getElementById('add-task-button').addEventListener('click', () => {
    const taskText = document.getElementById('todo-input').value;
    if (taskText) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) moveTaskToDone(li);
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        document.getElementById('todo-list').appendChild(li);
        document.getElementById('todo-input').value = ''; // Clear input
    }
});

// Event Listeners for Timer
document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('pause-button').addEventListener('click', () => clearInterval(timer));
document.getElementById('reset-button').addEventListener('click', resetTimer);

// Initialize Timer Display
updateTimerDisplay();
