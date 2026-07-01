export default function EnergyScale() {
  return (
    <div className="grid grid-cols-10 gap-2">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index + 1}
          className="flex aspect-square items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-zinc-300"
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
