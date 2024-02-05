import { DepositView } from "./cardView/deposit";
import { WithdrawView } from "./cardView/withdraw";
import { TransferView } from "./cardView/transfer";

export const ActionCard: React.FC<React.HTMLProps<any> & ActionCardType> = ({
  action,
  open,
  setOpen,
  ...props
}) => {
  const currentView = {
    deposit: <DepositView action={action} open={open} setOpen={setOpen} />,
    withdraw: <WithdrawView action={action} open={open} setOpen={setOpen} />,
    transfer: <TransferView action={action} open={open} setOpen={setOpen} />,
  }[action as string];

  return (
    <>
      {open && (
        <div
          className="block w-full mt-4 space-y-4 max-w-[240px]"
          data-testid={`${action}-view`}
          {...props}
        >
          {currentView}
        </div>
      )}
    </>
  );
};
