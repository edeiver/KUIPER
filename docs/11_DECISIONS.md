# Decisions

- JavaScript over TypeScript.
- Local storage before backend.

## Architecture Decisions

### Exercise Database (approved 2026-07-01)

- Separate the exercise **catalog** (identity: name, muscles, technique, media, alternatives) from **prescription** (sets, reps, rir, rest per routine). Routines reference exercises by `id`; they do not duplicate exercise data.
- Catalog stored as a static JSON file (not `localStorage`), since local storage stays reserved for user-generated data (sessions, sets), per the "Local storage before backend" decision above.
- Exercises identified by a readable slug `id` (e.g. `press-inclinado-mancuernas`) instead of a generated UUID — no backend to generate IDs, and slugs are stable and debuggable by hand.
- Muscles modeled as a separate taxonomy (`id`, `label`, `group`) instead of free text, to support future filtering and per-muscle-group aggregation (Progress module).
- Media (images, gifs, videos) stored as arrays per exercise, served from `public/exercises/<id>/...`.
- Alternatives stored as arrays of exercise `id` references, not embedded objects, to avoid duplication.
- Designed so future modules (Progress, AI Coach) can reuse the same catalog without redefining exercise data.
