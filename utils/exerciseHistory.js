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
