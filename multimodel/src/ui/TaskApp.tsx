"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Task } from "../domain/TaskRepository";
import type { TaskServicePort } from "../services/TaskService";

type TaskAppProps = { service: TaskServicePort };

export function TaskApp({ service }: TaskAppProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    service.list()
      .then(setTasks)
      .catch(() => setError("Tasks could not be loaded."))
      .finally(() => setIsLoading(false));
  }, [service]);

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      const task = await service.create(title);
      setTasks((current) => [...current, task]);
      setTitle("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Task could not be created.");
    }
  }

  async function toggleTask(id: string) {
    setError(null);
    try {
      const updated = await service.toggleCompletion(id);
      setTasks((current) => current.map((task) => task.id === id ? updated : task));
    } catch {
      setError("Task could not be updated.");
    }
  }

  async function deleteTask(id: string) {
    setError(null);
    try {
      await service.delete(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch {
      setError("Task could not be deleted.");
    }
  }

  return (
    <main className="task-app">
      <h1>My tasks</h1>
      <form onSubmit={addTask}>
        <label htmlFor="new-task">New task</label>
        <div className="task-form-row">
          <input id="new-task" value={title} onChange={(event) => setTitle(event.target.value)} />
          <button type="submit">Add task</button>
        </div>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? <p>Loading tasks…</p> : tasks.length === 0 ? (
        <p>No tasks yet. Add one to get started.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.isComplete ? "complete" : ""}>{task.title}</span>
              </label>
              <button type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
