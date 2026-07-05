export const MUSCLES = {
  PECTORAL_SUPERIOR: { id: "pectoral-superior", name: "Pectoral superior" },
  PECHO_MEDIO: { id: "pecho-medio", name: "Pecho medio" },
  PECHO: { id: "pecho", name: "Pecho" },
  PECHO_INFERIOR: { id: "pecho-inferior", name: "Pecho inferior" },
  TRICEPS: { id: "triceps", name: "Tríceps" },
  DELTOIDE_ANTERIOR: { id: "deltoide-anterior", name: "Deltoide anterior" },
  DELTOIDE_LATERAL: { id: "deltoide-lateral", name: "Deltoide lateral" },
  DELTOIDE_POSTERIOR: { id: "deltoide-posterior", name: "Deltoide posterior" },
  ANTEBRAZO: { id: "antebrazo", name: "Antebrazo" },
  DORSAL_ANCHO: { id: "dorsal-ancho", name: "Dorsal ancho" },
  DORSAL_MEDIO: { id: "dorsal-medio", name: "Dorsal medio" },
  BICEPS: { id: "biceps", name: "Bíceps" },
  REDONDO_MAYOR: { id: "redondo-mayor", name: "Redondo mayor" },
  ROMBOIDES: { id: "romboides", name: "Romboides" },
  SERRATO: { id: "serrato", name: "Serrato anterior" },
  BRAQUIAL: { id: "braquial", name: "Braquial" },
};

export function getMuscleById(id) {
  return Object.values(MUSCLES).find((muscle) => muscle.id === id) ?? null;
}

export function getMuscleName(id) {
  return getMuscleById(id)?.name ?? id;
}
