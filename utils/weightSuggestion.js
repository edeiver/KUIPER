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
//   - `history`: what we know from the past for this exercise (currently
//     `{ lastSession, personalRecord }` from getExerciseHistory — could later
//     carry a full multi-session trend).
//   - `currentPlan`: the whole workout session's context. Not used by this
//     MVP algorithm, reserved for future signals — accumulated fatigue,
//     position within the session, deload weeks, AI Coach input.
//
// Known limitation (MVP): the original spec asks to also check "RIR
// esperado", but `appendWorkoutSet` never logs the RIR actually used per
// set — only weight and reps are real, stored data. Rather than invent a
// number that was never recorded, this algorithm only compares real reps
// against the target range. Once RIR is logged per set, that condition can
// be added inside this function without touching the signature.

const WEIGHT_INCREMENT_RATIO = 0.05;
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

  if (!lastSession) {
    return {
      action: "use-planned",
      message: "Usa el peso planificado.",
      suggestedWeight: plannedWeight,
    };
  }

  const range = parseRepRange(exercise.reps);

  if (!range) {
    return {
      action: "use-planned",
      message: "Usa el peso planificado.",
      suggestedWeight: plannedWeight,
    };
  }

  if (lastSession.reps < range.min) {
    return {
      action: "hold-or-reduce",
      message:
        "La última vez no llegaste al mínimo de repeticiones. Considera mantener el peso o reducirlo un poco hoy.",
      suggestedWeight: roundToHalf(lastSession.weight * (1 - WEIGHT_DECREMENT_RATIO)),
    };
  }

  if (lastSession.reps >= range.max) {
    return {
      action: "increase",
      message: "Superaste el objetivo de repeticiones la última vez. Prueba con un poco más de peso hoy.",
      suggestedWeight: roundToHalf(lastSession.weight * (1 + WEIGHT_INCREMENT_RATIO)),
    };
  }

  return {
    action: "maintain-and-push",
    message: "La última vez estuviste dentro del rango. Mantén el mismo peso e intenta una repetición más.",
    suggestedWeight: lastSession.weight,
  };
}
