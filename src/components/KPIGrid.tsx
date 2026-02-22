// src/components/KPIGrid.tsx

export default function KPIGrid({
  totalProducts,
  arProducts,
}: {
  totalProducts: number;
  arProducts: number;
}) {
  const kpis = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: "📦",
    },
    {
      label: "Products with AR",
      value: arProducts,
      icon: "🧊",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-2xl p-5 border shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {kpi.label}
              </p>
              <p className="text-2xl font-bold mt-1">
                {kpi.value}
              </p>
            </div>

            <div className="text-2xl">
              {kpi.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}