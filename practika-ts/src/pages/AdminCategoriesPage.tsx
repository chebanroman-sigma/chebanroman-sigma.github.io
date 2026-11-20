import { useState, useEffect } from "react";
import type { Category, Product } from "../types";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";
import { fetchProducts } from "../api/productsApi";
import CategoryTable from "../components/Admin/Categories/CategoryTable";
import CategoryModal from "../components/Admin/Categories/CategoryModal";
import PageHeader from "../components/UI/PageHeader";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [categoriesData, productsData] = await Promise.all([
        fetchCategories(),
        fetchProducts(),
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
    } catch {
      setError("Не удалось загрузить данные. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const categoriesWithCount = categories.map((category) => {
    const count = products.filter((p) => p.category === category.name).length;
    return { ...category, count };
  });

  const handleSave = async (
    savedCategory: Partial<Category> & { name: string; slug: string; count: number }
  ) => {
    try {
      if (editingCategory && savedCategory.id) {
        await updateCategory(savedCategory.id, savedCategory);
        setCategories(
          categories.map((c) =>
            c.id === savedCategory.id ? ({ ...c, ...savedCategory } as Category) : c
          )
        );
      } else {
        const newCategory = await createCategory({
          name: savedCategory.name,
          slug: savedCategory.slug,
          count: savedCategory.count ?? 0,
        });
        setCategories([...categories, newCategory]);
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch {
      alert("Ошибка при сохранении категории");
    }
  };

  const handleDelete = async (categoryToDelete: Category) => {
    const isConfirmed = window.confirm(
      `Удалить категорию "${categoryToDelete.name}"?`
    );
    if (!isConfirmed) return;

    try {
      await deleteCategory(categoryToDelete.id);
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
    } catch {
      alert("Ошибка при удалении категории");
    }
  };

  return (
    <div>
      <PageHeader
        title="Управление категориями"
        subtitle={`Всего категорий: ${categories.length}`}
        action={
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Добавить категорию
          </button>
        }
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadData} />
      ) : categoriesWithCount.length > 0 ? (
        <CategoryTable
          categories={categoriesWithCount}
          onEdit={(cat) => {
            setEditingCategory(cat);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-500">
            Категорий пока нет. Добавьте первую категорию.
          </p>
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        editingCategory={editingCategory}
      />
    </div>
  );
}

export default AdminCategoriesPage;