"use client";
import React, { FormEvent, useState } from "react";
import { create } from "../actions";
import { InputCurrency } from "./inputCurrency";

export default function NewAccForm() {
  const [newAcc, setNewAcc] = useState(false);
  const [checking, setChecking] = useState<string>("");
  const [savings, setSavings] = useState<string>("");

  async function onClick(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    const username = Object.fromEntries(formData).username.toString();
    const password = Object.fromEntries(formData).password.toString();

    const checking = parseFloat(
      Object.fromEntries(formData)
        .checking.toString()
        .replace(/[^0-9.]/g, "")
    );

    const savings = parseFloat(
      Object.fromEntries(formData)
        .savings.toString()
        .replace(/[^0-9.]/g, "")
    );

    await create({ username, password, checking, savings });
    setNewAcc(false);
  }

  return (
    <div
      className="flex flex-col items-center h-fit mt-4 group group-[data-newacc=true] bg-white bg-opacity-30 rounded-lg sm:w-fit w-full p-4"
      data-newacc={newAcc}
      data-testid="new-acc-form"
    >
      <span
        className="text-2xl cursor-pointer w-fit"
        onClick={() => setNewAcc(!newAcc)}
      >
        New Account
      </span>
      <form
        onSubmit={onClick}
        className="flex flex-col group-data-[newacc=false]:hidden"
      >
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          name="username"
          id="username"
          required
          className="text-black pl-2"
        />
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          required
          className="text-black pl-2"
        />
        <label htmlFor="checking">Checking Balance</label>
        <InputCurrency
          value={checking}
          setValue={setChecking}
          name="checking"
          id="checking"
        />
        <label htmlFor="savings">Savings Balance</label>
        <InputCurrency
          value={savings}
          setValue={setSavings}
          name="savings"
          id="savings"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
