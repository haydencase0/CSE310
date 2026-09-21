"use client";

import { useEffect, useState } from "react";
import { LocalStorageGreetingRepository } from "../data/LocalStorageGreetingRepository";
import { LocalStorageTaskRepository } from "../data/LocalStorageTaskRepository";
import { HelloUserService } from "../services/HelloUserService";
import { TaskService } from "../services/TaskService";
import { HelloUserForm } from "./HelloUserForm";
import { TaskApp } from "./TaskApp";

type ApplicationServices = {
  greeting: HelloUserService;
  task: TaskService;
};

export function TodoApplication() {
  const [services, setServices] = useState<ApplicationServices | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setServices({
        greeting: new HelloUserService(new LocalStorageGreetingRepository(window.localStorage)),
        task: new TaskService(new LocalStorageTaskRepository(window.localStorage), () => crypto.randomUUID())
      });
    });
  }, []);

  return services ? (
    <>
      <HelloUserForm service={services.greeting} />
      <TaskApp service={services.task} />
    </>
  ) : <main className="task-app"><p>Loading tasks…</p></main>;
}
