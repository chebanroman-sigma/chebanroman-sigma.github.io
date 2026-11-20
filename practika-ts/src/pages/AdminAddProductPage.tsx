import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { Category, ProductFormData } from "../types";
import { createProduct } from "../api/productsApi";
import { fetchCategories } from "../api/categoriesApi";
import ProductForm from "../components/Admin/Products/ProductForm";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminAddProductPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      setError("Не удалось загрузить категории.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData: ProductFormData) => {
    try {
      await createProduct(formData);
      navigate("/admin/products");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Ошибка при создании товара"
      );
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={loadCategories} />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Добавление товара
      </h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          categories={categories}
          onSave={handleSave}
          onCancel={() => navigate("/admin/products")}
        />
      </div>
    </div>
  );
}

export default AdminAddProductPage;