const tasks = [];

const form = document.getElementById("taskForm");
const nameInput = document.getElementById("task-form__input-name");
const descriptionInput = document.getElementById(
  "task-form__input-description",
);
const prioritySelect = document.getElementById("task-form__select");
const list = document.getElementById("taskList");

const listHeader = document.getElementById("listHeader");
const info = document.createElement("p");
info.className = "task-list__info";

const totalCount = document.createElement("span");
const completedCount = document.createElement("span");
completedCount.className = "task-list__info_completed";

info.appendChild(totalCount);
info.appendChild(completedCount);
listHeader.appendChild(info);

function getPlural(count, forms) {
  const rule = new Intl.PluralRules("ru").select(count);
  return `${count} ${forms[rule]}`;
}

function infoCount() {
  let done = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      done++;
    }
  }

  const pluralText = getPlural(tasks.length, {
    one: "задача",
    few: "задачи",
    many: "задач",
    other: "задач",
  });
  totalCount.textContent = pluralText;

  if (done > 0) {
    completedCount.textContent = ` · ${done} выполнено`;
  } else {
    completedCount.textContent = "";
  }
}

function addTask(event) {
  let id = 0;
  event.preventDefault();

  if (nameInput.value.trim() === "") {
    alert("Введите название задачи");
    return;
  }

  if (tasks.length === 0) {
    id = 1;
  } else {
      
  }

  const task = {
    name: nameInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value,
    completed: false,
    id: id,
  };

  tasks.push(task);
  createCard(task);
  infoCount();
  form.reset();
}

function createCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  list.appendChild(card);

  const label = document.createElement("label");
  label.className = "task-card__label";
  card.appendChild(label);

  const checkbox = document.createElement("input");
  checkbox.className = "task-card__checkbox";
  checkbox.type = "checkbox";
  label.appendChild(checkbox);

  const content = document.createElement("div");
  content.className = "task-card__content";
  label.appendChild(content);

  const title = document.createElement("p");
  title.className = "task-card__title";
  title.textContent = task.name;
  content.appendChild(title);

  const description = document.createElement("p");
  description.className = "task-card__description";
  description.textContent = task.description;
  content.appendChild(description);

  const priority = document.createElement("div");
  priority.className = "task-card__priority";
  priority.textContent = task.priority;

  if (task.priority === "Низкий") {
    priority.classList.add("task-card__priority-low");
    priority.classList.add("task-card__priority");
  } else if (task.priority === "Средний") {
    priority.classList.add("task-card__priority-medium");
    priority.classList.add("task-card__priority");
  } else if (task.priority === "Высокий") {
    priority.classList.add("task-card__priority-high");
    priority.classList.add("task-card__priority");
  }

  card.appendChild(priority);

  const deleteButton = document.createElement("button");
  deleteButton.className = "task-card__button";
  deleteButton.textContent = "Удалить";
  card.appendChild(deleteButton);

  checkbox.addEventListener("change", function (event) {
    task.completed = event.target.checked;
    infoCount();
  });

  deleteButton.addEventListener("click", function () {
    tasks.splice(tasks.indexOf(task), 1);
    card.remove();
    infoCount();
  });
}

form.addEventListener("submit", addTask);
