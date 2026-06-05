"use client";
import { useMemo, useState } from "react";

function weekdayShort(i: number) {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][i];
}

type EventItem = { id?: number; date: string; time: string; name: string; role?: string; tag?: string };

export default function Calendar({ selectedDate, onSelect, events = [] }: { selectedDate?: string; onSelect?: (d: string) => void; events?: EventItem[] }) {
  const [current, setCurrent] = useState(new Date());
  const [internalSelected, setInternalSelected] = useState<string | undefined>(selectedDate);

  const monthMatrix = useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevDays = firstDay; // number of days from previous month to show
    const totalCells = Math.ceil((prevDays + daysInMonth) / 7) * 7;
    const cells: Array<Date | null> = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - prevDays + 1;
      const d = new Date(year, month, dayNumber);
      cells.push(d);
    }

    return { year, month, cells };
  }, [current]);

  const todayStr = new Date().toDateString();

  const selectedStr = selectedDate ?? internalSelected ?? todayStr;

  const eventsForSelected = events.filter((e) => e.date === selectedStr);

  function handleSelect(d: Date) {
    const s = d.toDateString();
    setInternalSelected(s);
    onSelect?.(s);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-medium">
            {current.toLocaleString(undefined, { month: "long" })} {current.getFullYear()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              className="text-sm text-gray-600 hover:text-gray-800"
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrent((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              className="text-sm text-gray-600 hover:text-gray-800"
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="py-1">
              {weekdayShort(i)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mt-2">
          {monthMatrix.cells.map((cell, idx) => {
            const isToday = cell ? cell.toDateString() === todayStr : false;
            const inMonth = cell ? cell.getMonth() === monthMatrix.month : false;
            const isSelected = cell ? cell.toDateString() === selectedStr : false;

            return (
              <button
                key={idx}
                onClick={() => cell && handleSelect(cell)}
                className={`h-10 flex items-center justify-center text-sm rounded focus:outline-none ${
                  isSelected ? "bg-indigo-600 text-white" : isToday ? "bg-blue-600 text-white" : inMonth ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {cell ? cell.getDate() : ""}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium">{new Date(selectedStr).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <div className="text-xs text-gray-400">{eventsForSelected.length} events</div>
        </div>

        <ul className="space-y-3">
          {eventsForSelected.length === 0 && <li className="text-sm text-gray-500">No events</li>}
          {eventsForSelected.map((e) => (
            <li key={e.id ?? e.time} className="flex items-start gap-3">
              <div className="w-20 text-xs text-gray-600 bg-gray-100 rounded-full py-1 text-center">{e.time}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="text-xs text-gray-500">{e.role}</div>
              </div>
              <div className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{e.tag}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
