import { useState } from "react";
import { Link } from "react-router";
import Brand from "./Brand";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Верхняя строка: Логотип, Десктопное меню, Действия, Бургер */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <Brand name="КЛИМАТ-ПРО" />
            </Link>
            <Navigation /> {/* Десктопное меню (скрыто на мобильных) */}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <HeaderActions />
            </div>

            {/* Кнопка-бургер (видна только на мобильных) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMobileMenuOpen ? (
                  // Иконка крестика (если меню открыто)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Иконка гамбургера (если меню закрыто)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Выпадающее мобильное меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-slate-100 pt-4 pb-2">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700"
              >
                Каталог
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700"
              >
                Админ-панель
              </Link>
              <div className="pt-4 border-t border-slate-100">
                <HeaderActions />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
