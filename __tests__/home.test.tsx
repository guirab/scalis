import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Home from "../app/page";

describe("Home", () => {
  test("renders the title", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
