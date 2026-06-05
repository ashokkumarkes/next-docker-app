"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [q, setQ] = useState("");
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  const notifications = 3;

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md bg-gray-50"
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-lg font-semibold text-indigo-600">RMS</div>
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search candidates, jobs..."
                className="px-3 py-2 w-72 rounded-md border bg-gray-50 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Link href="/notifications" className="p-2 rounded-md hover:bg-gray-50">🔔</Link>
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-[10px]">{notifications}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-gray-50"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </motion.button>
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="hidden sm:block text-sm">Alex HR</div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
