"use client";
import React, { useEffect, useState } from "react";
import { create } from "../actions";
import { InputCurrency } from "./inputCurrency";

export default function NewAccForm() {
  const [newAcc, setNewAcc] = useState(false);
  const [checking, setChecking] = useState<string>("");
  const [savings, setSavings] = useState<string>("");

  async function onClick(e: FormData) {
    const username = Object.fromEntries(e).username.toString();
    const password = Object.fromEntries(e).password.toString();

    const checking = parseFloat(
      Object.fromEntries(e)
        .checking.toString()
        .replace(/[^0-9.]/g, "")
    );

    const savings = parseFloat(
      Object.fromEntries(e)
        .savings.toString()
        .replace(/[^0-9.]/g, "")
    );
    await create({ username, password, checking, savings }).then(() =>
      setNewAcc(false)
    );
  }

  return (
    <div
      className="flex flex-col items-center h-fit mt-4 group group-[data-newacc=true] bg-white bg-opacity-30 rounded-lg w-fit p-4"
      data-newacc={newAcc}
    >
      <span
        className="text-2xl cursor-pointer w-fit"
        onClick={() => setNewAcc(!newAcc)}
      >
        New Account
      </span>
      <form
        action={onClick}
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
