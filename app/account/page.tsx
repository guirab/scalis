"use client";

import { AccountsContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function UserAccount() {
  const [amount, setAmount] = useState("");
  const { account } = useContext(AccountsContext);

  const router = useRouter();

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters from the input, including currency symbols
    console.log(value);
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));

    // Check if the numeric value is a valid number
    if (!isNaN(numericValue)) {
      // Format the numeric value as currency
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(numericValue);
    } else {
      // If the input is not a valid number, return the original input
      return value;
    }
  };

  const handleAmountChange = (e: any) => {
    // Update the state with the dynamically formatted amount
    setAmount(formatCurrency(e.target.value));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <div className="w-full pb-12">
        <span
          className="flex items-center text-2xl cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <IoMdArrowBack />
          Back
        </span>
      </div>
      <h1 className="text-5xl">{account.username}`s Account</h1>
      <div className="w-full flex-col flex gap-y-4 mt-4">
        <h2>Checking Balance: {account.checking}</h2>
        <h2>Savings Balance: {account.savings}</h2>
        <input
          name="currency"
          id="currency"
          required
          onChange={handleAmountChange}
          value={amount}
          className="text-black pl-2 appearance-none outline-none rounded-md w-full h-10 relative"
        />
      </div>
    </main>
  );
}
