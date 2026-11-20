function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {/* Рендерим 6 заглушек */}
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
          {/* Заглушка для картинки */}
          <div className="mb-4 h-48 w-full animate-pulse rounded-lg bg-slate-200"></div>
          
          {/* Заглушка для категории */}
          <div className="mb-2 h-3 w-20 animate-pulse rounded bg-slate-200"></div>
          
          {/* Заглушка для названия */}
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-slate-200"></div>
          <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-slate-200"></div>
          
          {/* Заглушка для цены и кнопки */}
          <div className="mt-auto flex items-center justify-between">
            <div className="h-6 w-20 animate-pulse rounded bg-slate-200"></div>
            <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;