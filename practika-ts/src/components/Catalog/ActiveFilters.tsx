import type { ActiveFilter } from "../../types";

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (type: ActiveFilter["type"]) => void;
}

function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  // Если нет активных фильтров — ничего не рендерим
  if (filters.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Активные фильтры:</span>
      
      {filters.map((filter) => (
        <span 
          key={filter.type}
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200"
        >
          {filter.label}
          {/* Кнопка-крестик для удаления фильтра */}
          <button 
            type="button"
            onClick={() => onRemove(filter.type)}
            className="ml-1 rounded-full p-0.5 hover:bg-blue-200 transition-colors"
            aria-label="Удалить фильтр"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      
      {/* Кнопка "Очистить все" */}
      <button 
        type="button"
        onClick={() => filters.forEach(f => onRemove(f.type))}
        className="text-xs text-slate-400 hover:text-red-500 transition-colors ml-2"
      >
        Очистить все
      </button>
    </div>
  );
}

export default ActiveFilters;