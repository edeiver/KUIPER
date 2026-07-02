"use client";

import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";

const stats = [
  { label: "Ejercicios", value: "6" },
  { label: "Duración", value: "70 min" },
  { label: "Volumen est.", value: "6.200 kg" },
  { label: "Dificultad", value: "Media-Alta" },
];

export default function TodayWorkoutCard() {
  return (
    <Surface className="grid gap-8 p-7 sm:p-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
          Entrenamiento de hoy
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
          Espalda + Bíceps
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      <PrimaryAction href="/workouts">▶ Comenzar entrenamiento</PrimaryAction>
    </Surface>
  );
}
