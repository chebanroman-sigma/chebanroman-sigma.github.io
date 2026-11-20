import { useState, useEffect } from "react";
import type { Product, Category, ProductFormData } from "../types";
import { useParams, useNavigate } from "react-router";
import { fetchProducts, updateProduct } from "../api/productsApi";
import { fetchCategories } from "../api/categoriesApi";
import ProductForm from "../components/Admin/Products/ProductForm";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminEditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      const found = productsData.find(p => String(p.id) === String(id));
      if (!found) throw new Error("Товар не найден");
      setProduct(found);
      setCategories(categoriesData);
    } catch (err) {
      setError("Не удалось загрузить данные.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData: ProductFormData) => {
    try {
      await updateProduct(id, formData);
      navigate("/admin/products");
    } catch (err) {
      alert("Ошибка при сохранении товара");
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={loadData} />;
  if (!product) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Редактирование товара</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          initialData={product}
          categories={categories}
          onSave={handleSave}
          onCancel={() => navigate("/admin/products")}
        />
      </div>
    </div>
  );
}

export default AdminEditProductPage;