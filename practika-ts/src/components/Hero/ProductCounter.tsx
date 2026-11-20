function ProductCounter({ count }) {
  return (
    <div className="absolute -bottom-6 left-6 rounded-xl border border-slate-100 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
        Брендов оборудования
      </p>
      <span className="block text-2xl font-bold text-blue-600">
        {count}
      </span>
    </div>
  );
}

export default ProductCounter;