import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HelloUserForm } from "../../src/ui/HelloUserForm";
import type { HelloUserServicePort } from "../../src/services/HelloUserService";

describe("HelloUserForm", () => {
  it("shows the greeting returned by the business service", async () => {
    const service: HelloUserServicePort = {
      greet: vi.fn().mockResolvedValue("Hello Ada")
    };
    render(<HelloUserForm service={service} />);

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ada" } });
    fireEvent.click(screen.getByRole("button", { name: "Say hello" }));

    await waitFor(() => expect(service.greet).toHaveBeenCalledWith("Ada"));
    expect(screen.getByText("Hello Ada")).toBeInTheDocument();
  });
});
