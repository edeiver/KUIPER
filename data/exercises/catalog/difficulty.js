// Stable keys, never displayed directly — `data/workout-plans.js`'s
// DIFFICULTY_RANK relies on these staying constant across locales. Only
// getDifficultyLabel's output is locale-dependent.
export const DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"];

const LABELS = {
  beginner: { es: "Principiante", en: "Beginner" },
  intermediate: { es: "Intermedio", en: "Intermediate" },
  advanced: { es: "Avanzado", en: "Advanced" },
};

export function getDifficultyLabel(difficulty, locale) {
  return LABELS[difficulty]?.[locale] ?? LABELS[difficulty]?.es ?? difficulty;
}
