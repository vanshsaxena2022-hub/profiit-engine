function Card({
  title,
  value,
  accent,
}: {
  title: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
      {/* accent bar */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${accent}`}
      />

      <div className="text-xs font-medium text-gray-500 tracking-wide">
        {title}
      </div>

      <div className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Updated just now
      </div>
    </div>
  );
}

export default function KPIGrid({
  totalProducts,
  totalCategories,
}: {
  totalProducts: number;
  totalCategories: number;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <Card title="Links Opened" value="0" accent="bg-blue-500" />
      <Card
        title="Total Products"
        value={totalProducts}
        accent="bg-purple-500"
      />
      <Card
        title="Total Categories"
        value={totalCategories}
        accent="bg-amber-500"
      />
      <Card
        title="WhatsApp Clicks"
        value="0"
        accent="bg-green-500"
      />
    </div>
  );
}
