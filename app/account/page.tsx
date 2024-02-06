"use client";

import { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import { AccountsContext } from "../../store/context";
import { ActionCard } from "../components/actionCard";

export default function UserAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState({
    deposit: false,
    withdraw: false,
    transfer: false,
  });

  const { account, setAccount } = useContext(AccountsContext);

  const router = useRouter();

  const formatUSDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleOpen = (action: string) => {
    setOpen((prev: any) => ({
      deposit: action === "deposit" ? !prev.deposit : false,
      withdraw: action === "withdraw" ? !prev.withdraw : false,
      transfer: action === "transfer" ? !prev.transfer : false,
    }));
  };
  useEffect(() => {
    const storedAccount = localStorage.getItem("accounts");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(account).length === 0) return;
    localStorage.setItem("accounts", JSON.stringify(account));
  }, [account]);

  return (
    <main className="flex min-h-screen flex-col items-center relative p-12 sm:p-24 justify-center sm:justify-start">
      <div
        data-show={isLoading}
        className="data-[show=false]:hidden flex absolute inset-0 bg-black w-full h-full z-20 justify-center items-start text-6xl p-24"
      >
        Loading...
      </div>
      <div className="w-full pb-12">
        <span
          className="flex items-center text-2xl cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <IoMdArrowBack />
          Back
        </span>
      </div>

      <h1 className="text-5xl">{account.username}&apos;s Account</h1>
      <div className="w-full flex flex-col mt-4 justify-start gap-y-4">
        <h2 className="text-2xl bg-blue-800 p-4 rounded-lg">
          Checking Balance:&nbsp;
          {formatUSDollar.format(account.checking)}
        </h2>
        <h2 className="text-2xl bg-blue-800 p-4 rounded-lg">
          Savings Balance:&nbsp;
          {formatUSDollar.format(account.savings)}
        </h2>
      </div>
      <h2 className="text-2xl mt-20 mb-12">What would you like to do?</h2>
      <div className="w-full justify-between flex flex-col sm:flex-row gap-y-4">
        <div className="flex flex-col bg-gray-500 p-4 rounded-md h-fit">
          <h2
            className="text-2xl cursor-pointer w-fit"
            onClick={() => handleOpen("deposit")}
          >
            Deposit
          </h2>
          <ActionCard
            action="deposit"
            open={open.deposit}
            setOpen={() => handleOpen("deposit")}
          />
        </div>
        <div className="flex flex-col bg-gray-500 p-4 rounded-md h-fit">
          <h2
            className="text-2xl cursor-pointer w-fit"
            onClick={() => handleOpen("withdraw")}
          >
            Withdraw
          </h2>
          <ActionCard
            action="withdraw"
            open={open.withdraw}
            setOpen={() => handleOpen("withdraw")}
          />
        </div>
        <div className="flex flex-col bg-gray-500 p-4 rounded-md h-fit">
          <h2
            className="text-2xl cursor-pointer w-fit"
            onClick={() => handleOpen("transfer")}
          >
            Transfer
          </h2>
          <ActionCard
            action="transfer"
            open={open.transfer}
            setOpen={() => handleOpen("transfer")}
          />
        </div>
      </div>
    </main>
  );
}
