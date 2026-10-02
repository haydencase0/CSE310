export type Task = {
  id: string;
  title: string;
  isComplete: boolean;
};

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  remove(id: string): Promise<void>;
}
