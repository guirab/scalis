import React, { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { AccountsProvider, AccountsContext } from "../../store/context";
import { afterEach, describe, expect, test, vitest } from "vitest";

describe("AccountsProvider", () => {
  afterEach(() => {
    cleanup();
  });
  test("renders children", () => {
    render(
      <AccountsProvider>
        <div>Child Component</div>
      </AccountsProvider>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).not.toBeNull();
  });

  test("provides account and accounts values to context", () => {
    const AccountsProviderTest = ({ children }: { children: ReactNode }) => {
      const { account, accounts } = React.useContext(AccountsContext);
      const setAccount = vitest.fn();
      const setAccounts = vitest.fn();
      expect(account).not.toBeNull();
      expect(accounts).not.toBeNull();

      return (
        <AccountsContext.Provider
          value={{
            account,
            setAccount,
            accounts,
            setAccounts,
          }}
        >
          {children}
        </AccountsContext.Provider>
      );
    };

    render(
      <AccountsProviderTest>
        <div>Child Component</div>
      </AccountsProviderTest>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).not.toBeNull();
  });

  test("updates account and accounts values in context", () => {
    const newAccount = { id: 2, username: "newTest" };
    const newAccounts = [{ id: 2, username: "newTest" }];

    const TestComponent = () => {
      const { account, accounts, setAccount, setAccounts } =
        React.useContext(AccountsContext);

      React.useEffect(() => {
        setAccount(newAccount as any);
        setAccounts(newAccounts as any);
      }, []);

      return (
        <div>
          <span data-testid="account-id">{account.id}</span>
          <span data-testid="account-username">{account.username}</span>
          <span data-testid="accounts-length">{accounts.length}</span>
        </div>
      );
    };

    render(
      <AccountsProvider>
        <TestComponent />
      </AccountsProvider>
    );

    const accountId = screen.getByTestId("account-id");
    const accountUsername = screen.getByTestId("account-username");
    const accountsLength = screen.getByTestId("accounts-length");

    expect(accountId.textContent).toBe("2");
    expect(accountUsername.textContent).toBe("newTest");
    expect(accountsLength.textContent).toBe("1");
  });
});
