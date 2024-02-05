import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { DepositView } from "../../../app/components/cardView/deposit";
import { afterEach, describe, expect, test, vitest } from "vitest";

describe("DepositView", () => {
  afterEach(() => {
    cleanup();
  });
  test("snapshot", () => {
    const { container } = render(<DepositView open setOpen={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test("updates the type state when the select value changes", () => {
    render(<DepositView open setOpen={() => {}} />);

    const select = screen.getByTestId("deposit-select") as HTMLSelectElement;

    fireEvent.change(select, {
      target: { value: "savings" },
    });
    expect(select.value).toBe("savings");

    fireEvent.change(select, {
      target: { value: "checking" },
    });
    expect(select.value).toBe("checking");
  });

  test("updates the amount state when the input value changes", () => {
    render(<DepositView open setOpen={() => {}} />);

    const input = screen.getByLabelText("Amount:") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "100" } });
    expect(input.value).toBe("1.00");
  });

  test("calls the onClick function when the button is clicked", async () => {
    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          accounts: [{ id: 1, username: "test" }],
          setAccounts: vitest.fn(),
        }),
      };
    });

    const setOpen = vitest.fn();
    render(<DepositView open setOpen={setOpen} />);

    const input = screen.getByLabelText("Amount:") as HTMLInputElement;

    const transferToSameAcc = vitest.fn().mockResolvedValue({});

    fireEvent.change(input, {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Deposit" }));

    await waitFor(() => {
      expect(transferToSameAcc).toHaveBeenCalledWith({
        action: "deposit",
        type: "checking",
        amount: 100,
        id: 1,
      });
    });

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
