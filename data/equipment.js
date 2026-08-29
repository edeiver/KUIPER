export const EQUIPMENT = {
  MANCUERNAS: { id: "mancuernas", name: { es: "Mancuernas", en: "Dumbbells" } },
  MAQUINA: { id: "maquina", name: { es: "Máquina", en: "Machine" } },
  POLEA: { id: "polea", name: { es: "Polea", en: "Cable" } },
  BARRA: { id: "barra", name: { es: "Barra", en: "Barbell" } },
  PESO_CORPORAL: { id: "peso-corporal", name: { es: "Peso corporal", en: "Bodyweight" } },
};

export function getEquipmentById(id) {
  return Object.values(EQUIPMENT).find((item) => item.id === id) ?? null;
}

export function getEquipmentName(id, locale) {
  const equipment = getEquipmentById(id);
  return equipment?.name[locale] ?? equipment?.name.es ?? id;
}
