// Locale-independent thousands separator — `toLocaleString("es-ES")` silently
// drops the separator when Node's ICU data doesn't include es-ES (small-icu
// builds), so a fixed regex is used instead of relying on Intl here.
function formatThousands(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Built-in Intl API handles "today"/"yesterday"/"N days ago" correctly in
// any locale — no hand-rolled Spanish-only strings to maintain.
export function formatRelativeDate(isoDate, locale) {
  const diffDays = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24),
  );

  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffDays, "day");
}

// Transforms a raw session record from `workoutStorage.readWorkoutSessions()`
// into the pieces a { relativeDate, sets, volume } message template needs —
// translation of the surrounding copy (e.g. "{relativeDate} · {sets} sets
// · {volume} kg") is the caller's job via the `common.sessionSummary`
// message, so this stays locale-agnostic beyond the date itself.
export function getSessionSummaryValues(session, locale) {
  return {
    title: session.workout,
    relativeDate: formatRelativeDate(session.date, locale),
    sets: session.totalSets,
    volume: formatThousands(session.totalVolume),
  };
}
