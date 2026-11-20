import { useState, useEffect } from "react";
import type { DashboardStats } from "../types";
import { fetchDashboardStats } from "../api/dashboardApi";
import StatCard from "../components/Admin/Dashboard/StatCard";
import CategoryChart from "../components/Admin/Dashboard/CategoryChart";
import RevenueChart from "../components/Admin/Dashboard/RevenueChart";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError("Не удалось загрузить статистику. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={loadStats} />;
  if (!stats) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Обзор</h1>

      {/* Карточки статистики */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Всего товаров" 
          value={stats.totalProducts} 
          trend={stats.trends.products}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
        <StatCard 
          title="Заказов" 
          value={stats.totalOrders} 
          trend={stats.trends.orders}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatCard 
          title="Выручка" 
          value={`${stats.revenue.toLocaleString()} ₽`} 
          trend={stats.trends.revenue}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Новых пользователей" 
          value={stats.newUsers} 
          trend={stats.trends.users}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
      </div>

      {/* Графики */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryChart data={stats.categoryChartData} />
        <RevenueChart data={stats.revenueChartData} />
      </div>

      {/* Последние заказы */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Последние заказы</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Клиент</th>
                <th className="px-6 py-3 font-medium">Сумма</th>
                <th className="px-6 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">#{order.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-700">{order.amount.toLocaleString()} ₽</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "Новый" ? "bg-blue-50 text-blue-700" :
                      order.status === "В обработке" ? "bg-yellow-50 text-yellow-700" :
                      "bg-green-50 text-green-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;