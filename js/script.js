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
