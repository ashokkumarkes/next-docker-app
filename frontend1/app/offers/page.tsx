"use client";
import Card from "../../components/ui/Card";

const mock = [
  { id: 1, candidate: "Clara", salary: "$90,000", status: "Pending" },
  { id: 2, candidate: "Daniel", salary: "$110,000", status: "Accepted" },
];

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Offers</h1>
      <Card>
        <div className="space-y-3">
          {mock.map((o) => (
            <div key={o.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{o.candidate}</div>
                <div className="text-xs text-gray-500">{o.salary}</div>
              </div>
              <div className="text-sm text-gray-600">{o.status}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
