document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Adds a new task to the list based on the input field's value.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim(); 

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return; // Exit the function if input is empty
        }

        // --- Task Creation and Removal Logic ---

        // 1. Create the <li> element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set task text

        // 2. Create the 'Remove' button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        
        // Use classList.add as specifically required by the check
        removeButton.classList.add('remove-btn'); 

        // 3. Assign the removal logic
        removeButton.onclick = function() {
            // Removes the parent <li> element from the <ul>
            taskList.removeChild(listItem);
        };

        // 4. Append button to list item, and list item to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // 5. Clear the task input field
        taskInput.value = ""; 
    }

    // --- Attach Event Listeners ---
    
    // Listener for the Add Task button click
    addButton.addEventListener('click', addTask);

    // Listener for the 'Enter' keypress on the input field
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter'
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function
        }
    });

});