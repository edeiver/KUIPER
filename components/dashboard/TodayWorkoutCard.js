"use client";

import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";
import { espaldaBicepsPlan, getWorkoutSummary } from "@/data/workout-plans";

// Locale-independent thousands separator — `toLocaleString("es-ES")` silently
// drops the separator when Node's ICU data doesn't include es-ES (small-icu
// builds), so a fixed regex is used instead of relying on Intl here.
function formatThousands(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const summary = getWorkoutSummary(espaldaBicepsPlan);

const stats = [
  { label: "Ejercicios", value: String(summary.exerciseCount) },
  { label: "Duración", value: `${summary.estimatedDurationMinutes} min` },
  { label: "Volumen est.", value: `${formatThousands(summary.totalVolume)} kg` },
  { label: "Dificultad", value: summary.difficulty },
];

export default function TodayWorkoutCard() {
  return (
    <Surface className="relative grid gap-8 overflow-hidden p-7 sm:p-10">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#9fb7ff]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
          Hoy toca
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
          {summary.title}
        </h2>
      </div>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="text-xs text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <PrimaryAction href="/workouts" className="relative min-h-[4.5rem] text-lg">
        ▶ Comenzar entrenamiento
      </PrimaryAction>
    </Surface>
  );
}
