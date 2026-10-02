import type { Task, TaskRepository } from "../domain/TaskRepository";

const STORAGE_KEY = "multimodel-todo.tasks";

export class LocalStorageTaskRepository implements TaskRepository {
  constructor(private readonly storage: Storage) {}

  async getAll(): Promise<Task[]> {
    const storedTasks = this.storage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];

    return JSON.parse(storedTasks) as Task[];
  }

  async save(task: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((item) => item.id === task.id);
    if (index === -1) tasks.push(task);
    else tasks[index] = task;
    this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  async remove(id: string): Promise<void> {
    const tasks = await this.getAll();
    this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks.filter((task) => task.id !== id)));
  }
}
