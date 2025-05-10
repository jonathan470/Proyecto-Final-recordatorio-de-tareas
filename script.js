//MIGUEL
// Clase para representar cada nodo de la lista doblemente enlazada
class TaskNode {
  constructor(text, date, time, reminder) {
    this.text = text;
    this.date = date;
    this.time = time;
    this.reminder = reminder;
    this.next = null;
    this.prev = null;
  }
}

// Clase para manejar la lista doblemente enlazada de tareas
class TaskList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.loadTasks();
  }

  // Método para agregar una nueva tarea
  addTask(text, date, time, reminder) {
    const newTask = new TaskNode(text, date, time, reminder);

    if (!this.head) {
      this.head = newTask;
      this.tail = newTask;
    } else {
      this.tail.next = newTask;
      newTask.prev = this.tail;
      this.tail = newTask;
    }

    this.saveTasks();
    this.displayTasks();
  }

  // Método para eliminar una tarea
  removeTask(text) {
    let current = this.head;

    while (current) {
      if (current.text === text) {
        // Si el nodo es el primer elemento
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        // Si el nodo es el último elemento
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        break;
      }
      current = current.next;
    }

    this.saveTasks();
    this.displayTasks();
  }

  // Método para editar una tarea existente
  editTask(oldText, newText, newDate, newTime, newReminder) {
    let current = this.head;

    while (current) {
      if (current.text === oldText) {
        current.text = newText.trim() || current.text;
        current.date = newDate || current.date;
        current.time = newTime || current.time;
        current.reminder = newReminder || current.reminder;

        this.saveTasks(); // Guardar los cambios en `localStorage`
        this.displayTasks(); // Actualizar la lista visualmente
        return;
      }
      current = current.next;
    }
  }
  // GERSONN
  // Método para guardar las tareas en `localStorage`
  saveTasks() {
    let tasksArray = [];
    let current = this.head;

    while (current) {
      tasksArray.push({
        text: current.text,
        date: current.date,
        time: current.time,
        reminder: current.reminder,
      });
      current = current.next;
    }

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  // Método para cargar tareas guardadas al iniciar la aplicación
  loadTasks() {
    const tasksData = JSON.parse(localStorage.getItem("tasks"));
    if (tasksData) {
      tasksData.forEach((task) =>
        this.addTask(task.text, task.date, task.time, task.reminder)
      );
    }
  }

  // Método para mostrar las tareas en la interfaz
  displayTasks() {
    const taskContainer = document.querySelector(".task-list");
    taskContainer.innerHTML = "";

    let current = this.head;
    while (current) {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
        <p>${current.text} - ${current.date} - ${current.time} - ${current.reminder}</p>
        <button class="edit-btn" data-task="${current.text}">Editar</button>
        <button class="delete-btn" data-task="${current.text}">Eliminar</button>
      `;

      // Evento para eliminar tarea
      taskItem
        .querySelector(".delete-btn")
        .addEventListener("click", (event) => {
          const taskToDelete = event.target.getAttribute("data-task");
          this.removeTask(taskToDelete);
        });

      // Evento para editar tarea
      taskItem.querySelector(".edit-btn").addEventListener("click", (event) => {
        const taskToEdit = event.target.getAttribute("data-task");
        const newText = prompt("Editar tarea:", taskToEdit);
        const newDate = prompt("Nueva fecha:", current.date);
        const newTime = prompt("Nueva hora:", current.time);
        const newReminder = prompt(
          "Nuevo recordatorio (1 día antes, 5 días, todos los días):",
          current.reminder
        );

        if (newText) {
          this.editTask(taskToEdit, newText, newDate, newTime, newReminder);
        }
      });

      taskContainer.appendChild(taskItem);
      current = current.next;
    }
  }
}

// Inicializar lista de tareas
const taskList = new TaskList();

// Evento para agregar una tarea cuando se hace clic en el botón
document.querySelector(".button").addEventListener("click", () => {
  const text = document.querySelector(".input").value.trim();
  const date = document.querySelector(".date-picker").value;
  const time = document.querySelector(".time-picker").value;
  const reminder = document.querySelector(".reminder-select").value;

  if (text === "") {
    alert("Por favor, ingresa una tarea.");
    return;
  }

  taskList.addTask(text, date, time, reminder);
  document.querySelector(".input").value = ""; // Limpiar el campo después de agregar la tarea
});
