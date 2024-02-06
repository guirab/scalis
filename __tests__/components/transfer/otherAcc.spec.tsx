import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { TransferOtherAcc } from "../../../app/components/transfer/otherAcc";
import { AccountsContext } from "../../../store/context";
import { getAll, transferToOtherAcc } from "../../../app/actions";
import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";

global.fetch = vitest.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("TransferOtherAcc", () => {
  afterEach(() => {
    cleanup();
  });

  test("snapshot", () => {
    const { container } = render(<TransferOtherAcc open setOpen={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test("loads accounts on mount", async () => {
    render(<TransferOtherAcc open setOpen={() => {}} />);
    const accountsResponse = [{ id: 1, username: "test" }];

    (fetch as any).mockResolvedValue(createFetchResponse(accountsResponse));

    const fetchedAccounts = await getAll();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/accounts");
    expect(fetchedAccounts).toStrictEqual(accountsResponse);
  });

  // test("transfers funds to another account", async () => {
  //   const setOpen = vitest.fn();
  //   const setAccount = vitest.fn();
  //   const setAccounts = vitest.fn();
  //   const accounts: any = [
  //     {
  //       id: 1,
  //       checking: 200,
  //       savings: 300,
  //     },
  //   ];
  //   const account: any = {
  //     id: 1,
  //     checking: 200,
  //     savings: 300,
  //   };
  //   render(
  //     <AccountsContext.Provider
  //       value={{ account, setAccount, accounts, setAccounts }}
  //     >
  //       <TransferOtherAcc open setOpen={setOpen} />
  //     </AccountsContext.Provider>
  //   );

  //   fireEvent.change(screen.getByTestId("to-select"), {
  //     target: { value: "account2" },
  //   });
  //   fireEvent.change(screen.getByTestId("password-input"), {
  //     target: { value: "password" },
  //   });
  //   fireEvent.change(screen.getByTestId("currency-input"), {
  //     target: { value: "50" },
  //   });

  //   fireEvent.click(screen.getByText("Transfer"));

  //   (fetch as any).mockResolvedValue(
  //     createFetchResponse({
  //       id: 1,
  //       username: "test",
  //       checking: 50,
  //     })
  //   );

  //   const createData = await transferToOtherAcc({
  //     amount: 50,
  //     to: "account2",
  //     password: "password",
  //     id: 1,
  //   });

  //   expect(fetch).toHaveBeenCalledWith(
  //     `http://localhost:3000/api/account/transfer/1`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: 50,
  //         to: "account2",
  //         password: "password",
  //         id: 1,
  //       }),
  //     }
  //   );
  //   // expect(createData).toStrictEqual(transferData);
  //   // });
  // });

  test("displays error message when there are insufficient funds", () => {
    const setOpen = vitest.fn();
    render(<TransferOtherAcc open setOpen={setOpen} />);

    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          account: { id: 1, username: "test", checking: 10 },
        }),
      };
    });

    const fromSelect = screen.getByTestId("to-select");
    const amountInput = screen.getByTestId("currency-input");
    const transferButton = screen.getByRole("button");

    fireEvent.change(fromSelect, { target: { value: "checking" } });
    fireEvent.change(amountInput, { target: { value: "10000" } });
    fireEvent.click(transferButton);

    const errorMessage = screen.getByText("Insufficient funds");
    expect(errorMessage).not.toBeNull();
  });
});
