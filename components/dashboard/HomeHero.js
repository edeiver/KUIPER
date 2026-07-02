"use client";

import { useEffect, useState } from "react";

export default function HomeHero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }, []);

  return (
    <header className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
            Buenos días, Edeiver 👋
          </p>
          <p className="mt-2 min-h-5 text-sm font-medium capitalize text-zinc-500">
            {today}
          </p>
        </div>

        <div className="shrink-0 rounded-full border border-[#9fb7ff]/30 bg-[#9fb7ff]/10 px-4 py-2 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8d5ff]">
            Streak
          </p>
          <p className="mt-1 text-lg font-semibold text-white">🔥 3 días</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-200">
          Semana 1
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-200">
          Entrenamiento programado
        </span>
      </div>
    </header>
  );
}
