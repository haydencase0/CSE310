"use client";

import { useEffect, useState } from "react";
import { LocalStorageTaskRepository } from "../data/LocalStorageTaskRepository";
import { TaskService } from "../services/TaskService";
import { TaskApp } from "./TaskApp";

export function TodoApplication() {
  const [service, setService] = useState<TaskService | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setService(new TaskService(new LocalStorageTaskRepository(window.localStorage), () => crypto.randomUUID()));
    });
  }, []);

  return service ? <TaskApp service={service} /> : <main className="task-app"><p>Loading tasks…</p></main>;
}
