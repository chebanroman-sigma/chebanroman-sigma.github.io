import { useState, useEffect, type FormEvent } from "react";
import type { Category } from "../../../types";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: Partial<Category> & { name: string; slug: string; count: number }
  ) => void;
  editingCategory?: Category | null;
}

function CategoryModal({
  isOpen,
  onClose,
  onSave,
  editingCategory,
}: CategoryModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setSlug(editingCategory.slug);
    } else {
      setName("");
      setSlug("");
    }
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    const categoryData: Partial<Category> & {
      name: string;
      slug: string;
      count: number;
    } = {
      name: name.trim(),
      slug: slug.trim(),
      count: editingCategory ? editingCategory.count : 0,
    };

    if (editingCategory) {
      categoryData.id = editingCategory.id;
    }

    onSave(categoryData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          {editingCategory ? "Редактировать категорию" : "Новая категория"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Название
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Например: Кондиционеры"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Slug (URL)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Например: conditioners"
              required
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

export default CategoryModal;