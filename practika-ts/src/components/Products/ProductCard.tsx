import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
      
      {/* Картинка */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Плашка со скидкой, если есть старая цена */}
        {product.oldPrice && (
          <span className="absolute top-3 left-3 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            Скидка
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="mb-2 text-sm font-semibold text-slate-900 line-clamp-2">
          {product.title}
        </h3>
        
        {/* Рейтинг (звездочка и цифра) */}
        <div className="mb-4 flex items-center gap-1 text-sm text-amber-500">
          <span>★</span>
          <span className="font-medium text-slate-600">{product.rating}</span>
        </div>

        {/* Цена и кнопка */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.oldPrice && (
              <span className="block text-xs text-slate-400 line-through">
                {product.oldPrice}
              </span>
            )}
            <span className="block text-lg font-bold text-slate-900">
              {product.price}
            </span>
          </div>
          
          <button 
            type="button" 
            className="rounded-lg bg-slate-900 p-2 text-white transition-colors hover:bg-blue-600"
            aria-label="Добавить в корзину"
          >
            {/* Иконка плюса */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
