import { API_URL } from "./config";
import type { Order } from "../types";

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) throw new Error("Ошибка при загрузке заказов");
  return response.json();
}

export async function updateOrder(
  id: string | number,
  data: Partial<Order>
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Ошибка при обновлении заказа");
  return response.json();
}
