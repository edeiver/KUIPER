// Locale-independent thousands separator — `toLocaleString("es-ES")` silently
// drops the separator when Node's ICU data doesn't include es-ES (small-icu
// builds), so a fixed regex is used instead of relying on Intl here.
function formatThousands(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatRelativeDate(isoDate) {
  const diffDays = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  return `Hace ${diffDays} días`;
}

// Transforms a raw session record from `workoutStorage.readWorkoutSessions()`
// into the { title, meta } shape display components need.
export function formatWorkoutSession(session) {
  return {
    title: session.workout,
    meta: `${formatRelativeDate(session.date)} · ${session.totalSets} series · ${formatThousands(session.totalVolume)} kg`,
  };
}
