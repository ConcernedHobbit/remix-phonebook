const Footer: React.FC<JSX.IntrinsicElements["footer"]> = ({
  children,
  ...props
}) => {
  return (
    <footer className="float-right mr-4 mb-2" {...props}>
      {children}
      <p className="text-gray-300">
        made with <span className="font-mono">&lt;3</span>,{" "}
        <a
          className="underline font-mono"
          href="https://remix.run"
          target="_blank"
          rel="noreferrer"
        >
          remix
        </a>
        , and{" "}
        <a
          className="underline font-mono"
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
        >
          tailwindcss
        </a>{" "}
        by{" "}
        <a
          className="underline font-mono"
          href="https://github.com/ConcernedHobbit"
          target="_blank"
          rel="noreferrer"
        >
          chobbit
        </a>
      </p>
    </footer>
  );
};

export default Footer;
