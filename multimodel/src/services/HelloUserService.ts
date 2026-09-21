import type { GreetingRepository } from "../domain/GreetingRepository";

export interface HelloUserServicePort {
  greet(name: string): Promise<string>;
}

export class HelloUserService implements HelloUserServicePort {
  constructor(private readonly repository: GreetingRepository) {}

  async greet(name: string): Promise<string> {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error("Name cannot be empty");

    const message = `Hello ${trimmedName}`;
    await this.repository.save({ name: trimmedName, message });
    return message;
  }
}
