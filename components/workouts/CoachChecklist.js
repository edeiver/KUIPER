const cues = [
  "Hombros pegados al banco",
  "Baja en 3 segundos",
  "Pausa abajo sin rebotar",
  "Empuja con pecho, no con hombros",
];

export default function CoachChecklist() {
  return (
    <div className="grid gap-3">
      {cues.map((cue, index) => (
        <div
          key={cue}
          className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-4"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9fb7ff]/15 text-sm font-semibold text-[#c8d5ff]">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-zinc-200">{cue}</span>
        </div>
      ))}
    </div>
  );
}
