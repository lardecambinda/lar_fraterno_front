function Avatar({ name }: { name: string }) {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
  return (
    <div className="w-9 h-9 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
      {initials}
    </div>
  );
}

export default Avatar;
