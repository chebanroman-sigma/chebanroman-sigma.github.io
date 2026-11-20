import { useState, useEffect } from "react";
import type { ProductFormData, ProductFormProps } from "../../types";
import { type FormEvent, type ChangeEvent } from "react";

function ProductForm({ initialData, categories, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    category: categories.length > 0 ? categories[0].name : "Кондиционеры", // Первая категория по умолчанию
    price: "",
    count: "",
    description: "",
    image: ""
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState<ProductFormData>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || (categories.length > 0 ? categories[0].name : ""),
        price: initialData.price || "",
        count: initialData.count || "",
        description: initialData.description || "",
        image: initialData.image || ""
      });
      setPreview(initialData.image || null);
    }
  }, [initialData, categories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Выберите изображение (jpg, png, webp)" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Файл слишком большой. Максимум 5 МБ." });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setFormData({ ...formData, image: compressedBase64 });
        setPreview(compressedBase64);
        setErrors({ ...errors, image: "" });
      };
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название товара";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Цена должна быть больше нуля";
    }
    if (!formData.count || Number(formData.count) <= 0) {
      newErrors.count = "Количество должно быть больше нуля";
    }
    if (!formData.image) {
      newErrors.image = "Загрузите изображение товара";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Название</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
            errors.title ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"
          }`}
          placeholder="Например: Сплит-система Daikin"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Категория</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          {/* Динамический список категорий */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Цена, ₽</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
              errors.price ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"
            }`}
            placeholder="45000"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Количество</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
              errors.count ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"
            }`}
            placeholder="10"
          />
          {errors.count && <p className="mt-1 text-xs text-red-500">{errors.count}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="Краткое описание товара..."
        ></textarea>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Изображение товара</label>
        <div className="flex items-start gap-4">
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden">
            {preview ? (
              <>
                <img src={preview} alt="Превью" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, image: "" });
                  }}
                  className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  title="Удалить изображение"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            <p className="mt-2 text-xs text-slate-400">
              Поддерживаются форматы: JPG, PNG, WEBP. Максимум 5 МБ.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Сохранить товар
        </button>
      </div>
    </form>
  );
}

export default ProductForm;