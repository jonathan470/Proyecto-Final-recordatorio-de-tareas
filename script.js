//miguel
class TaskNode {
    constructor(task, date, time, reminder) {
      this.task = task;
      this.date = date;
      this.time = time;
      this.reminder = reminder;
      this.completed = false;
      this.prev = null;
      this.next = null;
    }
  }
  
  class TaskList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.currentEditingTask = null; 
    }
  
    addTask(task, date, time, reminder) {
      if (this.currentEditingTask) {
        this.editTask(
          this.currentEditingTask,
          task,
          date,
          time,
          reminder
        );
        this.currentEditingTask = null;
        document.querySelector(".button").textContent = "Agregar";
      } else {
        const newNode = new TaskNode(task, date, time, reminder);
        if (!this.head) {
          this.head = this.tail = newNode;
        } else {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
        }
      }
      this.clearInputs();
      this.displayTasks();
    }
  
    deleteTask(task) {
      let current = this.head;
      while (current) {
        if (current.task === task) {
          if (current.prev) current.prev.next = current.next;
          if (current.next) current.next.prev = current.prev;
          if (current === this.head) this.head = current.next;
          if (current === this.tail) this.tail = current.prev;
          break;
        }
        current = current.next;
      }
      this.displayTasks();
    }
  
    editTask(oldTask, newTask, newDate, newTime, newReminder) {
      let current = this.head;
      while (current) {
        if (current.task === oldTask) {
          current.task = newTask;
          current.date = newDate;
          current.time = newTime;
          current.reminder = newReminder;
          break;
        }
        current = current.next;
      }
      this.displayTasks();
    }
  }