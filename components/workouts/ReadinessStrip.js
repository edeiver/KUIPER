 "use client";

export default function ReadinessStrip({ exercise }) {
  const items = [
    ["Técnica", "Controlada"],
    ["Rango", exercise.rangeOfMotion],
    ["Intensidad", `RIR ${exercise.rir}`],
    ["Siguiente", `${exercise.restSeconds} s`],
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {label}
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
      ))}
    </section>
  );
}
