import { categories } from "../../data/categories";
import CategoryCard from "./CategoryCard";

function CategoryList() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        
        {   }
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Категории
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Популярные категории
            </h2>
          </div>
          
          <a href="/catalog" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Весь каталог
            <span className="text-lg">→</span>
          </a>
        </div>

        {   }
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoryList;