import type { Dispatch, SetStateAction } from "react";

interface FilterSidebarProps {
  draftCategory: string;
  setDraftCategory: Dispatch<SetStateAction<string>>;
  draftMinPrice: string;
  setDraftMinPrice: Dispatch<SetStateAction<string>>;
  draftMaxPrice: string;
  setDraftMaxPrice: Dispatch<SetStateAction<string>>;
  onApply: () => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function FilterSidebar({ 
  draftCategory, setDraftCategory, 
  draftMinPrice, setDraftMinPrice, 
  draftMaxPrice, setDraftMaxPrice, 
  onApply, onReset,
  isOpen, onClose // Новые пропсы
}) {
  const categories = ["Все", "Кондиционеры", "Вентиляция", "Обогрев", "Аксессуары"];

  return (
    <>
      {/* Затемнение фона (только на мобильных) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Панель фильтров */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300
        lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none lg:transition-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          
          {/* Кнопка закрытия (только на мобильных) */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h3 className="text-lg font-bold text-slate-900">Фильтры</h3>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Заголовок для десктопа */}
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <h3 className="text-lg font-bold text-slate-900">Фильтры</h3>
            <button 
              type="button" 
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              Сбросить
            </button>
          </div>
          
          {/* Фильтр по категориям */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Категория</h4>
            <div className="space-y-2">
              {categories.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={draftCategory === item}
                    onChange={() => setDraftCategory(item)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" 
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Фильтр по цене */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Цена, ₽</h4>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="От" 
                value={draftMinPrice}
                onChange={(e) => setDraftMinPrice(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-blue-500" 
              />
              <span className="text-slate-400">—</span>
              <input 
                type="number" 
                placeholder="До" 
                value={draftMaxPrice}
                onChange={(e) => setDraftMaxPrice(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-blue-500" 
              />
            </div>
          </div>

          <button 
            type="button" 
            onClick={onApply}
            className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Применить
          </button>
          
          {/* Кнопка сброса на мобильных */}
          <button 
            type="button" 
            onClick={onReset}
            className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors lg:hidden"
          >
            Сбросить
          </button>
        </div>
      </aside>
    </>
  );
}

export default FilterSidebar;