"use client";

import { useEffect, useState } from "react";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";
import { formatWorkoutSession } from "@/utils/formatWorkoutSession";

const RECENT_SESSIONS_LIMIT = 3;

export default function RecentActivityList() {
  const [loaded, setLoaded] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSessions(readWorkoutSessions().slice(-RECENT_SESSIONS_LIMIT).reverse());
    setLoaded(true);
  }, []);

  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Actividad reciente
      </p>
      {sessions.length ? (
        <div className="grid gap-3">
          {sessions.map((session, index) => {
            const item = formatWorkoutSession(session);
            return (
              <div
                key={`${session.date}-${index}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4"
              >
                <div>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.meta}</p>
                </div>
                <span className="text-zinc-600">›</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          {loaded
            ? "Aún no hay actividad registrada. Completa tu primer entrenamiento para verla aquí."
            : ""}
        </p>
      )}
    </Surface>
  );
}
