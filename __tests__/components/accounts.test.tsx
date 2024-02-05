import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

import Accounts from "../../app/components/accounts";

describe("Accounts", () => {
  test("snapshot", () => {
    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          accounts: [{ id: 1, username: "test" }],
          setAccounts: vitest.fn(),
        }),
      };
    });
    const { container } = render(<Accounts />);
    expect(container).toMatchSnapshot();
  });

  test("intercept fetch accounts", async () => {
    const accounts = screen.getByText("Accounts");
    fireEvent.click(accounts);
    waitFor(() => {
      const fetchMock = vitest.spyOn(global, "fetch").mockResolvedValueOnce({
        json: vitest.fn().mockResolvedValueOnce([{ id: 1, username: "test" }]),
      } as any);
      expect(fetchMock).toBeCalledWith("/api/accounts");
    });
  });
});
