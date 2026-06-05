"use client";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import TrendChart from "../../components/Charts/TrendChart";
import FunnelChart from "../../charts/FunnelChart";
import Calendar from "../../components/ui/Calendar";
import { stats, recentActivity, calendarEvents } from "../../shared/mock/data";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(new Date().toDateString());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-500">Total Jobs</div>
          <div className="text-2xl font-semibold">{stats.jobs}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Candidates</div>
          <div className="text-2xl font-semibold">{stats.candidates}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Interviews</div>
          <div className="text-2xl font-semibold">{stats.interviews}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Offers</div>
          <div className="text-2xl font-semibold">{stats.offers}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <TrendChart data={[3, 5, 4, 6, 8, 7, 9]} />
          </Card>
          <Card>
            <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
            <ul className="space-y-2">
              {recentActivity.map((r) => (
                <li key={r.id} className="text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <div>{r.text}</div>
                    <div className="text-xs text-gray-400">{r.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Calendar selectedDate={selectedDate} onSelect={(d) => setSelectedDate(d)} events={calendarEvents} />
          <div>
            <FunnelChart />
          </div>
        </div>
      </div>
    </div>
  );
}
