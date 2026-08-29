// Label text for alternatives that don't have a resolvable catalog entry yet
// (alternativeExerciseId === null in ./index.js) — one row per
// (exerciseId, order, locale). Resolvable alternatives don't need an entry
// here: their display name is derived from the target exercise's own
// translated catalog name in repository.js.
export const EXERCISE_ALTERNATIVE_LABELS = [
  { exerciseId: "press-inclinado-mancuernas", order: 1, locale: "es", label: "Press inclinado en máquina Smith" },
  { exerciseId: "press-inclinado-mancuernas", order: 2, locale: "es", label: "Press inclinado en máquina selectorizada de pecho" },
  { exerciseId: "press-inclinado-mancuernas", order: 3, locale: "es", label: "Aperturas inclinadas con mancuernas" },
  { exerciseId: "press-inclinado-mancuernas", order: 1, locale: "en", label: "Smith machine incline press" },
  { exerciseId: "press-inclinado-mancuernas", order: 2, locale: "en", label: "Incline press on a selectorized chest machine" },
  { exerciseId: "press-inclinado-mancuernas", order: 3, locale: "en", label: "Incline dumbbell fly" },

  { exerciseId: "press-plano-maquina", order: 1, locale: "es", label: "Press plano con barra" },
  { exerciseId: "press-plano-maquina", order: 2, locale: "es", label: "Press plano con mancuernas" },
  { exerciseId: "press-plano-maquina", order: 3, locale: "es", label: "Press en máquina Smith" },
  { exerciseId: "press-plano-maquina", order: 1, locale: "en", label: "Flat barbell bench press" },
  { exerciseId: "press-plano-maquina", order: 2, locale: "en", label: "Flat dumbbell bench press" },
  { exerciseId: "press-plano-maquina", order: 3, locale: "en", label: "Smith machine press" },

  { exerciseId: "aperturas-polea", order: 1, locale: "es", label: "Aperturas en máquina Pec Deck" },
  { exerciseId: "aperturas-polea", order: 2, locale: "es", label: "Aperturas con mancuernas en banco plano" },
  { exerciseId: "aperturas-polea", order: 3, locale: "es", label: "Crossover en polea baja" },
  { exerciseId: "aperturas-polea", order: 1, locale: "en", label: "Pec deck fly" },
  { exerciseId: "aperturas-polea", order: 2, locale: "en", label: "Flat bench dumbbell fly" },
  { exerciseId: "aperturas-polea", order: 3, locale: "en", label: "Low cable crossover" },

  { exerciseId: "fondos-asistidos", order: 1, locale: "es", label: "Fondos en banco con peso corporal" },
  { exerciseId: "fondos-asistidos", order: 2, locale: "es", label: "Press declinado en máquina" },
  { exerciseId: "fondos-asistidos", order: 3, locale: "es", label: "Flexiones con lastre" },
  { exerciseId: "fondos-asistidos", order: 1, locale: "en", label: "Bodyweight bench dips" },
  { exerciseId: "fondos-asistidos", order: 2, locale: "en", label: "Machine decline press" },
  { exerciseId: "fondos-asistidos", order: 3, locale: "en", label: "Weighted push-ups" },

  { exerciseId: "extension-triceps-cuerda", order: 1, locale: "es", label: "Extensión de tríceps en polea con barra recta" },
  { exerciseId: "extension-triceps-cuerda", order: 2, locale: "es", label: "Patada de tríceps con mancuerna" },
  { exerciseId: "extension-triceps-cuerda", order: 3, locale: "es", label: "Extensión en máquina de tríceps" },
  { exerciseId: "extension-triceps-cuerda", order: 1, locale: "en", label: "Straight-bar cable triceps extension" },
  { exerciseId: "extension-triceps-cuerda", order: 2, locale: "en", label: "Dumbbell triceps kickback" },
  { exerciseId: "extension-triceps-cuerda", order: 3, locale: "en", label: "Machine triceps extension" },

  { exerciseId: "press-frances", order: 1, locale: "es", label: "Press francés con mancuernas" },
  { exerciseId: "press-frances", order: 3, locale: "es", label: "Press francés en máquina" },
  { exerciseId: "press-frances", order: 1, locale: "en", label: "Dumbbell skull crusher" },
  { exerciseId: "press-frances", order: 3, locale: "en", label: "Machine skull crusher" },

  { exerciseId: "jalon-al-pecho", order: 1, locale: "es", label: "Jalón en máquina convergente" },
  { exerciseId: "jalon-al-pecho", order: 2, locale: "es", label: "Dominadas asistidas en máquina" },
  { exerciseId: "jalon-al-pecho", order: 3, locale: "es", label: "Jalón neutro en polea" },
  { exerciseId: "jalon-al-pecho", order: 1, locale: "en", label: "Converging pulldown machine" },
  { exerciseId: "jalon-al-pecho", order: 2, locale: "en", label: "Assisted machine pull-ups" },
  { exerciseId: "jalon-al-pecho", order: 3, locale: "en", label: "Neutral-grip cable pulldown" },

  { exerciseId: "jalon-agarre-cerrado", order: 1, locale: "es", label: "Jalón unilateral en polea" },
  { exerciseId: "jalon-agarre-cerrado", order: 2, locale: "es", label: "Jalón neutro en máquina" },
  { exerciseId: "jalon-agarre-cerrado", order: 3, locale: "es", label: "Remo en polea con agarre cerrado" },
  { exerciseId: "jalon-agarre-cerrado", order: 1, locale: "en", label: "Single-arm cable pulldown" },
  { exerciseId: "jalon-agarre-cerrado", order: 2, locale: "en", label: "Neutral-grip machine pulldown" },
  { exerciseId: "jalon-agarre-cerrado", order: 3, locale: "en", label: "Close-grip cable row" },

  { exerciseId: "remo-sentado-maquina", order: 1, locale: "es", label: "Remo en máquina Hammer Strength" },
  { exerciseId: "remo-sentado-maquina", order: 2, locale: "es", label: "Remo en polea baja con barra" },
  { exerciseId: "remo-sentado-maquina", order: 3, locale: "es", label: "Remo unilateral en polea" },
  { exerciseId: "remo-sentado-maquina", order: 1, locale: "en", label: "Hammer Strength row machine" },
  { exerciseId: "remo-sentado-maquina", order: 2, locale: "en", label: "Low cable row with bar" },
  { exerciseId: "remo-sentado-maquina", order: 3, locale: "en", label: "Single-arm cable row" },

  { exerciseId: "pullover-polea", order: 1, locale: "es", label: "Pullover con mancuerna en banco" },
  { exerciseId: "pullover-polea", order: 2, locale: "es", label: "Pullover en máquina" },
  { exerciseId: "pullover-polea", order: 3, locale: "es", label: "Jalón dorsal con brazos extendidos en polea" },
  { exerciseId: "pullover-polea", order: 1, locale: "en", label: "Dumbbell pullover on a bench" },
  { exerciseId: "pullover-polea", order: 2, locale: "en", label: "Machine pullover" },
  { exerciseId: "pullover-polea", order: 3, locale: "en", label: "Straight-arm cable pulldown" },

  { exerciseId: "curl-predicador", order: 1, locale: "es", label: "Curl en máquina Scott" },
  { exerciseId: "curl-predicador", order: 2, locale: "es", label: "Curl con mancuerna en banco inclinado" },
  { exerciseId: "curl-predicador", order: 3, locale: "es", label: "Curl en polea baja con barra recta" },
  { exerciseId: "curl-predicador", order: 1, locale: "en", label: "Preacher curl machine" },
  { exerciseId: "curl-predicador", order: 2, locale: "en", label: "Incline bench dumbbell curl" },
  { exerciseId: "curl-predicador", order: 3, locale: "en", label: "Low cable straight-bar curl" },

  { exerciseId: "curl-martillo", order: 1, locale: "es", label: "Martillo en polea con cuerda" },
  { exerciseId: "curl-martillo", order: 2, locale: "es", label: "Curl martillo alterno en banco" },
  { exerciseId: "curl-martillo", order: 3, locale: "es", label: "Curl de antebrazo en máquina" },
  { exerciseId: "curl-martillo", order: 1, locale: "en", label: "Cable rope hammer curl" },
  { exerciseId: "curl-martillo", order: 2, locale: "en", label: "Alternating hammer curl on a bench" },
  { exerciseId: "curl-martillo", order: 3, locale: "en", label: "Machine forearm curl" },

  { exerciseId: "press-militar-mancuernas", order: 1, locale: "es", label: "Press militar con barra" },
  { exerciseId: "press-militar-mancuernas", order: 2, locale: "es", label: "Press Arnold con mancuernas" },
  { exerciseId: "press-militar-mancuernas", order: 1, locale: "en", label: "Barbell overhead press" },
  { exerciseId: "press-militar-mancuernas", order: 2, locale: "en", label: "Dumbbell Arnold press" },

  { exerciseId: "press-hombros-maquina", order: 1, locale: "es", label: "Press militar con barra" },
  { exerciseId: "press-hombros-maquina", order: 2, locale: "es", label: "Press Arnold con mancuernas" },
  { exerciseId: "press-hombros-maquina", order: 1, locale: "en", label: "Barbell overhead press" },
  { exerciseId: "press-hombros-maquina", order: 2, locale: "en", label: "Dumbbell Arnold press" },

  { exerciseId: "face-pull-polea", order: 1, locale: "es", label: "Face pull con banda elástica" },
  { exerciseId: "face-pull-polea", order: 2, locale: "es", label: "Remo al mentón en polea" },
  { exerciseId: "face-pull-polea", order: 1, locale: "en", label: "Band face pull" },
  { exerciseId: "face-pull-polea", order: 2, locale: "en", label: "Cable upright row" },

  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, locale: "es", label: "Elevaciones laterales en polea" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, locale: "es", label: "Elevaciones laterales en máquina" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, locale: "en", label: "Cable lateral raise" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, locale: "en", label: "Machine lateral raise" },

  { exerciseId: "curl-barra", order: 1, locale: "es", label: "Curl con barra EZ" },
  { exerciseId: "curl-barra", order: 2, locale: "es", label: "Curl con mancuernas de pie" },
  { exerciseId: "curl-barra", order: 3, locale: "es", label: "Curl en polea baja con barra recta" },
  { exerciseId: "curl-barra", order: 1, locale: "en", label: "EZ-bar curl" },
  { exerciseId: "curl-barra", order: 2, locale: "en", label: "Standing dumbbell curl" },
  { exerciseId: "curl-barra", order: 3, locale: "en", label: "Low cable straight-bar curl" },

  { exerciseId: "curl-concentrado", order: 1, locale: "es", label: "Curl concentrado en polea baja" },
  { exerciseId: "curl-concentrado", order: 2, locale: "es", label: "Curl predicador con mancuerna" },
  { exerciseId: "curl-concentrado", order: 1, locale: "en", label: "Low cable concentration curl" },
  { exerciseId: "curl-concentrado", order: 2, locale: "en", label: "Dumbbell preacher curl" },
];

export function getAlternativeLabel(exerciseId, order, locale) {
  const row =
    EXERCISE_ALTERNATIVE_LABELS.find(
      (item) => item.exerciseId === exerciseId && item.order === order && item.locale === locale,
    ) ??
    EXERCISE_ALTERNATIVE_LABELS.find(
      (item) => item.exerciseId === exerciseId && item.order === order && item.locale === "es",
    );

  return row?.label ?? null;
}
