import { Link } from "remix";

const Header: React.FC<JSX.IntrinsicElements["header"]> = ({
  children,
  ...props
}) => {
  return (
    <header className="w-full px-4 py-2 flex items-center gap-4" {...props}>
      <h1 className="font-bold text-lg text-white">
        <Link to="/">
          p<span className="hidden md:inline lg:inline">hone</span>b
          <span className="hidden md:inline lg:inline">ook</span>
        </Link>
      </h1>
      {children !== undefined && (
        <nav className="text-slate-300 flex gap-4 w-full">{children}</nav>
      )}
    </header>
  );
};

export default Header;
