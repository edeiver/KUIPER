 "use client";

import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";
import RestTimer from "@/components/workouts/RestTimer";

const sets = [
  ["1", "8 - 10", "2", "120 s", "24 kg", "Actual"],
  ["2", "8 - 10", "2", "120 s", "24 kg", "Siguiente"],
  ["3", "8 - 10", "1 - 2", "120 s", "24 kg", "Pendiente"],
  ["4", "8 - 10", "1", "150 s", "22 kg", "Back-off"],
];

export default function MyTrainingPanel() {
  return (
    <Surface id="mi-entrenamiento" className="scroll-mt-24 grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          Mi entrenamiento
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Series de trabajo
        </h2>
      </div>

      <div className="grid gap-3">
        {sets.map(([series, reps, rir, rest, weight, status], index) => (
          <div
            key={series}
            className={`grid gap-4 rounded-[24px] border p-4 sm:grid-cols-[0.7fr_1fr_0.8fr_1fr_1fr_1fr] sm:items-center ${
              index === 0
                ? "border-[#9fb7ff]/40 bg-[#9fb7ff]/10"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Serie
              </p>
              <p className="mt-1 text-xl font-semibold text-white">{series}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Reps
              </p>
              <p className="mt-1 text-base font-semibold text-white">{reps}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                RIR
              </p>
              <p className="mt-1 text-base font-semibold text-white">{rir}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Descanso
              </p>
              <p className="mt-1 text-base font-semibold text-white">{rest}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Peso
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {weight}
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-2 text-center text-xs font-semibold text-zinc-300">
              {status}
            </span>
          </div>
        ))}
      </div>

      <RestTimer />

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Notas
        </p>
        <div className="min-h-24 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-500">
          Mantener hombros atrás y evitar perder control en la última repetición.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <PrimaryAction>Iniciar descanso</PrimaryAction>
        <PrimaryAction href="/workouts/completed">Siguiente ejercicio</PrimaryAction>
      </div>
    </Surface>
  );
}
