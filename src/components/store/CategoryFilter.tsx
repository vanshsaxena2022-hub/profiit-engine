"use client";

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onChange("ALL")}
        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border ${
          active === "ALL"
            ? "bg-black text-white"
            : "bg-white"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border ${
            active === cat
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
