"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setMobileOpen((v) => !v)} />
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
