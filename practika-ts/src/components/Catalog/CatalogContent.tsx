import ProductCard from "../Products/ProductCard";
import ActiveFilters from "./ActiveFilters";

import type { Dispatch, SetStateAction } from "react";
import type { Product, ActiveFilter } from "../../types";

interface CatalogContentProps {
  filteredProducts: Product[];
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  activeFilters: ActiveFilter[];
  onRemoveFilter: (type: ActiveFilter["type"]) => void;
}

function CatalogContent({ 
  filteredProducts, 
  sortType, 
  setSortType, 
  searchQuery, 
  setSearchQuery,
  activeFilters,
  onRemoveFilter
}) {
  return (
    <div className="flex-1">
      {/* Шапка каталога: поиск, сортировка и количество */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Поле поиска */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-500">Найдено: <span className="font-bold text-slate-900">{filteredProducts.length}</span></p>
          
          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="popular">По популярности</option>
            <option value="cheap">Сначала дешевые</option>
            <option value="expensive">Сначала дорогие</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
      </div>

      {/* Активные фильтры (чипсы) */}
      <ActiveFilters filters={activeFilters} onRemove={onRemoveFilter} />

      {/* Сетка товаров */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">По вашему запросу ничего не найдено. Попробуйте изменить фильтры или поисковый запрос.</p>
        </div>
      )}
    </div>
  );
}

export default CatalogContent;