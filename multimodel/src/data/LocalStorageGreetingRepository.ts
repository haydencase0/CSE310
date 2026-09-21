import type { Greeting, GreetingRepository } from "../domain/GreetingRepository";

const STORAGE_KEY = "multimodel-hello.greetings";

export class LocalStorageGreetingRepository implements GreetingRepository {
  constructor(private readonly storage: Storage) {}

  async save(greeting: Greeting): Promise<void> {
    const greetings = this.getAll();
    greetings.push(greeting);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(greetings));
  }

  private getAll(): Greeting[] {
    const savedGreetings = this.storage.getItem(STORAGE_KEY);
    return savedGreetings ? JSON.parse(savedGreetings) as Greeting[] : [];
  }
}
