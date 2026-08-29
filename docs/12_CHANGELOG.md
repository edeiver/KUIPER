# Changelog

## Unreleased
- Fix: se agregó el campo `sets` (número de series) a cada ejercicio del `workoutPlan` en `WorkoutSessionFlow.js`. Corrige que cada ejercicio terminara tras una sola serie y que el resumen final mostrara `NaN` en "Series realizadas" y "Volumen total".
- Refactor: `app/workouts/completed/page.js` ahora es una pantalla de solo lectura que muestra la última sesión guardada vía `readWorkoutSessions()`, en vez de un formulario estático no funcional. Se eliminó el bloque falso "¿Llegaste al fallo?" por no tener datos reales que lo respalden; el guardado sigue ocurriendo únicamente en `WorkoutSummary` dentro de `WorkoutSessionFlow.js`.
- Feat: módulo de Progreso (`app/progress`) — sesiones totales, volumen acumulado y progresión de peso por ejercicio, calculado solo a partir de series realmente guardadas.
- Feat: copia de seguridad local (`app/settings`) — exportar/importar el historial completo como JSON, dado que todo vive en `localStorage`.
- Feat: internacionalización real ES/EN con `next-intl` — routing con prefijo de locale, catálogo de ejercicios y planes traducidos, selector de idioma. Ver `docs/11_DECISIONS.md` para el detalle de la arquitectura y los dos bugs de acoplamiento que corrigió de paso (`DIFFICULTY_RANK` y el `label` duplicado de alternativas).
- Docs: README reescrito en inglés reflejando el estado real del producto.

## v0.1.0
Initial starter kit.
