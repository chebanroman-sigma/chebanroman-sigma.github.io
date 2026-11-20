import NavItem from "./NavItem";

interface NavItemData {
  label: string;
  path: string;
}

function Navigation() {
  const navigationItems: NavItemData[] = [
    { label: "Главная", path: "/" },
    { label: "Каталог", path: "/catalog" },
    { label: "Админ-панель", path: "/admin" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigationItems.map((item) => (
        <NavItem key={item.path} label={item.label} path={item.path} />
      ))}
    </nav>
  );
}

export default Navigation;
