"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { AccountsContext } from "../../store/context";
import { getAll } from "../actions";

export default function Accounts() {
  const [showAccounts, setShowAccounts] = useState(false);
  const [error, setError] = useState("");

  const { accounts, setAccounts } = useContext(AccountsContext);

  async function fetchAccounts() {
    await getAll()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAccounts(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }

  useEffect(() => {
    if (!showAccounts) return;
    fetchAccounts();
  }, [showAccounts]);

  return (
    <div
      className="flex items-center flex-col sm:w-fit w-full mt-4 group group-[data-show=true] bg-white bg-opacity-30 rounded-lg h-fit p-4"
      data-show={showAccounts}
      data-testid="accounts"
    >
      <span
        className="text-2xl cursor-pointer w-fit"
        onClick={() => setShowAccounts(!showAccounts)}
      >
        Accounts
      </span>
      <div className="flex flex-col w-full group-data-[show=false]:hidden">
        {error && <span className="text-red-500">{error}</span>}
        {accounts &&
          accounts.map((account: any) => (
            <div
              key={account.id}
              className="flex w-full mt-4 gap-x-4 justify-between"
            >
              <span>Username: {account.username}</span>
              <Link href="/account/login">View Account</Link>
            </div>
          ))}
      </div>
    </div>
  );
}
