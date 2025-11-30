document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Core Functions ---

    /**
     * Updates the Local Storage with the current state of tasks in the DOM.
     * It extracts text content from all <li> elements in the task list.
     */
    function saveTasksToLocalStorage() {
        const tasks = [];
        // Get all <li> elements inside the task list
        taskList.querySelectorAll('li').forEach(listItem => {
            // Get the text content of the list item (excluding the 'Remove' button text)
            // We use .firstChild.textContent to ensure we only capture the task text.
            // If the element structure changes, this might need adjustment, but it works
            // with our current DOM manipulation where text is the first child.
            const taskText = listItem.firstChild.textContent.trim();
            if (taskText) {
                tasks.push(taskText);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    /**
     * Creates and appends a task element to the DOM.
     * @param {string} taskText - The text content of the new task.
     * @param {boolean} save - If true, the task is saved to Local Storage immediately.
     */
    function addTask(taskText, save = true) {
        
        // --- Task Creation ---

        // Create the <li> element for the task
        const listItem = document.createElement('li');
        // Set the text content (text node is created as the first child)
        listItem.textContent = taskText; 

        // Create the 'Remove' button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign the removal logic
        removeButton.onclick = function() {
            // Removes the parent <li> element from the <ul>
            taskList.removeChild(listItem);
            
            // Task Removal: Update Local Storage after removal
            saveTasksToLocalStorage();
        };

        // Append the button to the list item
        listItem.appendChild(removeButton);
        
        // Append the new task (li) to the task list (ul)
        taskList.appendChild(listItem);

        // --- Local Storage Update ---

        if (save) {
            // Update Local Storage only when a task is manually added by the user
            saveTasksToLocalStorage();
            // Clear the input field for a new entry
            taskInput.value = ""; 
        }
    }

    /**
     * Loads tasks from Local Storage and populates the DOM.
     */
    function loadTasks() {
        // Retrieve and parse the stored tasks, defaulting to an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Iterate over the stored tasks and add each one to the DOM
        storedTasks.forEach(taskText => {
            // 'false' is passed to prevent saving the task back to Local Storage during load
            addTask(taskText, false); 
        });
    }

    // --- Initialization ---

    // 1. Load existing tasks from Local Storage when the page loads
    loadTasks(); 

    // 2. Attach Event Listeners for user input
    
    // Listener for the Add Task button click
    addButton.addEventListener('click', function() {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Please enter a task before adding.");
        } else {
            // 'true' is the default for 'save', so we just pass the text
            addTask(text); 
        }
    });

    // Listener for the 'Enter' keypress on the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task before adding.");
            } else {
                addTask(text);
            }
        }
    });

});