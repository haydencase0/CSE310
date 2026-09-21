import { describe, expect, it } from "vitest";
import { LocalStorageTaskRepository } from "../../src/data/LocalStorageTaskRepository";

describe("LocalStorageTaskRepository", () => {
  it("saves and retrieves a task", async () => {
    const repository = new LocalStorageTaskRepository(window.localStorage);

    await repository.save({ id: "task-1", title: "Study", isComplete: false });

    await expect(repository.getAll()).resolves.toEqual([
      { id: "task-1", title: "Study", isComplete: false }
    ]);
  });

  it("updates a task with the same id", async () => {
    const repository = new LocalStorageTaskRepository(window.localStorage);
    await repository.save({ id: "task-1", title: "Study", isComplete: false });

    await repository.save({ id: "task-1", title: "Study", isComplete: true });

    await expect(repository.getAll()).resolves.toEqual([
      { id: "task-1", title: "Study", isComplete: true }
    ]);
  });
});
