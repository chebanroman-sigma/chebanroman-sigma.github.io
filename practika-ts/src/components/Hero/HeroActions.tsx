function HeroActions() {
  return (
    <div className="flex items-center gap-4">
      <button 
        type="button" 
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-lg shadow-blue-200"
      >
        Подобрать оборудование
      </button>
      <button 
        type="button" 
        className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        Заказать звонок
      </button>
    </div>
  );
}

export default HeroActions;