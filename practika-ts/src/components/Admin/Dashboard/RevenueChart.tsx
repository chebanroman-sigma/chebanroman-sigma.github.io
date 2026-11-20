import type { RevenueChartItem } from "../../../types";

interface RevenueChartProps {
  data: RevenueChartItem[];
}

function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return <div className="p-6 text-slate-500">Нет данных для графика</div>;
  }

  const maxAmount = Math.max(...data.map(d => d.amount), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-slate-900">Динамика выручки (12 месяцев)</h3>
      
      <div className="flex items-end justify-between gap-1 h-56">
        {data.map((item, i) => {
          const heightPercent = (item.amount / maxAmount) * 100;
          const finalHeight = Math.max(heightPercent, 2); // Минимум 2%

          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end group relative">
              {/* Тултип с точной суммой при наведении */}
              <div className="absolute -top-8 hidden group-hover:block rounded bg-slate-800 px-2 py-1 text-xs text-white whitespace-nowrap z-10">
                {item.amount.toLocaleString()} ₽
              </div>
              
              {/* Столбец */}
              <div 
                className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                style={{ height: `${finalHeight}%` }}
              ></div>
              
              {/* Подпись месяца (только месяц, без года, чтобы влезло) */}
              <span className="mt-2 text-[10px] text-slate-400 rotate-0 whitespace-nowrap">
                {item.month.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RevenueChart;