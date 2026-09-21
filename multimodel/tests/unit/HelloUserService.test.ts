import { describe, expect, it } from "vitest";
import { HelloUserService } from "../../src/services/HelloUserService";
import type { Greeting, GreetingRepository } from "../../src/domain/GreetingRepository";

class InMemoryGreetingRepository implements GreetingRepository {
  readonly greetings: Greeting[] = [];

  async save(greeting: Greeting): Promise<void> {
    this.greetings.push(greeting);
  }
}

describe("HelloUserService", () => {
  it("creates and saves a greeting from a trimmed name", async () => {
    const repository = new InMemoryGreetingRepository();
    const service = new HelloUserService(repository);

    const response = await service.greet("  Ada  ");

    expect(response).toBe("Hello Ada");
    expect(repository.greetings).toEqual([{ name: "Ada", message: "Hello Ada" }]);
  });

  it("rejects an empty name", async () => {
    const service = new HelloUserService(new InMemoryGreetingRepository());

    await expect(service.greet("   ")).rejects.toThrow("Name cannot be empty");
  });
});
