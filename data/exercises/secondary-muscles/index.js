import { MUSCLES } from "../../muscles";

// Join table: Exercise <-> Muscle (many-to-many, role = "secondary").
export const EXERCISE_SECONDARY_MUSCLES = [
  { exerciseId: "press-inclinado-mancuernas", muscleId: MUSCLES.TRICEPS.id },
  { exerciseId: "press-inclinado-mancuernas", muscleId: MUSCLES.DELTOIDE_ANTERIOR.id },
  { exerciseId: "press-plano-maquina", muscleId: MUSCLES.TRICEPS.id },
  { exerciseId: "press-plano-maquina", muscleId: MUSCLES.DELTOIDE_ANTERIOR.id },
  { exerciseId: "aperturas-polea", muscleId: MUSCLES.DELTOIDE_ANTERIOR.id },
  { exerciseId: "fondos-asistidos", muscleId: MUSCLES.TRICEPS.id },
  { exerciseId: "fondos-asistidos", muscleId: MUSCLES.DELTOIDE_ANTERIOR.id },
  { exerciseId: "extension-triceps-cuerda", muscleId: MUSCLES.ANTEBRAZO.id },
  { exerciseId: "press-frances", muscleId: MUSCLES.DELTOIDE_ANTERIOR.id },
  { exerciseId: "jalon-al-pecho", muscleId: MUSCLES.BICEPS.id },
  { exerciseId: "jalon-al-pecho", muscleId: MUSCLES.REDONDO_MAYOR.id },
  { exerciseId: "jalon-agarre-cerrado", muscleId: MUSCLES.BICEPS.id },
  { exerciseId: "jalon-agarre-cerrado", muscleId: MUSCLES.DORSAL_MEDIO.id },
  { exerciseId: "remo-sentado-maquina", muscleId: MUSCLES.ROMBOIDES.id },
  { exerciseId: "remo-sentado-maquina", muscleId: MUSCLES.BICEPS.id },
  { exerciseId: "pullover-polea", muscleId: MUSCLES.SERRATO.id },
  // curl-predicador has no secondary muscles today (none recorded on purpose).
  { exerciseId: "curl-martillo", muscleId: MUSCLES.BRAQUIAL.id },
  { exerciseId: "curl-martillo", muscleId: MUSCLES.ANTEBRAZO.id },

  { exerciseId: "press-militar-mancuernas", muscleId: MUSCLES.DELTOIDE_LATERAL.id },
  { exerciseId: "press-militar-mancuernas", muscleId: MUSCLES.TRICEPS.id },
  { exerciseId: "press-hombros-maquina", muscleId: MUSCLES.DELTOIDE_LATERAL.id },
  { exerciseId: "press-hombros-maquina", muscleId: MUSCLES.TRICEPS.id },
  { exerciseId: "face-pull-polea", muscleId: MUSCLES.ROMBOIDES.id },
  // elevaciones-laterales-mancuernas has no secondary muscles today (none recorded on purpose).
  { exerciseId: "curl-barra", muscleId: MUSCLES.ANTEBRAZO.id },
  // curl-concentrado has no secondary muscles today (none recorded on purpose).
];

export function getSecondaryMuscleIdsForExercise(exerciseId) {
  return EXERCISE_SECONDARY_MUSCLES.filter((row) => row.exerciseId === exerciseId).map(
    (row) => row.muscleId,
  );
}
