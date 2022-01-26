const Button: React.FC<JSX.IntrinsicElements["button"]> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-slate-500 text-slate-300 font-bold p-2 rounded shadow-sm shadow-slate-900 h-10"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
