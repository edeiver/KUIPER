// Self-relation join table: Exercise -> alternative Exercise.
// `alternativeExerciseId` is nullable on purpose: none of these alternatives
// exist yet as their own catalog rows, so today they're a text `label` only.
// Once an alternative is added to EXERCISE_CATALOG, set alternativeExerciseId
// to its id — no shape change needed, this is exactly how the row is meant
// to resolve once the target exists.
export const EXERCISE_ALTERNATIVES = [
  { exerciseId: "press-inclinado-mancuernas", order: 1, alternativeExerciseId: null, label: "Press inclinado en máquina Smith" },
  { exerciseId: "press-inclinado-mancuernas", order: 2, alternativeExerciseId: null, label: "Press inclinado en máquina selectorizada de pecho" },
  { exerciseId: "press-inclinado-mancuernas", order: 3, alternativeExerciseId: null, label: "Aperturas inclinadas con mancuernas" },

  { exerciseId: "press-plano-maquina", order: 1, alternativeExerciseId: null, label: "Press plano con barra" },
  { exerciseId: "press-plano-maquina", order: 2, alternativeExerciseId: null, label: "Press plano con mancuernas" },
  { exerciseId: "press-plano-maquina", order: 3, alternativeExerciseId: null, label: "Press en máquina Smith" },

  { exerciseId: "aperturas-polea", order: 1, alternativeExerciseId: null, label: "Aperturas en máquina Pec Deck" },
  { exerciseId: "aperturas-polea", order: 2, alternativeExerciseId: null, label: "Aperturas con mancuernas en banco plano" },
  { exerciseId: "aperturas-polea", order: 3, alternativeExerciseId: null, label: "Crossover en polea baja" },

  { exerciseId: "fondos-asistidos", order: 1, alternativeExerciseId: null, label: "Fondos en banco con peso corporal" },
  { exerciseId: "fondos-asistidos", order: 2, alternativeExerciseId: null, label: "Press declinado en máquina" },
  { exerciseId: "fondos-asistidos", order: 3, alternativeExerciseId: null, label: "Flexiones con lastre" },

  { exerciseId: "extension-triceps-cuerda", order: 1, alternativeExerciseId: null, label: "Extensión de tríceps en polea con barra recta" },
  { exerciseId: "extension-triceps-cuerda", order: 2, alternativeExerciseId: null, label: "Patada de tríceps con mancuerna" },
  { exerciseId: "extension-triceps-cuerda", order: 3, alternativeExerciseId: null, label: "Extensión en máquina de tríceps" },
  { exerciseId: "extension-triceps-cuerda", order: 4, alternativeExerciseId: "press-frances", label: "Press francés" },

  { exerciseId: "press-frances", order: 1, alternativeExerciseId: null, label: "Press francés con mancuernas" },
  { exerciseId: "press-frances", order: 2, alternativeExerciseId: "extension-triceps-cuerda", label: "Extensión de tríceps en cuerda" },
  { exerciseId: "press-frances", order: 3, alternativeExerciseId: null, label: "Press francés en máquina" },

  { exerciseId: "jalon-al-pecho", order: 1, alternativeExerciseId: null, label: "Jalón en máquina convergente" },
  { exerciseId: "jalon-al-pecho", order: 2, alternativeExerciseId: null, label: "Dominadas asistidas en máquina" },
  { exerciseId: "jalon-al-pecho", order: 3, alternativeExerciseId: null, label: "Jalón neutro en polea" },
  { exerciseId: "jalon-al-pecho", order: 4, alternativeExerciseId: "jalon-agarre-cerrado", label: "Jalón agarre cerrado (triángulo)" },

  { exerciseId: "jalon-agarre-cerrado", order: 1, alternativeExerciseId: null, label: "Jalón unilateral en polea" },
  { exerciseId: "jalon-agarre-cerrado", order: 2, alternativeExerciseId: null, label: "Jalón neutro en máquina" },
  { exerciseId: "jalon-agarre-cerrado", order: 3, alternativeExerciseId: null, label: "Remo en polea con agarre cerrado" },
  { exerciseId: "jalon-agarre-cerrado", order: 4, alternativeExerciseId: "jalon-al-pecho", label: "Jalón al pecho" },

  { exerciseId: "remo-sentado-maquina", order: 1, alternativeExerciseId: null, label: "Remo en máquina Hammer Strength" },
  { exerciseId: "remo-sentado-maquina", order: 2, alternativeExerciseId: null, label: "Remo en polea baja con barra" },
  { exerciseId: "remo-sentado-maquina", order: 3, alternativeExerciseId: null, label: "Remo unilateral en polea" },

  { exerciseId: "pullover-polea", order: 1, alternativeExerciseId: null, label: "Pullover con mancuerna en banco" },
  { exerciseId: "pullover-polea", order: 2, alternativeExerciseId: null, label: "Pullover en máquina" },
  { exerciseId: "pullover-polea", order: 3, alternativeExerciseId: null, label: "Jalón dorsal con brazos extendidos en polea" },

  { exerciseId: "curl-predicador", order: 1, alternativeExerciseId: null, label: "Curl en máquina Scott" },
  { exerciseId: "curl-predicador", order: 2, alternativeExerciseId: null, label: "Curl con mancuerna en banco inclinado" },
  { exerciseId: "curl-predicador", order: 3, alternativeExerciseId: null, label: "Curl en polea baja con barra recta" },

  { exerciseId: "curl-martillo", order: 1, alternativeExerciseId: null, label: "Martillo en polea con cuerda" },
  { exerciseId: "curl-martillo", order: 2, alternativeExerciseId: null, label: "Curl martillo alterno en banco" },
  { exerciseId: "curl-martillo", order: 3, alternativeExerciseId: null, label: "Curl de antebrazo en máquina" },

  { exerciseId: "press-militar-mancuernas", order: 1, alternativeExerciseId: null, label: "Press militar con barra" },
  { exerciseId: "press-militar-mancuernas", order: 2, alternativeExerciseId: null, label: "Press Arnold con mancuernas" },

  { exerciseId: "press-hombros-maquina", order: 1, alternativeExerciseId: null, label: "Press militar con barra" },
  { exerciseId: "press-hombros-maquina", order: 2, alternativeExerciseId: null, label: "Press Arnold con mancuernas" },

  { exerciseId: "face-pull-polea", order: 1, alternativeExerciseId: null, label: "Face pull con banda elástica" },
  { exerciseId: "face-pull-polea", order: 2, alternativeExerciseId: null, label: "Remo al mentón en polea" },

  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, alternativeExerciseId: null, label: "Elevaciones laterales en polea" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, alternativeExerciseId: null, label: "Elevaciones laterales en máquina" },

  { exerciseId: "curl-barra", order: 1, alternativeExerciseId: null, label: "Curl con barra EZ" },
  { exerciseId: "curl-barra", order: 2, alternativeExerciseId: null, label: "Curl con mancuernas de pie" },
  { exerciseId: "curl-barra", order: 3, alternativeExerciseId: null, label: "Curl en polea baja con barra recta" },

  { exerciseId: "curl-concentrado", order: 1, alternativeExerciseId: null, label: "Curl concentrado en polea baja" },
  { exerciseId: "curl-concentrado", order: 2, alternativeExerciseId: null, label: "Curl predicador con mancuerna" },
];

export function getAlternativesForExercise(exerciseId) {
  return EXERCISE_ALTERNATIVES.filter((row) => row.exerciseId === exerciseId)
    .sort((a, b) => a.order - b.order)
    .map((row) => row.label);
}

export function getAlternativeRowsForExercise(exerciseId) {
  return EXERCISE_ALTERNATIVES.filter((row) => row.exerciseId === exerciseId).sort(
    (a, b) => a.order - b.order,
  );
}
