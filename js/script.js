document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("taskList").addEventListener("click", handleListClick);
document.getElementById("searchInput").addEventListener("input", searchTasks);

let tasks = []; // Array to keep track of tasks

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText); // Add task to the array
    updateTaskList();
    taskInput.value = "";
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${index + 1}. <span class="task-text">${task}</span>
                        <button class="edit" title="Edit">&#9998;</button> 
                        <button class="delete" title="Delete">&#128465;</button>`;
    taskList.appendChild(li);
  });
}
function handleListClick(e) {
  const index = Array.from(document.querySelectorAll("#taskList li")).indexOf(
    e.target.parentElement
  );
  if (e.target.classList.contains("delete")) {
    tasks.splice(index, 1); // Remove task from the array
    updateTaskList();
  } else if (e.target.classList.contains("edit")) {
    const taskTextElement = e.target.previousElementSibling;
    const currentTask = taskTextElement.textContent; // Get the current task text
    taskTextElement.innerHTML = `<input type="text" class="edit-input" value="${currentTask}" />`;

    // Focus on the input field
    const inputField = taskTextElement.querySelector(".edit-input");
    inputField.focus();
    inputField.addEventListener("blur", () => {
      const newTask = inputField.value.trim();
      if (newTask) {
        tasks[index] = newTask; // Update task in the array
        updateTaskList();
      } else {
        // If input is empty, revert to original task
        taskTextElement.innerHTML = currentTask;
      }
    });
  }
}
