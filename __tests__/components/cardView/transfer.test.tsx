import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { TransferView } from "../../../app/components/cardView/transfer";
import { afterEach, describe, expect, test, vitest } from "vitest";

global.fetch = vitest.fn();

describe("TransferView", () => {
  afterEach(() => {
    cleanup();
  });
  test("snapshot", () => {
    const { container } = render(<TransferView open setOpen={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test("displays the correct radio buttons", () => {
    render(<TransferView open setOpen={() => {}} />);
    const sameAccountRadio = screen.getByTestId("same-account");
    const otherAccountRadio = screen.getByTestId("other-account");
    expect(sameAccountRadio).not.toBeNull();
    expect(otherAccountRadio).not.toBeNull();
  });

  test("switches views when radio buttons are clicked", () => {
    render(<TransferView open={true} setOpen={() => {}} />);

    const transferSameAccElement = screen.getByTestId("transfer-same-acc");
    expect(transferSameAccElement).not.toBeNull();

    const otherAccountRadio = screen.getByTestId("other-account");
    fireEvent.click(otherAccountRadio);

    const transferOtherAccElement = screen.getByTestId("transfer-other-acc");
    expect(transferOtherAccElement).not.toBeNull();
  });
});
