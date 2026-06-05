"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendChart({ data = [] }: { data?: number[] }) {
  const points = (data.length ? data : [3, 5, 2, 8, 6, 7]).map((v, i) => ({ name: `M${i + 1}`, value: v }));

  return (
    <div className="w-full h-56 bg-white rounded-xl p-2 border shadow-sm">
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 10, right: 12, left: -6, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
