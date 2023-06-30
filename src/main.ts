const $taskInput = document.getElementById('task-input') as HTMLInputElement;
const $searchInput = document.getElementById('search-input') as HTMLInputElement;
const $taskContainer = document.getElementById('task-container') as HTMLUListElement;

import TaskManager from './task';
import { Task } from './task';

const addButtonEvents = () => {
  const $deleteButtons = document.querySelectorAll('.delete-button');
  const $completeButtons = document.querySelectorAll('.complete-button');

  $deleteButtons.forEach(($button, index) => {
    $button.addEventListener('click', async () => {
      TaskManager.deleteTask(index + 1);
      const tasks = TaskManager.getAllTasks();
      await paintListUI(tasks);
      addButtonEvents();
    })
  })

  $completeButtons.forEach(($button, index) => {
    $button.addEventListener('click', async () => {
      TaskManager.completeTask(index + 1);
      const tasks = TaskManager.getAllTasks();
      await paintListUI(tasks);
      addButtonEvents();
    })
  })
}

const paintListUI = (tasks: Task[]) : any => {
  $taskContainer.innerHTML = '';

  try{
    tasks.forEach((task, index) => {
      const $taskItem = document.createElement('li');
      task.completed ? $taskItem.classList.add('completed') : null;
      $taskItem.innerHTML = `
        <span>${task.description}</span>
        <button class="delete-button">Delete</button>
        ${!task.completed ? `<button class="complete-button">Complete</button>` : ''}
      `
      $taskContainer.appendChild($taskItem);
  
      if(index == tasks.length - 1) {
        return Promise.resolve(1);
      }
    })
  } catch(err) {
    return Promise.reject(1);
  }
}

const handleEnterKeyPress = async (event: KeyboardEvent) => {
  event.preventDefault();
  const { key } = event;

  if(key === 'Enter') {
    const task = $taskInput.value;
    $taskInput.value = '';

    if(task) {
      TaskManager.addTask(task);

      const tasks = TaskManager.getAllTasks();
      await paintListUI(tasks);
      addButtonEvents();

      $searchInput.value = '';
    }
  }
}

const handleSearchInputChange = async () => {
  const value = $searchInput.value;

  const tasks = TaskManager.getAllTasks();
  const filteredTasks = tasks.filter(task => task.description.includes(value));
  await paintListUI(filteredTasks);
  addButtonEvents();
}

const init = async () => {
  const tasks = TaskManager.getAllTasks();
  await paintListUI(tasks);
  addButtonEvents()

  addEventListener('keyup', handleEnterKeyPress)
  $searchInput.addEventListener('keyup', handleSearchInputChange)
}

init()