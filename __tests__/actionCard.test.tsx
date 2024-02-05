import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, test, vitest } from "vitest";

import { ActionCard } from "../app/components/actionCard";
import { DepositView } from "../app/components/cardView/deposit";
import { WithdrawView } from "../app/components/cardView/withdraw";
import { TransferView } from "../app/components/cardView/transfer";

describe("ActionCard", () => {
  afterEach(() => {
    cleanup();
  });
  test("snapshot", () => {
    const { container } = render(
      <ActionCard action="deposit" open={true} setOpen={vitest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  test("renders DepositView when action is 'deposit'", () => {
    render(<ActionCard action="deposit" open={true} setOpen={vitest.fn()} />);
    expect(screen.getByRole("button").textContent).toBe("deposit");
  });

  test("renders WithdrawView when action is 'withdraw'", () => {
    render(<ActionCard action="withdraw" open={true} setOpen={vitest.fn()} />);
    expect(screen.getByRole("button").textContent).toBe("withdraw");
  });

  test("renders TransferView when action is 'transfer'", () => {
    render(<ActionCard action="transfer" open={true} setOpen={vitest.fn()} />);
    expect(screen.getByRole("button").textContent).toBe("transfer");
  });

  test("does not render any view when open is false", () => {
    render(<ActionCard action="deposit" open={false} setOpen={vitest.fn()} />);
    expect(screen.queryByTestId("deposit-view")).toBeNull();
    expect(screen.queryByTestId("withdraw-view")).toBeNull();
    expect(screen.queryByTestId("transfer-view")).toBeNull();
  });
});
