import { readWorkoutSets } from "./workoutStorage";
import { getExerciseById } from "@/data/exercises/repository";

// Resolves an exercise's real training history purely from saved sessions
// (utils/workoutStorage) — nothing here is invented. Takes a stable
// `exerciseId` (not a display name) so it keeps resolving correctly even if
// the exercise's name changes in the catalog later.
//
// Internal note: `appendWorkoutSet` (WorkoutSessionFlow.js) currently logs
// sets keyed by exercise *name*, not id — that's the existing storage shape,
// unchanged here. This function resolves `exerciseId` -> current name via
// the catalog and matches against that, so callers never depend on text.
export function getExerciseHistory(exerciseId) {
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return { lastSession: null, personalRecord: null };
  }

  const matchingSets = readWorkoutSets().filter((set) => set.exercise === exercise.name);

  if (matchingSets.length === 0) {
    return { lastSession: null, personalRecord: null };
  }

  const lastSession = matchingSets.reduce((latest, set) =>
    new Date(set.date) > new Date(latest.date) ? set : latest,
  );

  const personalRecord = matchingSets.reduce((best, set) =>
    set.weight > best.weight ? set : best,
  );

  return {
    lastSession: { date: lastSession.date, weight: lastSession.weight, reps: lastSession.reps },
    personalRecord: {
      date: personalRecord.date,
      weight: personalRecord.weight,
      reps: personalRecord.reps,
    },
  };
}

// Distinct exercise names with at least one logged set, for a Progress-view
// picker. Names only (the storage shape keys sets by name, not id — see the
// note above), sorted alphabetically for a stable list.
export function getLoggedExerciseNames() {
  const names = new Set(readWorkoutSets().map((set) => set.exercise));
  return Array.from(names).sort((a, b) => a.localeCompare(b, "es"));
}

// Full logged history for one exercise name, oldest first — the raw series
// a Progress view plots, as opposed to getExerciseHistory's last/best-only
// summary used during an active session.
export function getExerciseProgression(exerciseName) {
  return readWorkoutSets()
    .filter((set) => set.exercise === exerciseName)
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
