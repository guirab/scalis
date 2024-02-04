"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

import { login } from "../../actions";
import { AccountsContext } from "@/store/context";

export default function Login() {
  const [error, setError] = useState<string>();

  const { setAccount } = useContext(AccountsContext);

  const router = useRouter();

  async function onClick(e: FormData) {
    await login(e)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAccount(data[0] as AccountType);
          setError("");
          router.push("/account");
        }
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }

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
      <div className="bg-white bg-opacity-30 rounded-lg h-fit w-full p-4">
        <h1 className="text-5xl">Login</h1>
        <form action={onClick} className="flex flex-col w-full gap-y-4 mt-4">
          <label htmlFor="username">Username</label>
          <input
            autoComplete="off"
            type="text"
            name="username"
            id="username"
            required
            className="text-black"
          />
          <label htmlFor="password">Password</label>
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            required
            className="text-black"
          />

          {error && <span className="text-red-500">{error}</span>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
