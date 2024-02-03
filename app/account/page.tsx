"use client";

import { AccountsContext } from "@/store/context";
import { useContext } from "react";

// async function getData({ params: { id } }: { params: { id: string } }) {
//   const response = await fetch(`http:localhost:3000/api/account/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// }

export default function UserAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  // const data = await getData({ params: { id } });

  const { account } = useContext(AccountsContext);
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <h1 className="text-5xl">{account.username}`s Account</h1>
      <div className="w-full flex-col flex gap-y-4 mt-4">
        <h2>Checking Balance: {account.checking}</h2>
        <h2>Savings Balance: {account.savings}</h2>
      </div>
    </main>
  );
}
