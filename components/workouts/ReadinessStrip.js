 "use client";

const items = [
  ["Técnica", "Controlada"],
  ["Rango", "Completo"],
  ["Intensidad", "RIR 2"],
  ["Siguiente", "120 s"],
];

export default function ReadinessStrip() {
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
