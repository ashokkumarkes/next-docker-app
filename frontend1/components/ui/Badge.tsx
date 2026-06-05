export default function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return <span className={`text-xs px-2 py-1 rounded-full ${colors[color] || colors.gray}`}>{children}</span>;
}
