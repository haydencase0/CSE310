import { describe, expect, it } from "vitest";
import { TaskService } from "../../src/services/TaskService";
import type { Task, TaskRepository } from "../../src/domain/TaskRepository";

class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async save(task: Task): Promise<void> {
    const index = this.tasks.findIndex((item) => item.id === task.id);
    if (index === -1) this.tasks.push(task);
    else this.tasks[index] = task;
  }

  async remove(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

describe("TaskService", () => {
  it("creates an incomplete task with a trimmed title", async () => {
    const service = new TaskService(new InMemoryTaskRepository(), () => "task-1");

    const task = await service.create("  Study for CSE310  ");

    expect(task).toEqual({ id: "task-1", title: "Study for CSE310", isComplete: false });
  });

  it("rejects a task with an empty title", async () => {
    const service = new TaskService(new InMemoryTaskRepository(), () => "task-1");

    await expect(service.create("   ")).rejects.toThrow("Task title cannot be empty");
  });

  it("toggles an existing task's completion state", async () => {
    const service = new TaskService(new InMemoryTaskRepository(), () => "task-1");
    const task = await service.create("Study for CSE310");

    const updated = await service.toggleCompletion(task.id);

    expect(updated.isComplete).toBe(true);
  });

  it("removes an existing task", async () => {
    const repository = new InMemoryTaskRepository();
    const service = new TaskService(repository, () => "task-1");
    const task = await service.create("Study for CSE310");

    await service.delete(task.id);

    await expect(service.list()).resolves.toEqual([]);
  });
});
