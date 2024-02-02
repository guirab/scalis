"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showAccounts, setShowAccounts] = useState(false);

  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  return (
    <div
      className="flex items-center flex-col w-full mt-4 group group-[data-show=true]"
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
            <Link href={`/account/${account.id}`}>View Account</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
