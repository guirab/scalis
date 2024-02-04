"use client";
import { useContext, useState } from "react";

import { InputCurrency } from "./inputCurrency";
import { AccountsContext } from "@/store/context";
import { update } from "../actions";

export const ActionCard: React.FC<React.HTMLProps<any> & ActionCardType> = ({
  action,
  open,
  setOpen,
  ...props
}) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("checking");
  const [error, setError] = useState("");

  const { account, setAccount } = useContext(AccountsContext);

  const optionsAccount = [
    {
      label: "Checking",
      value: "checking",
    },
    {
      label: "Savings",
      value: "savings",
    },
  ];

  async function onClick() {
    if (
      action !== "deposit" &&
      account[type as UpdateType["type"]] <
        parseFloat(amount.replace(/[^0-9.]/g, ""))
    ) {
      setError("Insufficient funds");
      return;
    }

    const payload: any = {
      action,
      type: type as UpdateType["type"],
      amount: parseFloat(amount.replace(/[^0-9.]/g, "")),
      id: account.id,
    };

    if (action === "transfer") {
      payload["from"] = type;
    }

    await update(payload)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAccount(data as AccountType);
          setError("");
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error updating account:", error);
      });
  }

  return (
    <>
      {open && (
        <div className="block w-full mt-4 space-y-4" {...props}>
          {action === "transfer" && (
            <div>
              <label htmlFor={`${action}`}>From: &nbsp;</label>
              <select
                name={`${action}`}
                id={`${action}`}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="text-black pl-2 outline-none rounded-md w-full"
              >
                {optionsAccount.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor={`${action}`}>Into: &nbsp;</label>
            <select
              name={`${action}`}
              id={`${action}`}
              value={
                action === "transfer"
                  ? optionsAccount.filter((option) => option.value !== type)[0]
                      .value
                  : type
              }
              onChange={(e) => setType(e.target.value)}
              className="text-black pl-2 outline-none rounded-md w-full"
              disabled={action === "transfer"}
            >
              {optionsAccount.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="currency">Amount: &nbsp;</label>
            <InputCurrency
              value={amount}
              setValue={setAmount}
              name="currency"
              id="currency"
              className="text-black pl-2 appearance-none outline-none rounded-md"
            />
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <button
            className="capitalize bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
            onClick={onClick}
          >
            {action}
          </button>
        </div>
      )}
    </>
  );
};
