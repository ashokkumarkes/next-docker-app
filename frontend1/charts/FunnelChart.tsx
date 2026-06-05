import React from "react";
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList } from "recharts";

const data = [
  { name: "Applied", value: 120 },
  { name: "Screening", value: 80 },
  { name: "Interview", value: 40 },
  { name: "Offer", value: 10 },
];

export default function PipelineFunnel() {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm h-56">
      <div className="text-sm text-gray-600 mb-3">Hiring Pipeline</div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={data} isAnimationActive animationDuration={600} stroke="#fff">
              <LabelList position="right" formatter={(value: any, name: any) => `${name}: ${value}`} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
