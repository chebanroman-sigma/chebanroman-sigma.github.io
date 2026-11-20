import { API_URL } from "./config";
import type { Product, ProductFormData } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Ошибка при загрузке товаров");
  return response.json();
}

export async function createProduct(product: ProductFormData): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as { message?: string }).message ||
          `Ошибка сервера: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Сервер не отвечает. Проверьте, запущен ли JSON Server.");
    }
    throw error;
  }
}

export async function updateProduct(
  id: string | number,
  product: ProductFormData
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Ошибка при обновлении товара");
  return response.json();
}

export async function deleteProduct(id: string | number): Promise<unknown> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Ошибка при удалении товара");
  return response.json();
}
