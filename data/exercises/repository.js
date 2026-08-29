// Composition layer: the only place that "joins" the normalized exercise
// tables back into a single entity. Today it does in-memory array joins;
// once the catalog moves to PostgreSQL/Prisma, only the body of
// getExerciseById needs to change (to `prisma.exercise.findUnique({
// include: {...} })`) — callers never see the difference. Every join here
// also takes a `locale` so the composed entity carries the right-language
// text end to end.
import { getExerciseRowById } from "./catalog";
import { getCatalogTranslation } from "./catalog/translations";
import { getSecondaryMuscleIdsForExercise } from "./secondary-muscles";
import { getInstructionsForExercise } from "./instructions";
import { getMistakesForExercise } from "./mistakes";
import { getCuesForExercise } from "./cues";
import { getAlternativeRowsForExercise } from "./alternatives";
import { getAlternativeLabel } from "./alternatives/translations";
import { getMediaForExercise } from "./media";
import { getMuscleName } from "../muscles";
import { getEquipmentName } from "../equipment";

// Resolvable alternatives derive their display label from the target
// exercise's own translated catalog name instead of storing a second copy
// of that text — see the note in ./alternatives/index.js.
function getAlternativesForExercise(exerciseId, locale) {
  return getAlternativeRowsForExercise(exerciseId)
    .map((row) =>
      row.alternativeExerciseId
        ? getCatalogTranslation(row.alternativeExerciseId, locale)?.name ?? null
        : getAlternativeLabel(exerciseId, row.order, locale),
    )
    .filter(Boolean);
}

export function getExerciseById(id, locale) {
  const row = getExerciseRowById(id);

  if (!row) {
    return null;
  }

  const { name, objective, musclesToFeel, rangeOfMotion, executionTip, anatomyNote } =
    getCatalogTranslation(id, locale) ?? {};
  const secondaryMuscleIds = getSecondaryMuscleIdsForExercise(row.id);

  return {
    ...row,
    name,
    objective,
    musclesToFeel,
    rangeOfMotion,
    executionTip,
    anatomyNote,
    primaryMuscleName: getMuscleName(row.primaryMuscleId, locale),
    secondaryMuscleIds,
    secondaryMuscleNames: secondaryMuscleIds.map((muscleId) => getMuscleName(muscleId, locale)),
    equipmentName: getEquipmentName(row.equipmentId, locale),
    instructions: getInstructionsForExercise(row.id, locale),
    commonMistakes: getMistakesForExercise(row.id, locale),
    cues: getCuesForExercise(row.id, locale),
    alternatives: getAlternativesForExercise(row.id, locale),
    media: getMediaForExercise(row.id),
  };
}

// Only alternatives with a real catalog entry can actually be switched to
// during a session (no invented data) — filters out the still-text-only
// alternatives and resolves the rest via getExerciseById, reusing the exact
// same composition every other exercise lookup goes through.
export function getSwitchableAlternatives(exerciseId, locale) {
  return getAlternativeRowsForExercise(exerciseId)
    .filter((row) => row.alternativeExerciseId !== null)
    .map((row) => getExerciseById(row.alternativeExerciseId, locale))
    .filter(Boolean);
}
