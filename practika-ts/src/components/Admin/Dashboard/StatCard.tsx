function StatCard({ title, value, icon, trend, trendLabel }) {
  // Показываем тренд только если он передан и не равен 0 (или если это 0, но мы хотим его показать)
  const showTrend = trend !== undefined && trend !== null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      {showTrend && (
        <div className="mt-4 flex items-center gap-1 text-xs">
          <span className={`font-medium ${trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-slate-500"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
          <span className="text-slate-400">{trendLabel || "с прошлого месяца"}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;