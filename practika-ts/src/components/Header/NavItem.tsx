import { Link } from "react-router";

interface NavItemProps {
  label: string;
  path: string;
}

function NavItem({ label, path }: NavItemProps) {
  return (
    <Link
      to={path}
      className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
    >
      {label}
    </Link>
  );
}

export default NavItem;
