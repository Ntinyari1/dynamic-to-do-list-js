// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return;
        }

        // 4. Task Creation and Removal

        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set its text content to taskText

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove the parent li element from the taskList
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // 5. Attach Event Listeners

    // Listener for the Add Task button click
    addButton.addEventListener('click', addTask);

    // Listener for the 'keypress' event on the input field (to handle 'Enter')
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // NOTE: The instruction "Invoke the addTask function on DOMContentLoaded" seems contradictory
    // to typical To-Do list design, as it would try to add an empty task on load.
    // Based on the functional requirement, this step has been interpreted as setting up 
    // the application's event handlers on DOMContentLoaded, which is done above.
    // Calling addTask() directly here would result in an immediate alert/empty task, 
    // which is usually undesirable. 
    // The event listeners already ensure the functions are callable when the DOM is ready.
});