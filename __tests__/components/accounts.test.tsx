import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vitest } from "vitest";

import Accounts from "../../app/components/accounts";
import { getAll } from "../../app/actions";

global.fetch = vitest.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Accounts", () => {
  afterEach(() => {
    cleanup();
  });
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
    render(<Accounts />);
    const accountsResponse = [{ id: 1, username: "test" }];
    const accounts = screen.getByText("Accounts");
    fireEvent.click(accounts);

    (fetch as any).mockResolvedValue(createFetchResponse(accountsResponse));

    const fetchedAccounts = await getAll();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/accounts");
    expect(fetchedAccounts).toStrictEqual(accountsResponse);
  });
});
