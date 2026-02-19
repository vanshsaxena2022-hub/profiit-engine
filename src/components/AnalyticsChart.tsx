"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const ranges = [
  { label: "7D", days: 7 },
  { label: "15D", days: 15 },
  { label: "1M", days: 30 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
];

// generate empty data
function generateEmpty(days: number) {
  const arr = [];
  for (let i = days - 1; i >= 0; i--) {
    arr.push({
      name: `${i}d`,
      value: 0,
    });
  }
  return arr;
}

export default function AnalyticsChart({
  title,
}: {
  title: string;
}) {
  const [days, setDays] = useState(7);

  const data = generateEmpty(days);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`text-xs px-2 py-1 rounded-md ${
                days === r.days
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
