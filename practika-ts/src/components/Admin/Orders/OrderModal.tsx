import { useState, useEffect, type FormEvent } from "react";
import type { Order } from "../../../types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: (id: string | number, status: string, comment: string) => void;
}

function OrderModal({ isOpen, onClose, order, onSave }: OrderModalProps) {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setComment(order.comment || "");
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(order.id, status, comment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Заказ #{order.id}</h2>
        <p className="mb-2 text-sm text-slate-500">
          Клиент: <span className="font-medium text-slate-900">{order.customer}</span>
        </p>
        <p className="mb-4 text-sm text-slate-500">
          Сумма:{" "}
          <span className="font-medium text-slate-900">
            {order.amount.toLocaleString()} ₽
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Статус</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="Новый">Новый</option>
              <option value="В обработке">В обработке</option>
              <option value="Выполнен">Выполнен</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Комментарий администратора
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Например: Клиент просил перезвонить..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;
