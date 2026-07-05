export const EQUIPMENT = {
  MANCUERNAS: { id: "mancuernas", name: "Mancuernas" },
  MAQUINA: { id: "maquina", name: "Máquina" },
  POLEA: { id: "polea", name: "Polea" },
  BARRA: { id: "barra", name: "Barra" },
  PESO_CORPORAL: { id: "peso-corporal", name: "Peso corporal" },
};

export function getEquipmentById(id) {
  return Object.values(EQUIPMENT).find((item) => item.id === id) ?? null;
}

export function getEquipmentName(id) {
  return getEquipmentById(id)?.name ?? id;
}
