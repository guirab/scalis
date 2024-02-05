import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, test, vitest } from "vitest";

import NewAccForm from "../../app/components/newAccForm";
import { create } from "../../app/actions";

vitest.mock("../app/actions", () => ({
  create: vitest.fn(),
}));

describe("NewAccForm", () => {
  afterEach(() => {
    cleanup();
  });
  test("snapshot", () => {
    const { container } = render(<NewAccForm />);
    expect(container).toMatchSnapshot();
  });

  test("submits the form and calls create function", async () => {
    render(<NewAccForm />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const checkingInput = screen.getByLabelText("Checking Balance");
    const savingsInput = screen.getByLabelText("Savings Balance");
    const createButton = screen.getByText("Create Account");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(checkingInput, { target: { value: "1000.00" } });
    fireEvent.change(savingsInput, { target: { value: "500.00" } });

    fireEvent.click(createButton);

    waitFor(() => {
      expect(create).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
        checking: 1000,
        savings: 500,
      });
    });
  });
});
