import React from "react";
import { motion } from "framer-motion";

export default function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`bg-white rounded-xl p-4 shadow-sm border ${className}`}
    >
      {children}
    </motion.div>
  );
}
