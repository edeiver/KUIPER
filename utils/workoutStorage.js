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
