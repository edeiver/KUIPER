import { getExerciseById } from "./exercises/repository";
import { DIFFICULTY_LEVELS } from "./exercises/catalog/difficulty";

const DIFFICULTY_RANK = Object.fromEntries(DIFFICULTY_LEVELS.map((level, index) => [level, index + 1]));

// Plan title/focus per locale, keyed by the stable `slug` — the slug itself
// is never translated (see docs/11_DECISIONS.md): it's the canonical id used
// in both the route and this lookup, in every locale.
const PLAN_TRANSLATIONS = {
  "pecho-triceps": {
    es: { title: "Pecho + Tríceps", focus: "Desarrollar pecho superior y brazos." },
    en: { title: "Chest + Triceps", focus: "Build the upper chest and arms." },
  },
  "espalda-biceps": {
    es: { title: "Espalda + Bíceps", focus: "Construir fuerza de tracción y densidad." },
    en: { title: "Back + Biceps", focus: "Build pulling strength and back density." },
  },
  "hombro-biceps": {
    es: { title: "Hombro + Bíceps", focus: "Desarrollar amplitud de hombro y fuerza de brazo." },
    en: { title: "Shoulders + Biceps", focus: "Build shoulder width and arm strength." },
  },
};

function getPlanTranslation(slug, locale) {
  return PLAN_TRANSLATIONS[slug]?.[locale] ?? PLAN_TRANSLATIONS[slug]?.es;
}

// Exported so a live session can re-resolve a different exerciseId against
// the SAME day's prescription (sets/reps/rir/weight) when the user switches
// to an equivalent alternative — reuses this merge instead of duplicating it.
export function resolveExercise(entry, locale) {
  const exercise = getExerciseById(entry.exerciseId, locale);

  if (!exercise) {
    throw new Error(`Exercise not found in catalog: ${entry.exerciseId}`);
  }

  return {
    exerciseId: exercise.id,
    name: exercise.name,
    objective: exercise.objective,
    weight: entry.weight,
    sets: entry.sets,
    reps: entry.reps,
    repsCompleted: entry.repsCompleted,
    rir: entry.rir,
    tempo: exercise.tempo,
    restSeconds: exercise.recommendedRestSeconds,
    coach: exercise.executionTip,
    difficulty: exercise.difficulty,
    rangeOfMotion: exercise.rangeOfMotion,
    muscles: {
      primary: exercise.primaryMuscleName,
      secondary: exercise.secondaryMuscleNames.join(", ") || "—",
    },
    alternatives: exercise.alternatives,
    anatomyNote: exercise.anatomyNote,
    technique: {
      steps: exercise.instructions,
      mistakes: exercise.commonMistakes,
      cues: exercise.cues,
    },
  };
}

function resolvePlan(rawPlan, locale) {
  const translation = getPlanTranslation(rawPlan.slug, locale);

  return {
    title: translation.title,
    slug: rawPlan.slug,
    focus: translation.focus,
    estimatedDurationMinutes: rawPlan.estimatedDurationMinutes,
    exercises: [...rawPlan.exercises]
      .sort((a, b) => a.order - b.order)
      .map((entry) => resolveExercise(entry, locale)),
  };
}

// Single source of truth for anything a screen wants to display ABOUT a
// plan (not the live-session detail) — exerciseCount/totalVolume/difficulty
// are derived from real exercise data, never hand-typed, so they can never
// drift from the actual prescription the way a hardcoded stat can.
export function getWorkoutSummary(plan) {
  const exerciseCount = plan.exercises.length;
  const totalVolume = plan.exercises.reduce(
    (sum, exercise) => sum + exercise.sets * exercise.weight * exercise.repsCompleted,
    0,
  );
  const highestRank = Math.max(
    ...plan.exercises.map((exercise) => DIFFICULTY_RANK[exercise.difficulty] ?? 1),
  );
  const difficulty = Object.keys(DIFFICULTY_RANK).find(
    (key) => DIFFICULTY_RANK[key] === highestRank,
  );

  return {
    title: plan.title,
    slug: plan.slug,
    focus: plan.focus,
    estimatedDurationMinutes: plan.estimatedDurationMinutes,
    exerciseCount,
    totalVolume,
    difficulty,
  };
}

// Junction rows: WorkoutPlan (1) -> WorkoutPlanExercise (many) -> Exercise.
// `order` is explicit (not implicit array position) because a relational
// table has no guaranteed row order without a sort column.
const pechoTricepsRaw = {
  slug: "pecho-triceps",
  estimatedDurationMinutes: 75,
  exercises: [
    { order: 1, exerciseId: "press-inclinado-mancuernas", sets: 4, reps: "8 - 10", rir: "2", weight: 24, repsCompleted: 10 },
    { order: 2, exerciseId: "press-plano-maquina", sets: 4, reps: "8 - 10", rir: "2", weight: 30, repsCompleted: 10 },
    { order: 3, exerciseId: "aperturas-polea", sets: 3, reps: "12 - 15", rir: "2", weight: 14, repsCompleted: 12 },
    { order: 4, exerciseId: "fondos-asistidos", sets: 3, reps: "8 - 12", rir: "1 - 2", weight: 18, repsCompleted: 10 },
    { order: 5, exerciseId: "extension-triceps-cuerda", sets: 3, reps: "10 - 12", rir: "2", weight: 18, repsCompleted: 12 },
    { order: 6, exerciseId: "press-frances", sets: 3, reps: "10 - 12", rir: "1 - 2", weight: 16, repsCompleted: 10 },
  ],
};

const espaldaBicepsRaw = {
  slug: "espalda-biceps",
  estimatedDurationMinutes: 70,
  exercises: [
    { order: 1, exerciseId: "jalon-al-pecho", sets: 4, reps: "8 - 10", rir: "2", weight: 45, repsCompleted: 10 },
    { order: 2, exerciseId: "jalon-agarre-cerrado", sets: 3, reps: "10 - 12", rir: "1 - 2", weight: 35, repsCompleted: 12 },
    { order: 3, exerciseId: "remo-sentado-maquina", sets: 4, reps: "8 - 10", rir: "2", weight: 40, repsCompleted: 10 },
    { order: 4, exerciseId: "pullover-polea", sets: 3, reps: "12 - 15", rir: "1 - 2", weight: 20, repsCompleted: 12 },
    { order: 5, exerciseId: "curl-predicador", sets: 3, reps: "10 - 12", rir: "1 - 2", weight: 14, repsCompleted: 12 },
    { order: 6, exerciseId: "curl-martillo", sets: 3, reps: "10 - 12", rir: "1 - 2", weight: 12, repsCompleted: 10 },
  ],
};

const hombroBicepsRaw = {
  slug: "hombro-biceps",
  estimatedDurationMinutes: 65,
  exercises: [
    { order: 1, exerciseId: "press-militar-mancuernas", sets: 4, reps: "8 - 10", rir: "2", weight: 16, repsCompleted: 10 },
    { order: 2, exerciseId: "press-hombros-maquina", sets: 3, reps: "10 - 12", rir: "2", weight: 30, repsCompleted: 10 },
    { order: 3, exerciseId: "face-pull-polea", sets: 3, reps: "12 - 15", rir: "1 - 2", weight: 18, repsCompleted: 12 },
    { order: 4, exerciseId: "elevaciones-laterales-mancuernas", sets: 3, reps: "12 - 15", rir: "1 - 2", weight: 8, repsCompleted: 12 },
    { order: 5, exerciseId: "curl-barra", sets: 3, reps: "8 - 10", rir: "2", weight: 20, repsCompleted: 10 },
    { order: 6, exerciseId: "curl-concentrado", sets: 3, reps: "10 - 12", rir: "1 - 2", weight: 10, repsCompleted: 10 },
  ],
};

const RAW_PLANS_BY_SLUG = {
  "pecho-triceps": pechoTricepsRaw,
  "espalda-biceps": espaldaBicepsRaw,
  "hombro-biceps": hombroBicepsRaw,
};

const PLAN_SLUGS = Object.keys(RAW_PLANS_BY_SLUG);

export function getPlanBySlug(slug, locale) {
  const rawPlan = RAW_PLANS_BY_SLUG[slug];
  return rawPlan ? resolvePlan(rawPlan, locale) : null;
}

export function getAllPlans(locale) {
  return PLAN_SLUGS.map((slug) => getPlanBySlug(slug, locale));
}
