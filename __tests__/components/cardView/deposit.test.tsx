import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { DepositView } from "../../../app/components/cardView/deposit";
import { afterEach, describe, expect, test, vitest } from "vitest";
import { transferToSameAcc } from "../../../app/actions";

global.fetch = vitest.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

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
    const response = {
      id: 1,
      username: "test",
      password: "test",
      checking: 1,
      savings: 1,
    };

    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          account: { id: 1, username: "test" },
        }),
      };
    });

    render(<DepositView open setOpen={vitest.fn()} />);

    const input = screen.getByLabelText("Amount:") as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Deposit" }));

    (fetch as any).mockResolvedValue(createFetchResponse(response));

    const createData = await transferToSameAcc({
      action: "deposit",
      type: "checking",
      amount: 100,
      id: 1,
    });

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3000/api/account/${response.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "deposit",
          type: "checking",
          amount: 100,
        }),
      }
    );
    expect(createData).toStrictEqual(response);
  });
});
