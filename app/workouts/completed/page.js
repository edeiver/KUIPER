"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";

const ENERGY_LEVELS = ["Alta", "Media", "Baja"];

function formatDuration(durationSeconds) {
  if (!durationSeconds) {
    return "--";
  }

  return `${Math.round(durationSeconds / 60)} min`;
}

function formatDate(dateIso) {
  if (!dateIso) {
    return "--";
  }

  return new Date(dateIso).toLocaleString();
}

export default function CompletedWorkoutPage() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const sessions = readWorkoutSessions();
    setSession(sessions.length > 0 ? sessions[sessions.length - 1] : null);
  }, []);

  if (session === undefined) {
    return null;
  }

  if (session === null) {
    return (
      <AppShell>
        <section className="grid min-h-[calc(100vh-48px)] content-center gap-8 py-8 text-center">
          <p className="text-xl text-zinc-300">
            Aún no has guardado ningún entrenamiento.
          </p>
          <PrimaryAction href="/workouts">Ver entrenamientos</PrimaryAction>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="grid min-h-[calc(100vh-48px)] content-center gap-8 py-8">
        <header className="text-center">
          <p className="text-5xl">🎉</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            Excelente trabajo.
          </h1>
          <p className="mt-4 text-xl text-zinc-300">{session.workout}</p>
          <p className="mt-1 text-sm text-zinc-500">{formatDate(session.date)}</p>
        </header>

        <Surface className="grid gap-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-xs text-zinc-500">Duración</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatDuration(session.durationSeconds)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-xs text-zinc-500">Series</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {session.totalSets}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-xs text-zinc-500">Volumen</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {session.totalVolume} kg
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
              <p className="text-xs text-zinc-500">Calorías</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {session.calories ?? "--"} kcal
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              ¿Cómo estuvo la energía?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {ENERGY_LEVELS.map((level) => (
                <div
                  key={level}
                  className={`rounded-2xl border p-4 text-center font-semibold ${
                    session.energy === level
                      ? "border-[#9fb7ff]/40 bg-[#9fb7ff]/10 text-white"
                      : "border-white/10 bg-white/[0.05] text-zinc-500"
                  }`}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Comentarios
            </p>
            <div className="min-h-28 rounded-2xl border border-white/10 bg-black/20 p-4 text-zinc-300">
              {session.comments || "Sin comentarios."}
            </div>
          </div>
        </Surface>

        <PrimaryAction href="/">Volver al inicio</PrimaryAction>
      </section>
    </AppShell>
  );
}
