"use client";
import { useContext, useState } from "react";

import { InputCurrency } from "../inputCurrency";
import { AccountsContext } from "../../../store/context";
import { transferToSameAcc } from "../../actions";

export const TransferSameAcc = ({ setOpen }: ActionCardType) => {
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
      account[type as UpdateType["type"]] <
      parseFloat(amount.replace(/[^0-9.]/g, ""))
    ) {
      setError("Insufficient funds");
      return;
    }

    const payload: any = {
      action: "transfer",
      type: type as UpdateType["type"],
      amount: parseFloat(amount.replace(/[^0-9.]/g, "")),
      id: account.id,
    };

    await transferToSameAcc({
      action: "transfer",
      type: type as UpdateType["type"],
      amount: parseFloat(amount.replace(/[^0-9.]/g, "")),
      id: account.id,
      from: type as UpdateType["type"],
    })
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
    <div>
      <div>
        <label htmlFor="same">From: &nbsp;</label>
        <select
          name="same"
          id="same"
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
      <label htmlFor="same">Into: &nbsp;</label>
      <select
        name="same"
        id="same"
        value={
          optionsAccount.filter((option) => option.value !== type)[0].value
        }
        onChange={(e) => setType(e.target.value)}
        className="text-black pl-2 outline-none rounded-md w-full"
        disabled
      >
        {optionsAccount.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="currency-same">Amount: &nbsp;</label>
        <InputCurrency
          value={amount}
          setValue={setAmount}
          name="currency-same"
          id="currency-same"
          className="text-black pl-2 appearance-none outline-none rounded-md"
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        onClick={onClick}
      >
        Transfer
      </button>
    </div>
  );
};
