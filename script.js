// Function to display the current date
function displayDate() {
    const dateElement = document.getElementById("currentDate");
    const today = new Date(); // Get the current date

    // Format the date (e.g., "October 22, 2024")
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    // Set the formatted date in the placeholder
    dateElement.textContent = formattedDate;
}

// Call the function to display the date
displayDate();

let addButton = document.getElementById("addTask");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let note = document.querySelector(".note");
let overflow = document.querySelector(".list-for-overflow");

// Load tasks when the page loads
loadTasks();

// Function to add a task
function addTask() {
    let task = taskInput.value.trim(); // Trim whitespace from input

    // Check if the input is empty
    if (task === "") {
        note.style.visibility = "visible"; // Show note if input is empty
        
        return; // Exit the function if no task is entered
    } else {
        note.style.visibility = "hidden"; // Hide note if input is not empty
        overflow.style.visibility = "visible"; // Show overflow if input is not empty
    }

    // Create and add the task to the list
    createTaskElement(task);
    taskInput.value = ""; // Clear input field
    saveTasks(); // Save tasks to localStorage
}

// Add event listener for the Add button
addButton.addEventListener("click", addTask);

// Create task list item element with a delete button and checkbox
function createTaskElement(task) {
    let listItem = document.createElement("li");
    
    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    // Set the text content of the task
    listItem.textContent = task;

    // Add checkbox change event listener to toggle text color
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            listItem.style.textDecoration = "line-through"; // Strike-through text
            listItem.style.color = "grey"; // Change color to grey
        } else {
            listItem.style.textDecoration = "none"; // Remove strike-through
            listItem.style.color = "black"; // Reset color to black
        }
    });

    // Create point image
    // let point = document.createElement("img");
    // point.src = "/point.png"; // Adjust path as needed
    // point.className = "point";

    // Create delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.className = "deleteTask";
    
    // Append checkbox, point, and delete button to the task item
    listItem.prepend(checkbox); // Insert checkbox at the beginning
    // listItem.appendChild(point);
    listItem.appendChild(deleteButton);

    // Delete task when the delete button is clicked
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks(); // Save updated tasks after deletion
        checkNoteVisibility(); // Check visibility of the note after deletion
    });

    taskList.appendChild(listItem);
}

// Save tasks to localStorage
function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.firstChild.textContent.trim()); // Only save task text
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage and display them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
    checkNoteVisibility(); // Check visibility of the note on load
}

// Function to check visibility of the note based on the task list
function checkNoteVisibility() {
    if (taskList.children.length === 0) {
        note.style.visibility = "visible"; // Show note if no tasks
        overflow.style.visibility = "hidden"; // Hide overflow if no tasks
    } else {
        note.style.visibility = "hidden"; // Hide note if there are tasks
        overflow.style.visibility = "visible"; // Show overflow if there are tasks
    }
}
