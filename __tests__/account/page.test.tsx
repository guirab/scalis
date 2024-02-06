import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AccountsContext } from "../../store/context";
import UserAccount from "../../app/account/page";
import {
  Mock,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vitest,
} from "vitest";
import { useRouter } from "next/navigation";

describe("UserAccount", () => {
  afterEach(() => {
    cleanup();
  });
  beforeAll(() => {
    vitest.mock("next/navigation", () => ({
      useRouter: () => ({
        back: vitest.fn(),
      }),
    }));
    vitest.mock("react", async () => {
      return {
        ...(await vitest.importActual("react")),
        useContext: () => ({
          account: {
            username: "testuser",
            checking: 1000,
            savings: 2000,
          },
          setAccount: vitest.fn(),
        }),
      };
    });
  });
  test("snapshot", () => {
    const { container } = render(<UserAccount />);
    expect(container).toMatchSnapshot();
  });

  test("renders account information correctly", () => {
    const account: any = {
      username: "testuser",
      checking: 100000,
      savings: 200000,
    };

    render(
      <AccountsContext.Provider value={{ ...account }}>
        <UserAccount />
      </AccountsContext.Provider>
    );

    expect(screen.getByText("testuser's Account")).not.toBeNull();
    expect(screen.getByText("Checking Balance: $1,000.00")).not.toBeNull();
    expect(screen.getByText("Savings Balance: $2,000.00")).not.toBeNull();
  });
});
