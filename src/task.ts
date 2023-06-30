export interface Task {
    id : number,
    description : string,
    completed : boolean
}

let tasks : Task[] = []

class TaskManager {
    addTask(description : string) {
        const task : Task = {
            id: tasks.length + 1,
            description: description,
            completed: false
        }
        tasks.push(task)
        this.storeTasks()
    }

    deleteTask(id : number) {
        const index = tasks.findIndex(task => task.id === id)
        tasks.splice(index, 1)
        this.storeTasks()
    }

    completeTask(id : number) {
        const index = tasks.findIndex(task => task.id === id)
        tasks[index].completed = true
        this.storeTasks()
    }

    getAllTasks() : Task[] {
      localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')!) : null
      return tasks
    }

    storeTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

export default new TaskManager();