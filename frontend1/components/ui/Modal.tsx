"use client";
import { ReactNode } from "react";

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children?: ReactNode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center py-8">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-3xl mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[calc(100vh-64px)]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="p-4 overflow-auto max-h-[calc(100vh-140px)]">{children}</div>
        </div>
      </div>
    </div>
  );
}
