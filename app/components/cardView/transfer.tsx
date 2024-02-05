"use client";
import { useState } from "react";

import { TransferSameAcc } from "../transfer/sameAcc";
import { TransferOtherAcc } from "../transfer/otherAcc";

export const TransferView: React.FC<React.HTMLProps<any> & ActionCardType> = ({
  action,
  open,
  setOpen,
  ...props
}) => {
  const [isSameAccount, setIsSameAccount] = useState("true");

  const currentView = {
    true: <TransferSameAcc action={action} open={open} setOpen={setOpen} />,
    false: <TransferOtherAcc action={action} open={open} setOpen={setOpen} />,
  }[isSameAccount];

  return (
    <>
      {open && (
        <div className="block w-full mt-4 space-y-4" {...props}>
          {action === "transfer" && (
            <div className="gap-x-2 mb-4 flex text-sm justify-between">
              <div className="flex justify-start items-center">
                <label className="pr-px" htmlFor="same">
                  This account
                </label>
                <input
                  type="radio"
                  id="same"
                  value="same"
                  checked={isSameAccount === "true"}
                  onChange={() => setIsSameAccount("true")}
                />
              </div>
              <div className="flex justify-start items-center">
                <label className="pr-px" htmlFor="other">
                  Other account
                </label>
                <input
                  type="radio"
                  id="other"
                  value="other"
                  checked={isSameAccount === "false"}
                  onChange={() => setIsSameAccount("false")}
                />
              </div>
            </div>
          )}
          {currentView}
        </div>
      )}
    </>
  );

  // return (
  //   <>
  //     {open && (
  //       <div className="block w-full mt-4 space-y-4" {...props}>
  //         {action === "transfer" && (
  //           <div className="gap-x-2 mb-4 flex">
  //             <div className="flex justify-start items-center">
  //               <label className="pr-px" htmlFor="same">
  //                 This account
  //               </label>
  //               <input
  //                 type="radio"
  //                 id="same"
  //                 value="same"
  //                 checked={isSameAccount}
  //                 onChange={() => setIsSameAccount(true)}
  //               />
  //             </div>
  //             <div className="flex justify-start items-center">
  //               <label className="pr-px" htmlFor="other">
  //                 Other account
  //               </label>
  //               <input
  //                 type="radio"
  //                 id="other"
  //                 value="other"
  //                 checked={!isSameAccount}
  //                 onChange={() => setIsSameAccount(false)}
  //               />
  //             </div>
  //           </div>
  //         )}
  //         {loadView()}
  //       </div>
  //     )}
  //   </>
  // );
};
