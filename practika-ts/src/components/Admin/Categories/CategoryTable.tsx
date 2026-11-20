import type { Category } from "../../../types";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-6 py-4 font-medium">ID</th>
            <th className="px-6 py-4 font-medium">Название</th>
            <th className="px-6 py-4 font-medium">Slug</th>
            <th className="px-6 py-4 font-medium">Товаров</th>
            <th className="px-6 py-4 font-medium text-right">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {categories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 text-slate-500">{category.id}</td>
              <td className="px-6 py-4 font-medium text-slate-900">
                {category.name}
              </td>
              <td className="px-6 py-4 font-mono text-xs text-slate-500">
                {category.slug}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {category.count}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(category)}
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
                    onClick={() => onDelete(category)}
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
  );
}

export default CategoryTable;