import React from "react";
import { render, fireEvent, getByRole, cleanup } from "@testing-library/react";
import { InputCurrency } from "../../app/components/inputCurrency";
import { afterEach, describe, expect, it, vitest } from "vitest";

describe("InputCurrency", () => {
  afterEach(() => {
    cleanup();
  });

  it("snapshot", () => {
    const { container } = render(
      <InputCurrency
        value=""
        setValue={() => {}}
        name="currency"
        id="currency"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should update the value when input is changed", () => {
    const setValue = vitest.fn();
    const { getByTestId } = render(
      <InputCurrency
        value=""
        setValue={setValue}
        name="currency"
        id="currency"
      />
    );

    const input = getByTestId("currency-input");
    fireEvent.change(input, { target: { value: "12345" } });
    expect(setValue).toHaveBeenCalledWith("123.45");
  });
});
