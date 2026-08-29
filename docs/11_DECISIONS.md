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

### Real i18n: ES/EN via next-intl, locale-prefixed routing (approved 2026-08-28)

- Adopted `next-intl` rather than hand-rolling locale routing, negotiation, and ICU pluralization — the only realistic alternative given "no unnecessary dependencies" was reimplementing all three ourselves. `app/` moved under `app/[locale]/`, with `middleware.js` handling detection/redirect (`locales: ["es","en"]`, `defaultLocale: "es"`). URL slugs (`pecho-triceps`, etc.) are **not** translated — they stay the stable canonical id in both locales, avoiding a redirect/alias system for a cosmetic win.
- While moving routes, the three near-identical routine pages (`pecho-triceps`, `espalda-biceps`, `hombro-biceps`) collapsed into one dynamic `app/[locale]/workouts/[slug]/page.js` (+ `.../exercise/page.js`) — this was already duplicated logic before i18n, and threading `locale` through three copies instead of one was reason enough to fix it now.
- UI chrome (labels, buttons, empty states) lives in `messages/es.json` / `messages/en.json`, consumed via `useTranslations`/`getTranslations`. Exercise catalog content (names, technique, cues, mistakes, alternatives) is **not** duplicated as a second full copy of each row — only the free-text fields move into a sibling `translations.js` per table, keyed by `(id, locale)`, exactly the shape a Prisma translations table would have. Structural/relational fields (`id`, FK ids, `tempo`, `recommendedRir`, timestamps) stay untouched in the original table. `data/exercises/repository.js` threads `locale` through every join.
- Fixed two bugs this surfaced before they could get worse: `data/workout-plans.js`'s `DIFFICULTY_RANK` used the Spanish display string itself as a lookup key (`Principiante`/`Intermedio`/`Avanzado`) — translating `difficulty` would have silently broken `getWorkoutSummary`. Catalog `difficulty` now uses stable keys (`beginner`/`intermediate`/`advanced`, see `data/exercises/catalog/difficulty.js`) with a separate `DIFFICULTY_LABELS` lookup for display. Also, `data/exercises/alternatives/index.js` used to store a `label` that duplicated the target exercise's own `name` for the 4 alternatives that already resolve to a real catalog id — that's now derived from the target's translated name in `repository.js` instead of kept as a second, driftable copy of the same text.
- Because plans were previously resolved eagerly at module load (`export const pechoTricepsPlan = resolvePlan(pechoTricepsRaw)`), and resolution now depends on `locale`, `data/workout-plans.js` exports functions instead (`getPlanBySlug(slug, locale)`, `getAllPlans(locale)`). Every caller was updated; nothing else changed shape.
- `utils/formatWorkoutSession.js`'s hand-rolled `formatRelativeDate` ("Hoy"/"Ayer"/"Hace N días", Spanish-only) was replaced with the built-in `Intl.RelativeTimeFormat(locale, { numeric: "auto" })` — correct in both locales, less code to maintain. `components/dashboard/StatsOverviewCard.js` had its own duplicate copy of that same function instead of importing the shared one; consolidated to the one in `utils/formatWorkoutSession.js` while making it locale-aware.

### AI session insight: scoped Claude API call, not the AI Coach module (approved 2026-08-29)

- Added one Claude API–backed feature — a post-workout "insight" the user requests explicitly from the completed-session screen — as a deliberately small, bounded first use of an LLM in this app. This is **not** the roadmap's "AI Coach" module (`docs/03_PRODUCT.md`): it's a single-turn call over one session's real logged data, not ongoing programming or conversation.
- Model: `claude-haiku-4-5`, chosen for cost over `claude-sonnet-5`/`claude-opus-4-8` — a short coaching paragraph doesn't need a larger model, and the call is user-initiated (not automatic/looping), so per-use cost stays predictable and low.
- This is the app's **first server-side code** (`app/api/insight/route.js`, a Next.js Route Handler) and **first secret** (`ANTHROPIC_API_KEY`, read server-side only via `.env.local`, never sent to the client — see `.env.example`). No new backend framework was introduced for this; a Route Handler was sufficient and avoided standing up Express/NestJS ahead of the actual migration described above.
- The prompt is grounded strictly in the real data passed from the client (workout title, duration, sets, volume, energy, comments, per-exercise weight/reps) — same "never invent data" rule as the rest of the app, enforced in the system prompt itself, not just by convention.
- The insight response is generated in the session's active locale so it doesn't read as untranslated relative to the rest of the ES/EN UI.

### Weight suggestion: react to a trend, not a single session (approved 2026-08-29)

- `utils/weightSuggestion.js` previously decided everything from `history.lastSession` alone — a single off day (missed the rep target once) suggested reducing weight, and a single good day suggested increasing it, with no way to tell noise from a real pattern.
- `utils/exerciseHistory.js`'s `getExerciseHistory` now also returns `recentSessions`: up to the last 3 *distinct* sessions for that exercise (deduped by calendar day, since one session logs one row per completed set — 4 sets in one workout must not look like 4 separate sessions to a trend check).
- `getWeightSuggestion` uses that to distinguish a one-off from a confirmed pattern across two real sessions: missing the rep minimum once now suggests holding (not reducing) — reducing only kicks in when the last two sessions both missed it. Beating the rep maximum twice in a row increases the weight more (10%) than a single good session (5%), still bounded by real logged numbers, never invented.
- `getWeightSuggestion` now returns `{ action, suggestedWeight }` instead of a hardcoded Spanish `message` string — the action is a translation key (`workouts.session.weightSuggestion.*` in `messages/{es,en}.json`), so the same real data reads correctly in whichever locale is active. This was a gap the i18n migration missed, since the message came from a data function, not JSX.
