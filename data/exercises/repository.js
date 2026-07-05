// Composition layer: the only place that "joins" the normalized exercise
// tables back into a single entity. Today it does in-memory array joins;
// once the catalog moves to PostgreSQL/Prisma, only the body of
// getExerciseById needs to change (to `prisma.exercise.findUnique({
// include: {...} })`) — callers never see the difference.
import { getExerciseRowById } from "./catalog";
import { getSecondaryMuscleIdsForExercise } from "./secondary-muscles";
import { getInstructionsForExercise } from "./instructions";
import { getMistakesForExercise } from "./mistakes";
import { getCuesForExercise } from "./cues";
import { getAlternativesForExercise, getAlternativeRowsForExercise } from "./alternatives";
import { getMediaForExercise } from "./media";
import { getMuscleName } from "../muscles";
import { getEquipmentName } from "../equipment";

export function getExerciseById(id) {
  const row = getExerciseRowById(id);

  if (!row) {
    return null;
  }

  const secondaryMuscleIds = getSecondaryMuscleIdsForExercise(row.id);

  return {
    ...row,
    primaryMuscleName: getMuscleName(row.primaryMuscleId),
    secondaryMuscleIds,
    secondaryMuscleNames: secondaryMuscleIds.map(getMuscleName),
    equipmentName: getEquipmentName(row.equipmentId),
    instructions: getInstructionsForExercise(row.id),
    commonMistakes: getMistakesForExercise(row.id),
    cues: getCuesForExercise(row.id),
    alternatives: getAlternativesForExercise(row.id),
    media: getMediaForExercise(row.id),
  };
}

// Only alternatives with a real catalog entry can actually be switched to
// during a session (no invented data) — filters out the still-text-only
// alternatives and resolves the rest via getExerciseById, reusing the exact
// same composition every other exercise lookup goes through.
export function getSwitchableAlternatives(exerciseId) {
  return getAlternativeRowsForExercise(exerciseId)
    .filter((row) => row.alternativeExerciseId !== null)
    .map((row) => getExerciseById(row.alternativeExerciseId))
    .filter(Boolean);
}
