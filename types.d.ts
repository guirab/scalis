type AccountType = {
  id: number;
  username: string;
  password: string;
  checking: number;
  savings: number;
};

type NewAccountType = {
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

type InputCurrencyType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type ActionCardType = {
  action:string
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type UpdateType = {
  action: string;
  amount: number;
  type: 'checking' | 'savings';
  id: number;
  from?: 'checking' | 'savings';
}
