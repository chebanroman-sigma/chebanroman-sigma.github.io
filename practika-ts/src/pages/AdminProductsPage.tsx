import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import type { Product } from "../types";
import { fetchProducts, deleteProduct } from "../api/productsApi";
import PageHeader from "../components/UI/PageHeader";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Не удалось загрузить товары. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | number, title: string) => {
    const isConfirmed = window.confirm(`Удалить товар "${title}"?`);
    if (!isConfirmed) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Ошибка при удалении товара");
    }
  };

  return (
    <div>
      <PageHeader
        title="Управление товарами"
        subtitle={`Всего товаров: ${products.length}`}
        action={
          <Link
            to="/admin/products/add"
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
            Добавить товар
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadProducts} />
      ) : products.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Товар</th>
                <th className="px-6 py-4 font-medium">Категория</th>
                <th className="px-6 py-4 font-medium">Цена</th>
                <th className="px-6 py-4 font-medium">Кол-во</th>
                <th className="px-6 py-4 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                          —
                        </div>
                      )}
                      <span className="font-medium text-slate-900">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {product.count ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`)
                        }
                        className="rounded-md p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Редактировать"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(product.id, product.title)
                        }
                        className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Удалить"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="mb-4 text-slate-500">Товаров пока нет.</p>
          <Link
            to="/admin/products/add"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Добавить первый товар
          </Link>
        </div>
      )}
    </div>
  );
}

export default AdminProductsPage;