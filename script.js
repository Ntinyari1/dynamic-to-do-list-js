// Ensure the script runs only after the entire HTML document is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the input field
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return;
        }

        // --- 4. Task Creation and Removal ---

        // Create the <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText; 

        // Create the 'Remove' button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign the onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the parent <li> element from the <ul> (taskList)
            taskList.removeChild(listItem);
        };

        // Append the button to the list item
        listItem.appendChild(removeButton);
        
        // Append the new task (li) to the task list (ul)
        taskList.appendChild(listItem);

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // 5. Attach Event Listeners

    // Listener for the Add Task button click
    addButton.addEventListener('click', addTask);

    // Listener for the 'Enter' keypress on the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});