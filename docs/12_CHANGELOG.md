# Changelog

## Unreleased
- Fix: se agregó el campo `sets` (número de series) a cada ejercicio del `workoutPlan` en `WorkoutSessionFlow.js`. Corrige que cada ejercicio terminara tras una sola serie y que el resumen final mostrara `NaN` en "Series realizadas" y "Volumen total".
- Refactor: `app/workouts/completed/page.js` ahora es una pantalla de solo lectura que muestra la última sesión guardada vía `readWorkoutSessions()`, en vez de un formulario estático no funcional. Se eliminó el bloque falso "¿Llegaste al fallo?" por no tener datos reales que lo respalden; el guardado sigue ocurriendo únicamente en `WorkoutSummary` dentro de `WorkoutSessionFlow.js`.
- Feat: módulo de Progreso (`app/progress`) — sesiones totales, volumen acumulado y progresión de peso por ejercicio, calculado solo a partir de series realmente guardadas.
- Feat: copia de seguridad local (`app/settings`) — exportar/importar el historial completo como JSON, dado que todo vive en `localStorage`.
- Feat: internacionalización real ES/EN con `next-intl` — routing con prefijo de locale, catálogo de ejercicios y planes traducidos, selector de idioma. Ver `docs/11_DECISIONS.md` para el detalle de la arquitectura y los dos bugs de acoplamiento que corrigió de paso (`DIFFICULTY_RANK` y el `label` duplicado de alternativas).
- Feat: insight de IA post-entrenamiento (`app/api/insight`) — un botón opcional en el resumen de sesión llama una vez a Claude (Haiku 4.5) con los datos reales de esa sesión y devuelve un párrafo corto de feedback, en el idioma activo. Primer código server-side y primer secreto (`ANTHROPIC_API_KEY`) del proyecto.
- Docs: README reescrito en inglés reflejando el estado real del producto, con sección sobre el proceso de desarrollo con Claude Code.
- Fix/mejora: `utils/weightSuggestion.js` ahora considera hasta 3 sesiones reales recientes (no solo la última) para distinguir un mal día puntual de una tendencia real antes de subir o bajar el peso sugerido. De paso se corrigió que el mensaje de sugerencia estaba hardcodeado en español — ahora se traduce según el idioma activo, igual que el resto de la sesión.

## v0.1.0
Initial starter kit.
