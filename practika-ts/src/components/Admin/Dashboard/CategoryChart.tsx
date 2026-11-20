import type { CategoryChartItem } from "../../../types";

interface CategoryChartProps {
  data: CategoryChartItem[];
}

function CategoryChart({ data }: CategoryChartProps) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Вычисляем углы для секторов
  let currentAngle = 0;
  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...item, startAngle, angle };
  });

  // Функция для описания дуги SVG
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", x, y,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-slate-900">Товары по категориям</h3>
      <div className="flex items-center gap-6">
        {/* Диаграмма */}
        <svg viewBox="0 0 200 200" className="h-40 w-40 shrink-0">
          {segments.map((seg, i) => (
            <path
              key={i}
              d={describeArc(100, 100, 80, seg.startAngle, seg.startAngle + seg.angle)}
              fill={seg.color}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
          {/* Центральное отверстие для эффекта "бублика" */}
          <circle cx="100" cy="100" r="40" fill="white" />
          <text x="100" y="95" textAnchor="middle" className="text-xs fill-slate-500">Всего</text>
          <text x="100" y="115" textAnchor="middle" className="text-lg font-bold fill-slate-900">{total}</text>
        </svg>

        {/* Легенда */}
        <div className="flex flex-col gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-slate-600">{item.name}</span>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryChart;