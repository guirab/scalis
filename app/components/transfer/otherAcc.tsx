"use client";
import { useContext, useEffect, useState } from "react";

import { InputCurrency } from "../inputCurrency";
import { AccountsContext } from "../../../store/context";
import { getAll, transferToOtherAcc } from "../../actions";

export const TransferOtherAcc = ({ setOpen }: ActionCardType) => {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accountsOptions, setAccountsOptions] = useState<SelectType[]>([]);

  const { accounts, account, setAccount } = useContext(AccountsContext);

  async function loadAccounts() {
    let options: any = [];
    if (accounts && accounts.length !== 0) {
      options = accounts.map((account: AccountType) => ({
        value: account.username,
      }));
    } else {
      const data = await getAll();
      options = data?.map((account: AccountType) => ({
        value: account.username,
      }));
    }
    setAccountsOptions(options);
  }

  useEffect(() => {
    loadAccounts();
  }, [accounts]);

  async function onClick() {
    if (account.checking < parseFloat(amount.replace(/[^0-9.]/g, ""))) {
      setError("Insufficient funds");
      return;
    }
    await transferToOtherAcc({
      amount: parseFloat(amount.replace(/[^0-9.]/g, "")),
      to: to || accountsOptions[0]?.value,
      password,
      id: account.id,
    })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAccount(data as AccountType);
          setError("");
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error updating account:", error);
      });
  }

  return (
    <div data-testid="transfer-other-acc">
      <div>
        <label htmlFor="other">To: &nbsp;</label>
        <select
          name="other"
          id="other"
          value={to || accountsOptions[0]?.value}
          onChange={(e) => setTo(e.target.value)}
          className="text-black pl-2 outline-none rounded-md w-full"
        >
          {accountsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="other">Password: &nbsp;</label>
      <input
        autoComplete="off"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="text-black pl-2 outline-none rounded-md w-full"
      />
      <div>
        <label htmlFor="currency-other">Amount: &nbsp;</label>
        <InputCurrency
          value={amount}
          setValue={setAmount}
          name="currency-other"
          id="currency-other"
          className="text-black pl-2 appearance-none outline-none rounded-md"
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        onClick={onClick}
      >
        Transfer
      </button>
    </div>
  );
};
