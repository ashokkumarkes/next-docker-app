"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const path = usePathname() || "/dashboard";

  const nav: Array<[string, string, string]> = [
    ["/dashboard", "Dashboard", "📊"],
    ["/jobs", "Jobs", "💼"],
    ["/candidates", "Candidates", "👥"],
    ["/kanban", "Pipeline", "🗂️"],
    ["/interviews", "Interviews", "🎤"],
    ["/offers", "Offers", "📨"],
    ["/users", "Users", "👤"],
  ];

  return (
    <>
      <aside className={`w-20 md:w-64 bg-white border-r hidden md:flex flex-col p-4` }>
        <div className="mb-6">
          <Link href="/dashboard" className="text-indigo-600 font-bold text-lg">
            RMS
          </Link>
        </div>
        <nav className="flex-1">
          {nav.map(([href, label, icon]) => (
            <Link
              key={String(href)}
              href={String(href)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 ${path === href ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
            >
              <span className="text-lg">{icon}</span>
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-4 text-xs text-gray-400">Role: Admin</div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <aside className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4 transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
          <div className="mb-6 flex items-center justify-between">
            <Link href="/dashboard" className="text-indigo-600 font-bold text-lg">
              RMS
            </Link>
            <button onClick={onClose} aria-label="Close menu" className="p-2">✕</button>
          </div>
          <nav className="flex-1 space-y-1">
            {nav.map(([href, label]) => (
              <Link
                key={String(href)}
                href={String(href)}
                onClick={onClose}
                className={`block rounded-lg px-3 py-2 text-sm hover:bg-gray-50 ${path === href ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 text-xs text-gray-400">Role: Admin</div>
        </aside>
      </div>
    </>
  );
}
