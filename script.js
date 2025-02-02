document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from Local Storage when the page loads
    loadTasks();
  
    // Function to load tasks from Local Storage
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach((task) => {
        addTask(task.text, task.completed, false); // 'false' indicates not to save again to Local Storage
      });
    }
  
    // Function to add a new task
    function addTask(taskText, completed = false, save = true) {
      if (taskText.trim() !== "") {
        // Create a new list item
        const newTask = document.createElement("li");
  
        // Add the task text
        newTask.textContent = taskText;
  
        // Add a checkbox to mark the task as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => {
          newTask.style.textDecoration = checkbox.checked ? "line-through" : "none";
          updateLocalStorage();
        });
  
        // Add a delete button to the task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("remove-btn");
        deleteButton.addEventListener("click", () => {
          taskList.removeChild(newTask);
          updateLocalStorage();
        });
  
        // Append the checkbox, task text, and delete button to the list item
        newTask.prepend(checkbox);
        newTask.appendChild(deleteButton);
  
        // Append the new task to the task list
        taskList.appendChild(newTask);
  
        // Style the task if it's completed
        if (completed) {
          newTask.style.textDecoration = "line-through";
        }
  
        // Save the task to Local Storage if required
        if (save) {
          updateLocalStorage();
        }
  
        // Clear the input field
        taskInput.value = "";
      } else {
        alert("Please enter a task!"); // Alert if the input is empty
      }
    }
  
    // Function to update Local Storage
    function updateLocalStorage() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach((taskElement) => {
        const taskText = taskElement.textContent.replace("Delete", "").trim();
        const isCompleted = taskElement.querySelector("input[type='checkbox']").checked;
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Add task when the "Add Task" button is clicked
    addButton.addEventListener("click", () => {
      addTask(taskInput.value);
    });
  
    // Add task when the "Enter" key is pressed in the input field
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask(taskInput.value);
      }
    });
  });