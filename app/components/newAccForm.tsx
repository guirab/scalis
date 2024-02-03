"use client";
import { useState } from "react";
import { create } from "../actions";

export default function NewAccForm() {
  const [newAcc, setNewAcc] = useState(false);

  async function onClick(e: FormData) {
    await create(e).then(() => setNewAcc(false));
  }

  return (
    <div
      className="flex flex-col items-center w-full mt-4 group group-[data-newacc=true]"
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
        <input
          autoComplete="off"
          type="number"
          name="checking"
          id="checking"
          required
          className="text-black pl-2"
        />
        <label htmlFor="savings">Savings Balance</label>
        <input
          autoComplete="off"
          type="number"
          name="savings"
          id="savings"
          required
          className="text-black pl-2"
        />
        <button type="submit" className="bg-green-600 mt-4">
          Create Account
        </button>
      </form>
    </div>
  );
}
