import { API_URL } from "./config";
import type { Category, Order, Product, DashboardStats, CategoryChartItem, RevenueChartItem } from "../types";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const [categoriesRes, ordersRes, productsRes] = await Promise.all([
    fetch(`${API_URL}/categories`),
    fetch(`${API_URL}/orders`),
    fetch(`${API_URL}/products`),
  ]);

  if (!categoriesRes.ok || !ordersRes.ok || !productsRes.ok) {
    throw new Error("Ошибка при загрузке статистики");
  }

  const categories: Category[] = await categoriesRes.json();
  const orders: Order[] = await ordersRes.json();
  const products: Product[] = await productsRes.json();

  const categoryChartData: CategoryChartItem[] = categories.map((c) => {
    const count = products.filter((p) => p.category === c.name).length;
    return {
      name: c.name,
      value: count,
      color: getCategoryColor(c.id),
    };
  });

  const latestDate =
    orders.length > 0
      ? new Date(Math.max(...orders.map((o) => new Date(o.date).getTime())))
      : new Date();

  const months: { key: string; label: string }[] = [];
  const monthNames = [
    "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
  ];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(latestDate.getFullYear(), latestDate.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const label = `${monthNames[d.getMonth()]} ${year}`;
    months.push({ key: `${year}-${month}`, label });
  }

  const revenueChartData: RevenueChartItem[] = months.map((month) => {
    const monthlyOrders = orders.filter(
      (o) => o.date && o.date.startsWith(month.key)
    );
    const total = monthlyOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    return { month: month.label, amount: total, count: monthlyOrders.length };
  });

  const currentMonthData = revenueChartData[11];
  const prevMonthData = revenueChartData[10];

  const calculateTrend = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const revenueTrend = calculateTrend(
    currentMonthData.amount,
    prevMonthData.amount
  );
  const ordersTrend = calculateTrend(
    currentMonthData.count,
    prevMonthData.count
  );

  const uniqueCustomers = new Set(orders.map((o) => o.customer));
  const totalUsers = uniqueCustomers.size;

  const currentMonthCustomers = new Set(
    orders
      .filter((o) => o.date && o.date.startsWith(months[11].key))
      .map((o) => o.customer)
  );
  const prevMonthCustomers = new Set(
    orders
      .filter((o) => o.date && o.date.startsWith(months[10].key))
      .map((o) => o.customer)
  );

  const usersTrend = calculateTrend(
    currentMonthCustomers.size,
    prevMonthCustomers.size
  );
  const productsTrend = 0;

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    revenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
    newUsers: totalUsers,
    recentOrders: orders.slice(0, 5),
    categoryChartData,
    revenueChartData,
    trends: {
      products: productsTrend,
      orders: ordersTrend,
      revenue: revenueTrend,
      users: usersTrend,
    },
  };
}

function getCategoryColor(id: string | number): string {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  return colors[Number(id) % colors.length] || "#94a3b8";
}
