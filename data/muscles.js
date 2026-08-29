export const MUSCLES = {
  PECTORAL_SUPERIOR: { id: "pectoral-superior", name: { es: "Pectoral superior", en: "Upper chest" } },
  PECHO_MEDIO: { id: "pecho-medio", name: { es: "Pecho medio", en: "Mid chest" } },
  PECHO: { id: "pecho", name: { es: "Pecho", en: "Chest" } },
  PECHO_INFERIOR: { id: "pecho-inferior", name: { es: "Pecho inferior", en: "Lower chest" } },
  TRICEPS: { id: "triceps", name: { es: "Tríceps", en: "Triceps" } },
  DELTOIDE_ANTERIOR: { id: "deltoide-anterior", name: { es: "Deltoide anterior", en: "Front deltoid" } },
  DELTOIDE_LATERAL: { id: "deltoide-lateral", name: { es: "Deltoide lateral", en: "Side deltoid" } },
  DELTOIDE_POSTERIOR: { id: "deltoide-posterior", name: { es: "Deltoide posterior", en: "Rear deltoid" } },
  ANTEBRAZO: { id: "antebrazo", name: { es: "Antebrazo", en: "Forearm" } },
  DORSAL_ANCHO: { id: "dorsal-ancho", name: { es: "Dorsal ancho", en: "Lats" } },
  DORSAL_MEDIO: { id: "dorsal-medio", name: { es: "Dorsal medio", en: "Mid back" } },
  BICEPS: { id: "biceps", name: { es: "Bíceps", en: "Biceps" } },
  REDONDO_MAYOR: { id: "redondo-mayor", name: { es: "Redondo mayor", en: "Teres major" } },
  ROMBOIDES: { id: "romboides", name: { es: "Romboides", en: "Rhomboids" } },
  SERRATO: { id: "serrato", name: { es: "Serrato anterior", en: "Serratus anterior" } },
  BRAQUIAL: { id: "braquial", name: { es: "Braquial", en: "Brachialis" } },
};

export function getMuscleById(id) {
  return Object.values(MUSCLES).find((muscle) => muscle.id === id) ?? null;
}

export function getMuscleName(id, locale) {
  const muscle = getMuscleById(id);
  return muscle?.name[locale] ?? muscle?.name.es ?? id;
}
