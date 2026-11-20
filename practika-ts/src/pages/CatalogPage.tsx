import { useState, useMemo } from "react";
import type { ActiveFilter } from "../types";
import { useProducts } from "../hooks/useProducts";
import FilterSidebar from "../components/Catalog/FilterSidebar";
import CatalogContent from "../components/Catalog/CatalogContent";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function CatalogPage() {
  // 1. Получаем данные с сервера
  const { products, isLoading, error, refetch } = useProducts();

  // 2. Состояния для мобильной панели фильтров
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 3. Черновики фильтров (то, что выбирает пользователь)
  const [draftCategory, setDraftCategory] = useState("Все");
  const [draftMinPrice, setDraftMinPrice] = useState("");
  const [draftMaxPrice, setDraftMaxPrice] = useState("");

  // 4. Применённые фильтры (то, что реально фильтрует)
  const [appliedCategory, setAppliedCategory] = useState("Все");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");

  // 5. Сортировка и поиск
  const [sortType, setSortType] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState("");

  // --- ФУНКЦИИ УПРАВЛЕНИЯ ---
  
  const handleApplyFilters = () => {
    setAppliedCategory(draftCategory);
    setAppliedMinPrice(draftMinPrice);
    setAppliedMaxPrice(draftMaxPrice);
    setIsFilterOpen(false); // Закрываем мобильную панель после применения
  };

  const handleResetFilters = () => {
    setDraftCategory("Все");
    setDraftMinPrice("");
    setDraftMaxPrice("");
    setAppliedCategory("Все");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
  };

  const handleRemoveFilter = (filterType: ActiveFilter["type"]) => {
    if (filterType === "category") {
      setDraftCategory("Все");
      setAppliedCategory("Все");
    } else if (filterType === "minPrice") {
      setDraftMinPrice("");
      setAppliedMinPrice("");
    } else if (filterType === "maxPrice") {
      setDraftMaxPrice("");
      setAppliedMaxPrice("");
    }
  };

  // --- ВЫЧИСЛЕНИЯ ---

  const parsePrice = (priceStr: string | undefined) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ""), 10);
  };

  // Вычисление отфильтрованного и отсортированного списка
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Поиск
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // 2. Фильтр по категории
    if (appliedCategory !== "Все") {
      result = result.filter((p) => p.category === appliedCategory);
    }

    // 3. Фильтр по min цене
    if (appliedMinPrice) {
      result = result.filter((p) => parsePrice(p.price) >= Number(appliedMinPrice));
    }

    // 4. Фильтр по max цене
    if (appliedMaxPrice) {
      result = result.filter((p) => parsePrice(p.price) <= Number(appliedMaxPrice));
    }

    // 5. Сортировка
    if (sortType === "cheap") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortType === "expensive") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortType === "rating") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortType === "popular") {
      result.sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }));
    }

    return result;
  }, [products, appliedCategory, appliedMinPrice, appliedMaxPrice, sortType, searchQuery]);

  // Формируем массив активных фильтров для чипсов
  const activeFilters: ActiveFilter[] = [];
  if (appliedCategory !== "Все") {
    activeFilters.push({ type: "category", label: `Категория: ${appliedCategory}` });
  }
  if (appliedMinPrice) {
    activeFilters.push({ type: "minPrice", label: `Цена от: ${appliedMinPrice} ₽` });
  }
  if (appliedMaxPrice) {
    activeFilters.push({ type: "maxPrice", label: `Цена до: ${appliedMaxPrice} ₽` });
  }

  // --- РЕНДЕР ---
  return (
    <div className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Каталог оборудования</h1>
            <p className="mt-2 text-slate-500">Данные загружаются с сервера</p>
          </div>
          
          {/* Кнопка "Фильтры" для мобильных */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Фильтры
          </button>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar 
              draftCategory={draftCategory}
              setDraftCategory={setDraftCategory}
              draftMinPrice={draftMinPrice}
              setDraftMinPrice={setDraftMinPrice}
              draftMaxPrice={draftMaxPrice}
              setDraftMaxPrice={setDraftMaxPrice}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
            <CatalogContent 
              filteredProducts={filteredProducts}
              sortType={sortType}
              setSortType={setSortType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default CatalogPage;