import { NavLink } from "react-router";

function Sidebar() {
  const menuItems = [
    { label: "Обзор", path: "/admin" },
    { label: "Товары", path: "/admin/products" },
    { label: "Категории", path: "/admin/categories" }, // НОВЫЙ ПУНКТ
    { label: "Заказы", path: "/admin/orders" },
    { label: "Настройки", path: "/admin/settings" }
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <span className="text-lg font-bold text-slate-900">Админ-панель</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;