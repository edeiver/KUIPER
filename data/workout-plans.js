import { getExerciseById } from "./exercises/repository";

const DIFFICULTY_RANK = { Principiante: 1, Intermedio: 2, Avanzado: 3 };

// Exported so a live session can re-resolve a different exerciseId against
// the SAME day's prescription (sets/reps/rir/weight) when the user switches
// to an equivalent alternative — reuses this merge instead of duplicating it.
export function resolveExercise(entry) {
  const exercise = getExerciseById(entry.exerciseId);

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
      title: `${exercise.name}: técnica paso a paso`,
      steps: exercise.instructions,
      mistakes: exercise.commonMistakes,
      cues: exercise.cues,
    },
  };
}

function resolvePlan(rawPlan) {
  return {
    title: rawPlan.title,
    slug: rawPlan.slug,
    focus: rawPlan.focus,
    estimatedDurationMinutes: rawPlan.estimatedDurationMinutes,
    exercises: [...rawPlan.exercises].sort((a, b) => a.order - b.order).map(resolveExercise),
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
  title: "Pecho + Tríceps",
  slug: "pecho-triceps",
  focus: "Desarrollar pecho superior y brazos.",
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
  title: "Espalda + Bíceps",
  slug: "espalda-biceps",
  focus: "Construir fuerza de tracción y densidad.",
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
  title: "Hombro + Bíceps",
  slug: "hombro-biceps",
  focus: "Desarrollar amplitud de hombro y fuerza de brazo.",
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

export const pechoTricepsPlan = resolvePlan(pechoTricepsRaw);
export const espaldaBicepsPlan = resolvePlan(espaldaBicepsRaw);
export const hombroBicepsPlan = resolvePlan(hombroBicepsRaw);
export const ALL_PLANS = [pechoTricepsPlan, espaldaBicepsPlan, hombroBicepsPlan];
