"use client";
import { AccountsContext } from "@/store/context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Accounts() {
  const [showAccounts, setShowAccounts] = useState(false);
  const { accounts, setAccounts } = useContext(AccountsContext);

  useEffect(() => {
    if (!showAccounts) return;
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, [showAccounts]);

  return (
    <div
      className="flex items-center flex-col w-fit mt-4 group group-[data-show=true] bg-white bg-opacity-30 rounded-lg h-fit p-4"
      data-show={showAccounts}
    >
      <span
        className="text-2xl cursor-pointer w-fit"
        onClick={() => setShowAccounts(!showAccounts)}
      >
        Accounts
      </span>
      <div className="flex flex-col w-full group-data-[show=false]:hidden">
        {accounts.map((account: any) => (
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
