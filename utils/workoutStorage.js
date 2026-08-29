const SETS_KEY = "kuiper.workout.sets.v1";
const SESSIONS_KEY = "kuiper.workout.sessions.v1";

function readList(key) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendWorkoutSet(record) {
  const current = readList(SETS_KEY);
  current.push(record);
  writeList(SETS_KEY, current);
}

export function appendWorkoutSession(record) {
  const current = readList(SESSIONS_KEY);
  current.push(record);
  writeList(SESSIONS_KEY, current);
}

export function readWorkoutSets() {
  return readList(SETS_KEY);
}

export function readWorkoutSessions() {
  return readList(SESSIONS_KEY);
}

// Full local backup as a single plain object — the only two keys this app
// persists. Pairs with importWorkoutData for a round-trippable JSON export.
export function exportWorkoutData() {
  return {
    sets: readWorkoutSets(),
    sessions: readWorkoutSessions(),
  };
}

// Overwrites local storage with a previously exported backup. Replaces
// rather than merges — this is a single-user, no-backend app, so "restore"
// unambiguously means "go back to this snapshot," not a merge with whatever
// is currently on this device.
export function importWorkoutData(data) {
  if (!data || !Array.isArray(data.sets) || !Array.isArray(data.sessions)) {
    throw new Error("Archivo de backup inválido: se esperaban las listas 'sets' y 'sessions'.");
  }

  writeList(SETS_KEY, data.sets);
  writeList(SESSIONS_KEY, data.sessions);
}
