"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

import { motion } from "framer-motion";

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "px-4 py-2 rounded-md font-medium shadow-sm";
  const variants: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
  };

  return (
    <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
