"use client";

import { useEffect, useState } from "react";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";

const upcomingStats = [
  { label: "Peso actual" },
  { label: "Tiempo promedio" },
  { label: "Sesiones completadas" },
  { label: "Volumen semanal" },
];

function formatRelativeDate(isoDate) {
  const diffDays = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  return `Hace ${diffDays} días`;
}

export default function StatsOverviewCard() {
  const [loaded, setLoaded] = useState(false);
  const [lastSession, setLastSession] = useState(null);

  useEffect(() => {
    const sessions = readWorkoutSessions();
    setLastSession(sessions.length ? sessions[sessions.length - 1] : null);
    setLoaded(true);
  }, []);

  return (
    <Surface className="grid gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Resumen
      </p>

      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb7ff]">
          Última sesión
        </p>
        {lastSession ? (
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">
              {lastSession.workout}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {formatRelativeDate(lastSession.date)} · {lastSession.totalSets} series
              · {lastSession.totalVolume.toLocaleString("es-ES")} kg
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-zinc-500">
            {loaded ? "Aún no hay sesiones registradas." : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {upcomingStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 opacity-60"
          >
            <p className="text-xs text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-400">
              Próximamente
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}
