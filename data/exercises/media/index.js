// Child table: media assets per exercise (one-to-many). Empty until real
// assets exist — shape is `{ exerciseId, type: "image"|"video"|"gif", url,
// order }` per row, ready to populate without changing this file's shape.
export const EXERCISE_MEDIA = [];

export function getMediaForExercise(exerciseId) {
  return EXERCISE_MEDIA.filter((row) => row.exerciseId === exerciseId).sort(
    (a, b) => a.order - b.order,
  );
}
