document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("taskList").addEventListener("click", handleListClick);
document.getElementById("searchInput").addEventListener("input", searchTasks);

let tasks = [];
// Add task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    updateTaskList();
    taskInput.value = "";
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${index + 1}. <span class="task-text">${task}</span>
                        <button class="edit" title="Edit">&#9998;</button> 
                        <button class="delete" title="Delete">&#128465;</button>`;
    taskList.appendChild(li);
  });
}
//   delete task
function handleListClick(e) {
  const index = Array.from(document.querySelectorAll("#taskList li")).indexOf(
    e.target.parentElement
  );
  if (e.target.classList.contains("delete")) {
    tasks.splice(index, 1);
    updateTaskList();
  } else if (e.target.classList.contains("edit")) {
    const taskTextElement = e.target.previousElementSibling;
    const currentTask = taskTextElement.textContent;
    taskTextElement.innerHTML = `<input type="text" class="edit-input" value="${currentTask}" />`;
    // Update task

    const inputField = taskTextElement.querySelector(".edit-input");
    inputField.focus();
    inputField.addEventListener("blur", () => {
      const newTask = inputField.value.trim();
      if (newTask) {
        tasks[index] = newTask;
        updateTaskList();
      } else {
        taskTextElement.innerHTML = currentTask;
      }
    });
  }
}
function searchTasks() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const noTaskMessage = document.getElementById("noTaskMessage");
  const taskList = document.getElementById("taskList");
  let found = false;

  if (noTaskMessage) {
    noTaskMessage.remove();
  }

  taskList
    .querySelectorAll("li")
    .forEach((li) => (li.style.backgroundColor = ""));

  if (searchInput) {
    tasks.forEach((task, index) => {
      if (task.toLowerCase() === searchInput) {
        taskList.children[index].style.backgroundColor = "#d3ffd3";
        const message = document.createElement("div");
        message.style.color = "green";
        message.textContent = `Task found: "${task}" at position ${index + 1}.`;
        document.querySelector(".container").appendChild(message);
        found = true;
      }
    });
  }

  if (!found && searchInput) {
    const message = document.createElement("div");
    message.id = "noTaskMessage";
    message.style.color = "red";
    message.textContent = "There is no task called this.";
    document.querySelector(".container").appendChild(message);
  }
}
