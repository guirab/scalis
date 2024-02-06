import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AccountsContext } from "../../../store/context";
import Login from "../../../app/account/login/page";
import { login } from "../../../app/actions";
import { useRouter } from "next/navigation";
import { afterEach, beforeAll, describe, expect, test, vitest } from "vitest";

global.fetch = vitest.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Login", () => {
  afterEach(() => {
    cleanup();
  });
  beforeAll(() => {
    vitest.mock("next/navigation", () => ({
      useRouter: () => ({
        back: vitest.fn(),
      }),
    }));
    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          account: {
            username: "testuser",
            checking: 1000,
            savings: 2000,
          },
          setAccount: vitest.fn(),
        }),
      };
    });
  });

  test("snapshot", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  test("renders login form correctly", () => {
    render(<Login />);
    expect(screen.getAllByText("Login")[0]).not.toBeNull();
    expect(screen.getByLabelText("Username")).not.toBeNull();
    expect(screen.getByLabelText("Password")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Login" })).not.toBeNull();
  });

  test("calls login function and redirects to account page on successful login", async () => {
    render(<Login />);
    const payload = {
      username: "testuser",
      password: "password",
    };
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    (fetch as any).mockResolvedValue(createFetchResponse({}));

    const loginData = await login(payload as any);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testuser",
        password: "password",
      }),
    });
    expect(loginData).toStrictEqual({});
  });
});
