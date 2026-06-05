"use client";
import Card from "../../components/ui/Card";
import { pipeline } from "../../shared/mock/data";
import Avatar from "../../components/Avatar";

export default function KanbanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recruitment Pipeline</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {Object.entries(pipeline).map(([col, items]) => (
            <div key={col} className="min-w-[260px]">
              <div className="text-sm font-medium mb-2">{col}</div>
              <div className="space-y-3">
                {items.map((c: any) => (
                  <Card key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size={36} />
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{c.experience}</div>
                  </Card>
                ))}
                {items.length === 0 && <div className="text-xs text-gray-400">No candidates</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
