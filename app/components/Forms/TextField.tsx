type Props = Omit<JSX.IntrinsicElements["input"], "type">;
const TextField: React.FC<Props> = ({ children, ...props }) => {
  return (
    <input
      type="text"
      className="w-full rounded-md border-slate-800 bg-slate-300 aria-invalid:border-red-600"
      {...props}
    >
      {children}
    </input>
  );
};

export default TextField;
