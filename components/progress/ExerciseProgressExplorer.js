"use client";

import { useEffect, useMemo, useState } from "react";
import Surface from "@/components/ui/Surface";
import { getLoggedExerciseNames, getExerciseProgression } from "@/utils/exerciseHistory";
import { formatRelativeDate } from "@/utils/formatWorkoutSession";

export default function ExerciseProgressExplorer() {
  const [loaded, setLoaded] = useState(false);
  const [names, setNames] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loggedNames = getLoggedExerciseNames();
    setNames(loggedNames);
    setSelected(loggedNames[0] ?? "");
    setLoaded(true);
  }, []);

  const progression = useMemo(
    () => (selected ? getExerciseProgression(selected).reverse() : []),
    [selected],
  );

  const maxWeight = useMemo(
    () => progression.reduce((max, set) => Math.max(max, set.weight), 0),
    [progression],
  );

  if (loaded && names.length === 0) {
    return (
      <Surface className="grid gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Progreso por ejercicio
        </p>
        <p className="text-sm text-zinc-500">
          Aún no hay series registradas. Completa un entrenamiento para ver la evolución de peso por ejercicio.
        </p>
      </Surface>
    );
  }

  return (
    <Surface className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Progreso por ejercicio
        </p>
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white outline-none"
        >
          {names.map((name) => (
            <option key={name} value={name} className="bg-[#07080a]">
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        {progression.map((set, index) => (
          <div key={`${set.date}-${index}`} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="h-8 overflow-hidden rounded-lg bg-white/[0.04]">
              <div
                className="flex h-full items-center rounded-lg bg-[#9fb7ff]/70 px-3"
                style={{ width: maxWeight ? `${Math.max((set.weight / maxWeight) * 100, 12)}%` : "12%" }}
              >
                <span className="text-xs font-semibold text-[#07080a]">{set.weight} kg</span>
              </div>
            </div>
            <p className="text-right text-xs text-zinc-500">
              {set.reps} reps · {formatRelativeDate(set.date)}
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}
