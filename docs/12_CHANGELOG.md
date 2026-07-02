# Changelog

## Unreleased
- Fix: se agregó el campo `sets` (número de series) a cada ejercicio del `workoutPlan` en `WorkoutSessionFlow.js`. Corrige que cada ejercicio terminara tras una sola serie y que el resumen final mostrara `NaN` en "Series realizadas" y "Volumen total".
- Refactor: `app/workouts/completed/page.js` ahora es una pantalla de solo lectura que muestra la última sesión guardada vía `readWorkoutSessions()`, en vez de un formulario estático no funcional. Se eliminó el bloque falso "¿Llegaste al fallo?" por no tener datos reales que lo respalden; el guardado sigue ocurriendo únicamente en `WorkoutSummary` dentro de `WorkoutSessionFlow.js`.

## v0.1.0
Initial starter kit.
