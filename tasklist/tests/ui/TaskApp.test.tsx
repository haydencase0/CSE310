import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskApp } from "../../src/ui/TaskApp";
import type { TaskServicePort } from "../../src/services/TaskService";

describe("TaskApp", () => {
  it("shows an empty-state message when no tasks exist", async () => {
    const service: TaskServicePort = {
      list: vi.fn().mockResolvedValue([]),
      create: vi.fn(),
      toggleCompletion: vi.fn(),
      delete: vi.fn()
    };

    render(<TaskApp service={service} />);

    expect(await screen.findByText("No tasks yet. Add one to get started.")).toBeInTheDocument();
  });

  it("creates a task from the form", async () => {
    const service: TaskServicePort = {
      list: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockResolvedValue({ id: "task-1", title: "Study", isComplete: false }),
      toggleCompletion: vi.fn(),
      delete: vi.fn()
    };
    render(<TaskApp service={service} />);

    fireEvent.change(await screen.findByLabelText("New task"), { target: { value: "Study" } });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    await waitFor(() => expect(service.create).toHaveBeenCalledWith("Study"));
    expect(screen.getByText("Study")).toBeInTheDocument();
  });
});
