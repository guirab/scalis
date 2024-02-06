import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vitest } from "vitest";
import { TransferSameAcc } from "../../../app/components/transfer/sameAcc";
import { transferToSameAcc } from "../../../app/actions";
import { AccountsContext } from "../../../store/context";

global.fetch = vitest.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("TransferSameAcc", () => {
  afterEach(() => {
    cleanup();
  });
  test("snapshot", () => {
    const { container } = render(<TransferSameAcc open setOpen={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test("renders transfer form correctly", () => {
    const setOpen = vitest.fn();
    render(<TransferSameAcc open setOpen={setOpen} />);

    const sameAcc = screen.getAllByTestId("transfer-same-acc");
    expect(sameAcc).not.toBeNull();
  });

  test("displays error message when there are insufficient funds", () => {
    const setOpen = vitest.fn();
    render(<TransferSameAcc open setOpen={setOpen} />);

    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          account: { id: 1, username: "test", checking: 10 },
        }),
      };
    });

    const fromSelect = screen.getByTestId("from-select");
    const amountInput = screen.getByTestId("currency-input");
    const transferButton = screen.getByRole("button");

    fireEvent.change(fromSelect, { target: { value: "checking" } });
    fireEvent.change(amountInput, { target: { value: "10000" } });
    fireEvent.click(transferButton);

    const errorMessage = screen.getByText("Insufficient funds");
    expect(errorMessage).not.toBeNull();
  });

  test("transfers funds successfully", async () => {
    const setOpen = vitest.fn();
    const setAccount = vitest.fn();
    const setAccounts = vitest.fn();
    const accounts: any = [
      {
        id: 1,
        checking: 200,
        savings: 300,
      },
    ];
    const account: any = {
      id: 1,
      checking: 200,
      savings: 300,
    };
    const transferData = {
      id: 1,
      type: "checking",
      amount: 100,
      from: "checking",
    };

    render(
      <AccountsContext.Provider
        value={{ account, setAccount, accounts, setAccounts }}
      >
        <TransferSameAcc open setOpen={setOpen} />
      </AccountsContext.Provider>
    );

    const fromSelect = screen.getByTestId("from-select");
    const amountInput = screen.getByTestId("currency-input");
    const transferButton = screen.getByRole("button");

    fireEvent.change(fromSelect, { target: { value: "checking" } });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.click(transferButton);

    (fetch as any).mockResolvedValue(createFetchResponse(transferData));

    const createData = await transferToSameAcc({
      action: "deposit",
      type: "checking",
      amount: 100,
      id: 1,
    });

    expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/account/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deposit",
        type: "checking",
        amount: 100,
      }),
    });
    expect(createData).toStrictEqual(transferData);
  });
});
