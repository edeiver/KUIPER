// Deterministic, side-effect-free. Depends only on the data passed in as
// arguments — never reads localStorage, the catalog, or anything else
// directly. Callers are responsible for resolving `history` (via
// `getExerciseHistory()`) beforehand.
//
// The signature is grouped into three extensible buckets so future signals
// can be added INSIDE each object without ever changing this function's
// public shape (`getWeightSuggestion({ exercise, history, currentPlan })`
// stays the same):
//   - `exercise`: today's prescription for this exercise (target reps, rir,
//     planned weight, ...).
//   - `history`: what we know from the past for this exercise — `lastSession`,
//     `personalRecord`, and `recentSessions` (up to the last 3 distinct
//     sessions, most recent first) from getExerciseHistory.
//   - `currentPlan`: the whole workout session's context. Not used by this
//     MVP algorithm, reserved for future signals — accumulated fatigue,
//     position within the session, deload weeks, AI Coach input.
//
// Returns `{ action, suggestedWeight }` — no message text. `action` is a
// translation key (see messages/{es,en}.json under
// `workouts.session.weightSuggestion`) so the same real numbers read
// correctly in whichever locale the session is running in.
//
// Known limitation (MVP): the original spec asks to also check "RIR
// esperado", but `appendWorkoutSet` never logs the RIR actually used per
// set — only weight and reps are real, stored data. Rather than invent a
// number that was never recorded, this algorithm only compares real reps
// against the target range. Once RIR is logged per set, that condition can
// be added inside this function without touching the signature.

const WEIGHT_INCREMENT_RATIO = 0.05;
const WEIGHT_INCREMENT_RATIO_CONFIRMED = 0.1;
const WEIGHT_DECREMENT_RATIO = 0.05;

function parseRepRange(reps) {
  const numbers = String(reps).match(/\d+/g)?.map(Number) ?? [];

  if (numbers.length === 0) {
    return null;
  }

  if (numbers.length === 1) {
    return { min: numbers[0], max: numbers[0] };
  }

  return { min: numbers[0], max: numbers[numbers.length - 1] };
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

export function getWeightSuggestion({ exercise, history, currentPlan }) {
  void currentPlan; // reserved for future signals — not used by this MVP algorithm

  const plannedWeight = exercise.weight;
  const lastSession = history?.lastSession ?? null;
  const recentSessions = history?.recentSessions ?? [];

  if (!lastSession) {
    return { action: "usePlanned", suggestedWeight: plannedWeight };
  }

  const range = parseRepRange(exercise.reps);

  if (!range) {
    return { action: "usePlanned", suggestedWeight: plannedWeight };
  }

  const missedMin = (session) => session.reps < range.min;
  const hitMax = (session) => session.reps >= range.max;

  // A single off day is noise; the same pattern twice in a row across real,
  // distinct sessions is a trend worth acting on more decisively.
  const confirmedAcross = (predicate) =>
    recentSessions.length >= 2 && recentSessions.slice(0, 2).every(predicate);

  if (missedMin(lastSession)) {
    if (confirmedAcross(missedMin)) {
      return {
        action: "holdOrReduce",
        suggestedWeight: roundToHalf(lastSession.weight * (1 - WEIGHT_DECREMENT_RATIO)),
      };
    }

    return { action: "hold", suggestedWeight: lastSession.weight };
  }

  if (hitMax(lastSession)) {
    if (confirmedAcross(hitMax)) {
      return {
        action: "increaseConfirmed",
        suggestedWeight: roundToHalf(lastSession.weight * (1 + WEIGHT_INCREMENT_RATIO_CONFIRMED)),
      };
    }

    return {
      action: "increase",
      suggestedWeight: roundToHalf(lastSession.weight * (1 + WEIGHT_INCREMENT_RATIO)),
    };
  }

  return { action: "maintainAndPush", suggestedWeight: lastSession.weight };
}
