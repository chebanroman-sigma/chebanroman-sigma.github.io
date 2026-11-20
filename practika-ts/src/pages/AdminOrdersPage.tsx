import { useState, useEffect, useMemo } from "react";
import { fetchOrders, updateOrder } from "../api/ordersApi";
import OrderTable from "../components/Admin/Orders/OrderTable";
import OrderModal from "../components/Admin/Orders/OrderModal";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError("Не удалось загрузить заказы. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = async (orderId, status, comment) => {
    try {
      await updateOrder(orderId, { status, comment });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status, comment } : o));
      setIsModalOpen(false);
    } catch (err) {
      alert("Ошибка при сохранении заказа");
    }
  };

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(o => o.customer.toLowerCase().includes(query));
    }
    if (statusFilter !== "Все") {
      result = result.filter(o => o.status === statusFilter);
    }
    return result;
  }, [orders, searchQuery, statusFilter]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Управление заказами</h1>
      <p className="mb-4 text-sm text-slate-500">Всего заказов: {orders.length}</p>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Поиск по клиенту..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-72 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="Все">Все статусы</option>
          <option value="Новый">Новый</option>
          <option value="В обработке">В обработке</option>
          <option value="Выполнен">Выполнен</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadOrders} />
      ) : filteredOrders.length > 0 ? (
        <OrderTable orders={filteredOrders} onOpenModal={handleOpenModal} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-500">По вашему запросу ничего не найдено.</p>
        </div>
      )}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />
    </div>
  );
}

export default AdminOrdersPage;