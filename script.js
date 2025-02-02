document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      // Create a new list item
      const newTask = document.createElement("li");

      // Add the task text
      newTask.textContent = taskText;

      // Add a delete button to the task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("remove-btn");
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(newTask); // Remove the task when delete button is clicked
      });

      // Add a checkbox to mark the task as completed
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          newTask.style.textDecoration = "line-through"; // Strike through completed tasks
        } else {
          newTask.style.textDecoration = "none"; // Remove strike through if unchecked
        }
      });

      // Append the checkbox, task text, and delete button to the list item
      newTask.prepend(checkbox);
      newTask.appendChild(deleteButton);

      // Append the new task to the task list
      taskList.appendChild(newTask);

      // Clear the input field
      taskInput.value = "";
    } else {
      alert("Please enter a task!"); // Alert if the input is empty
    }
  }

  // Add task when the "Add Task" button is clicked
  addButton.addEventListener("click", addTask);

  // Add task when the "Enter" key is pressed in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
