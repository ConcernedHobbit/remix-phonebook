const Main: React.FC<JSX.IntrinsicElements["main"]> = ({
  children,
  ...props
}) => {
  return (
    <main
      className="bg-slate-400 shadow-slate-700 shadow-lg rounded p-4 m-4 min-h-[80%] h-fit"
      {...props}
    >
      {children}
    </main>
  );
};

export default Main;
