import { products } from "../../data/products";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Хиты продаж
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Популярные товары
            </h2>
          </div>
          <a href="/catalog" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Смотреть все
            <span className="text-lg">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductList;