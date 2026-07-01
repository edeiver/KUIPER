const progressItems = ["Mi progreso", "Fotos", "Peso", "Configuración"];

export default function ProgressMenu() {
  return (
    <div className="grid gap-3">
      {progressItems.map((item) => (
        <div
          key={item}
          className="flex min-h-14 items-center justify-between border-b border-white/8 text-base text-zinc-200 last:border-b-0"
        >
          <span>{item}</span>
          <span className="text-zinc-600">›</span>
        </div>
      ))}
    </div>
  );
}
