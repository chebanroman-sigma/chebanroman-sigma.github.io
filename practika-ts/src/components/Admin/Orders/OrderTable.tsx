import type { Order } from "../../../types";

interface OrderTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
}

function OrderTable({ orders, onOpenModal }) {
  const statusColors = {
    "Новый": "bg-blue-50 text-blue-700",
    "В обработке": "bg-yellow-50 text-yellow-700",
    "Выполнен": "bg-green-50 text-green-700"
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-6 py-4 font-medium">ID</th>
            <th className="px-6 py-4 font-medium">Клиент</th>
            <th className="px-6 py-4 font-medium">Сумма</th>
            <th className="px-6 py-4 font-medium">Статус</th>
            <th className="px-6 py-4 font-medium text-right">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-slate-500">#{order.id}</td>
              <td className="px-6 py-4 font-medium text-slate-900">{order.customer}</td>
              <td className="px-6 py-4 text-slate-700">{order.amount.toLocaleString()} ₽</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-slate-100 text-slate-600"}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onOpenModal(order)}
                  className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Просмотр
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;