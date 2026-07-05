// Child table: ordered technique steps per exercise (one-to-many).
export const EXERCISE_INSTRUCTIONS = [
  { exerciseId: "press-inclinado-mancuernas", order: 1, text: "Ajusta el banco entre 30 y 45 grados." },
  { exerciseId: "press-inclinado-mancuernas", order: 2, text: "Apoya hombros y espalda alta de forma estable." },
  { exerciseId: "press-inclinado-mancuernas", order: 3, text: "Baja las mancuernas en 3 segundos con control." },
  { exerciseId: "press-inclinado-mancuernas", order: 4, text: "Pausa brevemente abajo sin perder tensión." },
  { exerciseId: "press-inclinado-mancuernas", order: 5, text: "Empuja hacia arriba sin chocar las mancuernas." },

  { exerciseId: "press-plano-maquina", order: 1, text: "Ajusta el asiento para que los manerales queden a la altura media del pecho." },
  { exerciseId: "press-plano-maquina", order: 2, text: "Apoya la espalda completa contra el respaldo, sin despegar los omóplatos." },
  { exerciseId: "press-plano-maquina", order: 3, text: "Empuja los manerales al frente en línea recta, sin desviar hacia arriba o abajo." },
  { exerciseId: "press-plano-maquina", order: 4, text: "Controla el regreso durante 2 segundos, sin dejar que el peso golpee la pila." },

  { exerciseId: "aperturas-polea", order: 1, text: "Coloca las poleas altas y da un paso al frente para generar tensión constante." },
  { exerciseId: "aperturas-polea", order: 2, text: "Mantén un ligero quiebre en el codo durante todo el movimiento." },
  { exerciseId: "aperturas-polea", order: 3, text: "Junta las manos al frente del esternón en un arco amplio y controlado." },
  { exerciseId: "aperturas-polea", order: 4, text: "Regresa despacio hasta sentir el estiramiento sin perder la tensión de la polea." },

  { exerciseId: "fondos-asistidos", order: 1, text: "Selecciona la asistencia (contrapeso) según tu nivel, más asistencia al inicio." },
  { exerciseId: "fondos-asistidos", order: 2, text: "Inclina ligeramente el torso al frente para priorizar pecho sobre tríceps." },
  { exerciseId: "fondos-asistidos", order: 3, text: "Desciende controlado hasta que los hombros lleguen a la altura de los codos." },
  { exerciseId: "fondos-asistidos", order: 4, text: "Empuja hacia arriba sin bloquear los codos con fuerza al final." },

  { exerciseId: "extension-triceps-cuerda", order: 1, text: "Fija los codos pegados a las costillas durante toda la serie." },
  { exerciseId: "extension-triceps-cuerda", order: 2, text: "Extiende los brazos por completo empujando la cuerda hacia abajo." },
  { exerciseId: "extension-triceps-cuerda", order: 3, text: "Separa ligeramente las manos al final para maximizar la contracción." },
  { exerciseId: "extension-triceps-cuerda", order: 4, text: "Regresa controlado sin dejar que la polea tire de golpe del brazo." },

  { exerciseId: "press-frances", order: 1, text: "Acuéstate en el banco con la barra EZ sostenida con agarre cerrado." },
  { exerciseId: "press-frances", order: 2, text: "Mantén los codos apuntando al techo durante todo el recorrido." },
  { exerciseId: "press-frances", order: 3, text: "Baja la barra de forma controlada hacia la frente o ligeramente detrás de la cabeza." },
  { exerciseId: "press-frances", order: 4, text: "Extiende los brazos usando solo el tríceps, sin mover los hombros." },

  { exerciseId: "jalon-al-pecho", order: 1, text: "Ajusta el soporte de rodillas para que queden firmes." },
  { exerciseId: "jalon-al-pecho", order: 2, text: "Toma la barra con un agarre un poco más ancho que los hombros." },
  { exerciseId: "jalon-al-pecho", order: 3, text: "Inclina el torso ligeramente hacia atrás sin arquear la espalda baja." },
  { exerciseId: "jalon-al-pecho", order: 4, text: "Lleva la barra hacia la parte alta del pecho controlando el recorrido." },
  { exerciseId: "jalon-al-pecho", order: 5, text: "Sube el peso extendiendo los brazos sin bloquear los codos con fuerza." },

  { exerciseId: "jalon-agarre-cerrado", order: 1, text: "Toma el agarre triángulo con las palmas enfrentadas." },
  { exerciseId: "jalon-agarre-cerrado", order: 2, text: "Inclina el torso levemente atrás, sin balancear para generar impulso." },
  { exerciseId: "jalon-agarre-cerrado", order: 3, text: "Lleva los codos hacia las costillas, tirando del triángulo hasta el pecho." },
  { exerciseId: "jalon-agarre-cerrado", order: 4, text: "Sube controlado hasta la extensión completa de los brazos." },

  { exerciseId: "remo-sentado-maquina", order: 1, text: "Ajusta el pecho contra el soporte y toma los manerales o barra." },
  { exerciseId: "remo-sentado-maquina", order: 2, text: "Extiende los brazos por completo al frente sin redondear la espalda baja." },
  { exerciseId: "remo-sentado-maquina", order: 3, text: "Tira llevando los codos hacia atrás y juntando los omóplatos." },
  { exerciseId: "remo-sentado-maquina", order: 4, text: "Regresa controlado sin dejar que la pila golpee." },

  { exerciseId: "pullover-polea", order: 1, text: "Colócate de espaldas a la polea alta con un ligero quiebre de rodillas." },
  { exerciseId: "pullover-polea", order: 2, text: "Mantén los brazos casi extendidos con un leve quiebre fijo en el codo." },
  { exerciseId: "pullover-polea", order: 3, text: "Lleva la barra o cuerda desde arriba de la cabeza hasta los muslos en un arco amplio." },
  { exerciseId: "pullover-polea", order: 4, text: "Regresa controlado hasta sentir el estiramiento completo del dorsal." },

  { exerciseId: "curl-predicador", order: 1, text: "Apoya la parte de atrás de los brazos por completo sobre el banco scott." },
  { exerciseId: "curl-predicador", order: 2, text: "Toma la barra EZ con agarre supino a la altura de los hombros." },
  { exerciseId: "curl-predicador", order: 3, text: "Extiende los brazos casi por completo sin bloquear los codos." },
  { exerciseId: "curl-predicador", order: 4, text: "Flexiona llevando la barra hacia los hombros con control total." },

  { exerciseId: "curl-martillo", order: 1, text: "De pie, toma las mancuernas con agarre neutro (palmas enfrentadas)." },
  { exerciseId: "curl-martillo", order: 2, text: "Mantén los codos pegados al torso durante toda la serie." },
  { exerciseId: "curl-martillo", order: 3, text: "Flexiona ambos brazos o de forma alternada, sin girar la muñeca." },
  { exerciseId: "curl-martillo", order: 4, text: "Desciende controlado hasta la extensión completa." },

  { exerciseId: "press-militar-mancuernas", order: 1, text: "Siéntate con la espalda apoyada y las mancuernas a la altura de los hombros." },
  { exerciseId: "press-militar-mancuernas", order: 2, text: "Empuja las mancuernas hacia arriba en línea recta sin chocarlas." },
  { exerciseId: "press-militar-mancuernas", order: 3, text: "Extiende los brazos casi por completo sin bloquear los codos con fuerza." },
  { exerciseId: "press-militar-mancuernas", order: 4, text: "Desciende controlado hasta que las mancuernas vuelvan a la altura de las orejas." },

  { exerciseId: "press-hombros-maquina", order: 1, text: "Ajusta la altura del asiento antes de tomar los manerales." },
  { exerciseId: "press-hombros-maquina", order: 2, text: "Apoya la espalda completa contra el respaldo." },
  { exerciseId: "press-hombros-maquina", order: 3, text: "Empuja los manerales hacia arriba sin despegar la espalda." },
  { exerciseId: "press-hombros-maquina", order: 4, text: "Controla el regreso hasta la posición inicial sin dejar caer el peso." },

  { exerciseId: "face-pull-polea", order: 1, text: "Coloca la polea a la altura de la cara con el accesorio de cuerda." },
  { exerciseId: "face-pull-polea", order: 2, text: "Toma cada extremo de la cuerda con agarre neutro." },
  { exerciseId: "face-pull-polea", order: 3, text: "Tira llevando las manos hacia la cara con los codos altos." },
  { exerciseId: "face-pull-polea", order: 4, text: "Separa ligeramente los extremos al final antes de regresar controlado." },

  { exerciseId: "elevaciones-laterales-mancuernas", order: 1, text: "De pie, toma las mancuernas con los brazos a los costados." },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 2, text: "Mantén un ligero quiebre en los codos durante todo el movimiento." },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 3, text: "Eleva los brazos hacia los lados hasta la altura de los hombros." },
  { exerciseId: "elevaciones-laterales-mancuernas", order: 4, text: "Desciende controlado sin dejar caer el peso de golpe." },

  { exerciseId: "curl-barra", order: 1, text: "De pie, toma la barra con agarre supino a la altura de los hombros." },
  { exerciseId: "curl-barra", order: 2, text: "Mantén los codos pegados al torso durante todo el recorrido." },
  { exerciseId: "curl-barra", order: 3, text: "Flexiona llevando la barra hacia los hombros sin balancear el torso." },
  { exerciseId: "curl-barra", order: 4, text: "Desciende controlado hasta la extensión casi completa." },

  { exerciseId: "curl-concentrado", order: 1, text: "Siéntate y apoya el codo en la parte interna del muslo del mismo lado." },
  { exerciseId: "curl-concentrado", order: 2, text: "Sostén la mancuerna con el brazo casi extendido hacia el suelo." },
  { exerciseId: "curl-concentrado", order: 3, text: "Flexiona llevando la mancuerna hacia el hombro sin despegar el codo." },
  { exerciseId: "curl-concentrado", order: 4, text: "Desciende controlado hasta la extensión casi completa." },
];

export function getInstructionsForExercise(exerciseId) {
  return EXERCISE_INSTRUCTIONS.filter((row) => row.exerciseId === exerciseId)
    .sort((a, b) => a.order - b.order)
    .map((row) => row.text);
}
