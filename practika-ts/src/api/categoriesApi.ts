import { API_URL } from "./config";
import type { Category } from "../types";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error("Ошибка при загрузке категорий");
  return response.json();
}

export async function createCategory(
  category: Omit<Category, "id">
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error("Ошибка при создании категории");
  return response.json();
}

export async function updateCategory(
  id: string | number,
  category: Partial<Category>
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error("Ошибка при обновлении категории");
  return response.json();
}

export async function deleteCategory(id: string | number): Promise<unknown> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Ошибка при удалении категории");
  return response.json();
}
