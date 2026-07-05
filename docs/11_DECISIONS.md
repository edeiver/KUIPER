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

### Backend & data layer target: Node.js + PostgreSQL + Prisma, not Firebase (approved 2026-07-04)

- Hércules's long-term backend is a **custom Node.js service (Express initially, NestJS-ready) over PostgreSQL, accessed through Prisma** — not Firebase or any NoSQL/document store. See `docs/05_TECH_STACK.md`.
- Consequence for data modeling: every structure introduced from now on (starting with the exercise catalog) is designed as **relational entities** — stable string IDs, explicit foreign keys, one-to-many and many-to-many relationships modeled as separate join arrays/tables (not embedded arrays or nested documents) — so it maps directly onto Prisma models later without a redesign.
- The exercise catalog (`data/exercises/`) was restructured along these lines (domain-based folders — one per entity, not per muscle group — so file count doesn't grow with exercise count; see the folder reorganization further down for the full rationale):
  - `exercises/catalog/index.js` holds only the Exercise "row" — scalars and FK ids (`primaryMuscleId`, `equipmentId`). No embedded arrays.
  - `exercises/secondary-muscles/index.js` — many-to-many join (`Exercise` ↔ `Muscle`).
  - `exercises/instructions/index.js`, `exercises/mistakes/index.js`, `exercises/cues/index.js` — one-to-many child tables with an explicit `order` column (relational tables have no implicit row order).
  - `exercises/alternatives/index.js` — self-relation join, with a nullable `alternativeExerciseId` (transitional: today's alternatives aren't yet catalog entries themselves) plus a `label` for display.
  - `exercises/media/index.js` — one-to-many child table, empty until real assets exist.
  - `exercises/repository.js` — the single composition/"join" function (`getExerciseById`) that assembles the full entity from the tables above. This is the only place that needs to change when the data source moves from in-memory arrays to Prisma (`prisma.exercise.findUnique({ include: {...} })`) — no consumer (`workout-plans.js`, `WorkoutSessionFlow.js`, or any UI component) needs to change.
  - `workout-plans.js`'s plan-exercise entries now carry an explicit `order` field for the same reason (no implicit array-position ordering once this becomes a real `WorkoutPlanExercise` table).

### Exercise catalog folder reorganization: `data/exercises/` (approved 2026-07-04)

- Files renamed/relocated with **zero data or logic changes** (pure structure move): `exercise-catalog.js` → `exercises/catalog/index.js`, `exercise-secondary-muscles.js` → `exercises/secondary-muscles/index.js`, `exercise-instructions.js` → `exercises/instructions/index.js`, `exercise-mistakes.js` → `exercises/mistakes/index.js`, `exercise-cues.js` → `exercises/cues/index.js`, `exercise-alternatives.js` → `exercises/alternatives/index.js`, `exercise-media.js` → `exercises/media/index.js`, `exercise-repository.js` → `exercises/repository.js`. `data/muscles.js`, `data/equipment.js`, and `data/workout-plans.js` stayed at the `data/` root (small, stable taxonomies and the plans domain, respectively).
- Rationale: organize by **domain/entity** (mirrors future Prisma models 1:1) rather than by muscle group — a muscle group is a data value (a column), not a structural boundary, and splitting by it would require splitting every child table by muscle group too. Each data-holding entity is a **folder with an `index.js`** (not a flat file) specifically so that when content grows into the hundreds, chunk files can be added inside that same folder (e.g. `catalog/pecho.js`, `catalog/espalda.js`, aggregated by `catalog/index.js`) without ever changing the folder's import path or reorganizing again. `repository.js` stays a single file — it's fixed composition logic, not growing data.
- The exercise catalog and workout plans remain deliberately decoupled: `workout-plans.js` only calls the one public function `getExerciseById()` — it never reaches into the catalog's internal tables directly.

### Catalog as single source of truth — Phase 1: plan-level metadata (approved 2026-07-05)

- A repo-wide audit found workout title/objective/duration/exercise-count/volume/difficulty hardcoded in 2-4 places each (`app/workouts/page.js`, the two routine detail pages, `TodayWorkoutCard.js`), already drifted from real data (a hardcoded "6.200 kg" vs. the actual computed 6.244 kg for Espalda + Bíceps). Migration is being done in small, independently-deployable phases rather than as one large change.
- Phase 1: `data/workout-plans.js` gains authored fields with no computable basis (`slug`, `focus`, `estimatedDurationMinutes`) directly on each plan, and a new `getWorkoutSummary(plan)` export that **derives** `exerciseCount`, `totalVolume`, and `difficulty` from the real resolved exercises — never hand-typed. `difficulty` is computed as the highest per-exercise difficulty present in the plan (`Principiante` < `Intermedio` < `Avanzado`), not an arbitrary label. Purely additive, no visible change.
- Phase 2: `app/workouts/page.js` now derives the Pecho + Tríceps / Espalda + Bíceps cards from `ALL_PLANS` + `getWorkoutSummary` instead of a hardcoded array — same displayed values, single source now. The "Pierna" card has no real plan yet; rather than link it to the wrong routine (its previous, buggy behavior) or invent a placeholder plan, `WorkoutCard.js` gained a `disabled` variant (dimmed card, "Próximamente" badge instead of the duration pill, no `href`/navigation) — reused for any future not-yet-built routine, no fake data introduced.
