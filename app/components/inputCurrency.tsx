export const InputCurrency: React.FC<
  React.HTMLProps<any> & InputCurrencyType
> = ({ value, setValue, ...props }) => {
  const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d)(\d{2})$/, "$1.$2");
    v = v.replace(/(?=(\d{3})+(\D))\B/g, ",");
    setValue(v);
  };
  return (
    <div className="relative w-full">
      <span className="absolute text-black left-px">$&nbsp;</span>
      <input
        autoComplete="off"
        type="text"
        onChange={(e) => currencyMask(e)}
        value={value}
        name={props.name}
        id={props.id}
        required
        className={`text-black pl-4 ${props.className} w-full`}
      />
    </div>
  );
};
