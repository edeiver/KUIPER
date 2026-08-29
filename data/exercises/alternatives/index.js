// Self-relation join table: Exercise -> alternative Exercise.
// `alternativeExerciseId` is nullable on purpose: none of these alternatives
// exist yet as their own catalog rows, so today they're a text label only —
// see ./translations.js for that label per locale. Once an alternative is
// added to EXERCISE_CATALOG, set alternativeExerciseId to its id and drop
// its translations.js row: the display name is then derived from the
// target's own translated catalog name (see repository.js), so the two
// copies of the same text never need to be kept in sync.
export const EXERCISE_ALTERNATIVES = [
  { exerciseId: "press-inclinado-mancuernas", order: 1, alternativeExerciseId: null },
  { exerciseId: "press-inclinado-mancuernas", order: 2, alternativeExerciseId: null },
  { exerciseId: "press-inclinado-mancuernas", order: 3, alternativeExerciseId: null },

  { exerciseId: "press-plano-maquina", order: 1, alternativeExerciseId: null },
  { exerciseId: "press-plano-maquina", order: 2, alternativeExerciseId: null },
  { exerciseId: "press-plano-maquina", order: 3, alternativeExerciseId: null },

  { exerciseId: "aperturas-polea", order: 1, alternativeExerciseId: null },
  { exerciseId: "aperturas-polea", order: 2, alternativeExerciseId: null },
  { exerciseId: "aperturas-polea", order: 3, alternativeExerciseId: null },

  { exerciseId: "fondos-asistidos", order: 1, alternativeExerciseId: null },
  { exerciseId: "fondos-asistidos", order: 2, alternativeExerciseId: null },
  { exerciseId: "fondos-asistidos", order: 3, alternativeExerciseId: null },

  { exerciseId: "extension-triceps-cuerda", order: 1, alternativeExerciseId: null },
  { exerciseId: "extension-triceps-cuerda", order: 2, alternativeExerciseId: null },
  { exerciseId: "extension-triceps-cuerda", order: 3, alternativeExerciseId: null },
  { exerciseId: "extension-triceps-cuerda", order: 4, alternativeExerciseId: "press-frances" },

  { exerciseId: "press-frances", order: 1, alternativeExerciseId: null },
  { exerciseId: "press-frances", order: 2, alternativeExerciseId: "extension-triceps-cuerda" },
  { exerciseId: "press-frances", order: 3, alternativeExerciseId: null },

  { exerciseId: "jalon-al-pecho", order: 1, alternativeExerciseId: null },
  { exerciseId: "jalon-al-pecho", order: 2, alternativeExerciseId: null },
  { exerciseId: "jalon-al-pecho", order: 3, alternativeExerciseId: null },
  { exerciseId: "jalon-al-pecho", order: 4, alternativeExerciseId: "jalon-agarre-cerrado" },

  { exerciseId: "jalon-agarre-cerrado", order: 1, alternativeExerciseId: null },
  { exerciseId: "jalon-agarre-cerrado", order: 2, alternativeExerciseId: null },
  { exerciseId: "jalon-agarre-cerrado", order: 3, alternativeExerciseId: null },
  { exerciseId: "jalon-agarre-cerrado", order: 4, alternativeExerciseId: "jalon-al-pecho" },

  { exerciseId: "remo-sentado-maquina", order: 1, alternativeExerciseId: null },
  { exerciseId: "remo-sentado-maquina", order: 2, alternativeExerciseId: null },
  { exerciseId: "remo-sentado-maquina", order: 3, alternativeExerciseId: null },

  { exerciseId: "pullover-polea", order: 1, alternativeExerciseId: null },
  { exerciseId: "pullover-polea", order: 2, alternativeExerciseId: null },
  { exerciseId: "pullover-polea", order: 3, alternativeExerciseId: null },

  { exerciseId: "curl-predicador", order: 1, alternativeExerciseId: null },
  { exerciseId: "curl-predicador", order: 2, alternativeExerciseId: null },
  { exerciseId: "curl-predicador", order: 3, alternativeExerciseId: null },

  { exerciseId: "curl-martillo", order: 1, alternativeExerciseId: null },
  { exerciseId: "curl-martillo", order: 2, alternativeExerciseId: null },
  { exerciseId: "curl-martillo", order: 3, alternativeExerciseId: null },

  { exerciseId: "press-militar-mancuernas", order: 1, alternativeExerciseId: null },
  { exerciseId: "press-militar-mancuernas", order: 2, alternativeExerciseId: null },

  { exerciseId: "press-hombros-maquina", order: 1, alternativeExerciseId: null },
  { exerciseId: "press-hombros-maquina", order: 2, alternativeExerciseId: null },

  { exerciseId: "face-pull-polea", order: 1, alternativeExerciseId: null },
  { exerciseId: "face-pull-polea", order: 2, alternativeExerciseId: null },

  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, alternativeExerciseId: null },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, alternativeExerciseId: null },

  { exerciseId: "curl-barra", order: 1, alternativeExerciseId: null },
  { exerciseId: "curl-barra", order: 2, alternativeExerciseId: null },
  { exerciseId: "curl-barra", order: 3, alternativeExerciseId: null },

  { exerciseId: "curl-concentrado", order: 1, alternativeExerciseId: null },
  { exerciseId: "curl-concentrado", order: 2, alternativeExerciseId: null },
];

export function getAlternativeRowsForExercise(exerciseId) {
  return EXERCISE_ALTERNATIVES.filter((row) => row.exerciseId === exerciseId).sort(
    (a, b) => a.order - b.order,
  );
}
