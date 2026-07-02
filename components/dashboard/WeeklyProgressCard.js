"use client";

import Surface from "@/components/ui/Surface";

export default function WeeklyProgressCard() {
  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Progreso semanal
      </p>
      <div>
        <p className="text-4xl font-semibold text-white">3 / 4</p>
        <p className="mt-1 text-sm text-zinc-400">Entrenamientos esta semana</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-3/4 rounded-full bg-[#9fb7ff]" />
      </div>
    </Surface>
  );
}
