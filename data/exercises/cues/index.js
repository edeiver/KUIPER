// Child table: ordered short execution cues per exercise (one-to-many).
export const EXERCISE_CUES = [
  { exerciseId: "press-inclinado-mancuernas", order: 1, text: "Hombros pegados al banco" },
  { exerciseId: "press-inclinado-mancuernas", order: 2, text: "Baja en 3 segundos" },
  { exerciseId: "press-inclinado-mancuernas", order: 3, text: "Pausa abajo sin rebotar" },
  { exerciseId: "press-inclinado-mancuernas", order: 4, text: "Empuja con pecho, no con hombros" },

  { exerciseId: "press-plano-maquina", order: 1, text: "Espalda pegada al respaldo" },
  { exerciseId: "press-plano-maquina", order: 2, text: "Empuje en línea recta" },
  { exerciseId: "press-plano-maquina", order: 3, text: "Controla el regreso" },
  { exerciseId: "press-plano-maquina", order: 4, text: "Sin bloquear codos" },

  { exerciseId: "aperturas-polea", order: 1, text: "Codo con quiebre fijo" },
  { exerciseId: "aperturas-polea", order: 2, text: "Arco amplio, no press" },
  { exerciseId: "aperturas-polea", order: 3, text: "Aprieta el pecho arriba" },
  { exerciseId: "aperturas-polea", order: 4, text: "Estiramiento controlado" },

  { exerciseId: "fondos-asistidos", order: 1, text: "Torso inclinado al frente" },
  { exerciseId: "fondos-asistidos", order: 2, text: "Baja hasta hombro-codo" },
  { exerciseId: "fondos-asistidos", order: 3, text: "No colapses abajo" },
  { exerciseId: "fondos-asistidos", order: 4, text: "Empuje controlado arriba" },

  { exerciseId: "extension-triceps-cuerda", order: 1, text: "Codos pegados al torso" },
  { exerciseId: "extension-triceps-cuerda", order: 2, text: "Extensión completa" },
  { exerciseId: "extension-triceps-cuerda", order: 3, text: "Separa al final" },
  { exerciseId: "extension-triceps-cuerda", order: 4, text: "Regreso controlado" },

  { exerciseId: "press-frances", order: 1, text: "Codos apuntando al techo" },
  { exerciseId: "press-frances", order: 2, text: "Bajada controlada" },
  { exerciseId: "press-frances", order: 3, text: "Extiende solo con tríceps" },
  { exerciseId: "press-frances", order: 4, text: "Espalda apoyada" },

  { exerciseId: "jalon-al-pecho", order: 1, text: "Pecho elevado, hombros hacia atrás" },
  { exerciseId: "jalon-al-pecho", order: 2, text: "Agarre firme y uniforme" },
  { exerciseId: "jalon-al-pecho", order: 3, text: "Espalda controla el movimiento, no los brazos" },
  { exerciseId: "jalon-al-pecho", order: 4, text: "Sube el peso sin bloquear los codos" },

  { exerciseId: "jalon-agarre-cerrado", order: 1, text: "Codos pegados al cuerpo" },
  { exerciseId: "jalon-agarre-cerrado", order: 2, text: "Sin balanceo del torso" },
  { exerciseId: "jalon-agarre-cerrado", order: 3, text: "Tira con la espalda" },
  { exerciseId: "jalon-agarre-cerrado", order: 4, text: "Extensión completa arriba" },

  { exerciseId: "remo-sentado-maquina", order: 1, text: "Pecho fijo en el soporte" },
  { exerciseId: "remo-sentado-maquina", order: 2, text: "Extensión completa al frente" },
  { exerciseId: "remo-sentado-maquina", order: 3, text: "Junta los omóplatos" },
  { exerciseId: "remo-sentado-maquina", order: 4, text: "Sin impulso de cadera" },

  { exerciseId: "pullover-polea", order: 1, text: "Quiebre de codo fijo" },
  { exerciseId: "pullover-polea", order: 2, text: "Arco amplio, no jalón" },
  { exerciseId: "pullover-polea", order: 3, text: "Estiramiento completo arriba" },
  { exerciseId: "pullover-polea", order: 4, text: "Contracción abajo en los muslos" },

  { exerciseId: "curl-predicador", order: 1, text: "Brazos pegados al banco" },
  { exerciseId: "curl-predicador", order: 2, text: "Sin bloquear codos" },
  { exerciseId: "curl-predicador", order: 3, text: "Contracción total arriba" },
  { exerciseId: "curl-predicador", order: 4, text: "Bajada controlada" },

  { exerciseId: "curl-martillo", order: 1, text: "Muñeca neutra fija" },
  { exerciseId: "curl-martillo", order: 2, text: "Codos pegados al torso" },
  { exerciseId: "curl-martillo", order: 3, text: "Sin balanceo" },
  { exerciseId: "curl-martillo", order: 4, text: "Bajada controlada" },

  { exerciseId: "press-militar-mancuernas", order: 1, text: "Core firme" },
  { exerciseId: "press-militar-mancuernas", order: 2, text: "Empuje en línea recta" },
  { exerciseId: "press-militar-mancuernas", order: 3, text: "Sin chocar arriba" },
  { exerciseId: "press-militar-mancuernas", order: 4, text: "Bajada controlada" },

  { exerciseId: "press-hombros-maquina", order: 1, text: "Asiento a la altura correcta" },
  { exerciseId: "press-hombros-maquina", order: 2, text: "Espalda pegada al respaldo" },
  { exerciseId: "press-hombros-maquina", order: 3, text: "Empuje controlado" },
  { exerciseId: "press-hombros-maquina", order: 4, text: "Regreso sin soltar" },

  { exerciseId: "face-pull-polea", order: 1, text: "Codos altos" },
  { exerciseId: "face-pull-polea", order: 2, text: "Tira hacia la cara" },
  { exerciseId: "face-pull-polea", order: 3, text: "Separa al final" },
  { exerciseId: "face-pull-polea", order: 4, text: "Regreso con tensión" },

  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, text: "Codos lideran el movimiento" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, text: "Hasta la altura del hombro" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 3, text: "Sin encoger hombros" },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 4, text: "Bajada controlada" },

  { exerciseId: "curl-barra", order: 1, text: "Codos fijos al torso" },
  { exerciseId: "curl-barra", order: 2, text: "Sin balanceo" },
  { exerciseId: "curl-barra", order: 3, text: "Contracción total arriba" },
  { exerciseId: "curl-barra", order: 4, text: "Extensión casi completa abajo" },

  { exerciseId: "curl-concentrado", order: 1, text: "Codo fijo en el muslo" },
  { exerciseId: "curl-concentrado", order: 2, text: "Muñeca controlada" },
  { exerciseId: "curl-concentrado", order: 3, text: "Contracción total arriba" },
  { exerciseId: "curl-concentrado", order: 4, text: "Extensión casi completa abajo" },
];

export function getCuesForExercise(exerciseId) {
  return EXERCISE_CUES.filter((row) => row.exerciseId === exerciseId)
    .sort((a, b) => a.order - b.order)
    .map((row) => row.text);
}
