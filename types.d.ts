type AccountType = {
  id: number;
  username: string;
  password: string;
  checking: number;
  savings: number;
};

type ContextType = {
  account: AccountType;
  setAccount: React.Dispatch<React.SetStateAction<AccountType>>;
  accounts: AccountType[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountType[]>>;
};