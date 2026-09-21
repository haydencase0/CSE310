import { describe, expect, it } from "vitest";
import { LocalStorageGreetingRepository } from "../../src/data/LocalStorageGreetingRepository";

describe("LocalStorageGreetingRepository", () => {
  it("saves a greeting record in local storage", async () => {
    const repository = new LocalStorageGreetingRepository(window.localStorage);

    await repository.save({ name: "Ada", message: "Hello Ada" });

    expect(window.localStorage.getItem("multimodel-hello.greetings")).toBe(
      '[{"name":"Ada","message":"Hello Ada"}]'
    );
  });
});
