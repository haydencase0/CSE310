import type { Task, TaskRepository } from "../domain/TaskRepository";

export interface TaskServicePort {
  list(): Promise<Task[]>;
  create(title: string): Promise<Task>;
  toggleCompletion(id: string): Promise<Task>;
  delete(id: string): Promise<void>;
}

export class TaskService implements TaskServicePort {
  constructor(
    private readonly repository: TaskRepository,
    private readonly createId: () => string
  ) {}

  async list(): Promise<Task[]> {
    return this.repository.getAll();
  }

  async create(title: string): Promise<Task> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) throw new Error("Task title cannot be empty");

    const task: Task = { id: this.createId(), title: trimmedTitle, isComplete: false };
    await this.repository.save(task);
    return task;
  }

  async toggleCompletion(id: string): Promise<Task> {
    const task = await this.findTask(id);
    const updated = { ...task, isComplete: !task.isComplete };
    await this.repository.save(updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.findTask(id);
    await this.repository.remove(id);
  }

  private async findTask(id: string): Promise<Task> {
    const task = (await this.repository.getAll()).find((item) => item.id === id);
    if (!task) throw new Error("Task not found");
    return task;
  }
}
