export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span className="font-semibold">{initials}</span>
    </div>
  );
}
