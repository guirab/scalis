"use client";

import React, { ReactNode, createContext, useState } from "react";

export const AccountsContext: React.Context<ContextType> = createContext(
  {} as ContextType
);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<AccountType>({} as AccountType);
  const [accounts, setAccounts] = useState<AccountType[]>([] as AccountType[]);

  return (
    <AccountsContext.Provider
      value={{
        account,
        setAccount,
        accounts,
        setAccounts,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
