"use client";
import create from "zustand";

type Theme = "light" | "dark";

type State = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

export const useStore = create<State>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  theme: "light",
  toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
}));
