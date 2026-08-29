# Kuiper (Hércules)

A strength-training platform built from real, daily gym use — not designed in a vacuum. It combines an exercise catalog with real technique detail, guided sessions sequenced by biomechanical logic, and a relational data model designed from day one to scale into a proper backend — with no invented data on any screen.

> Full product and architecture documentation lives in [`docs/VISION.md`](./docs/VISION.md) (in Spanish). This README covers what you need to run the project and understand what's actually built today.

## The problem

Training seriously today means choosing between a generic logger (no technique, no ordering logic) or a bloated app that knows nothing about your actual gym or history. Kuiper does the opposite: a catalog with personal-trainer-level detail (technique, common mistakes, muscles to feel, equipment-aware alternatives), exercises sequenced by hypertrophy/fatigue logic, and progress computed only from what the user actually logged.

## What's built

- **Guided workout session** (`components/workouts/WorkoutSessionFlow.js`): a set-by-set flow with a rest timer, technique/anatomy panel, perceived-energy scale, coach checklist, and an exercise-switcher that only offers alternatives matching available equipment.
- **Weight suggestions from real history**: `utils/weightSuggestion.js` compares last session's reps/weight against the target rep range and recommends increasing, holding, or reducing load — never a made-up number.
- **Exercise catalog as relational entities** (`data/exercises/`): normalized tables for instructions, common mistakes, cues, alternatives, media, and secondary muscles, composed through a single join point (`data/exercises/repository.js`) that does in-memory joins today and will become a Prisma query tomorrow without changing any caller.
- **Dashboard** with a last-session summary, quick access, and recent activity, all read from `localStorage` (`utils/workoutStorage.js`).
- **Progress**: total sessions, cumulative volume, and per-exercise weight progression (`app/progress`), computed entirely from real logged sets.
- **Local backup** (`app/settings`): export/import the full workout history as JSON, since everything lives client-side.
- Versioned local persistence (`kuiper.workout.*.v1`) with no backend or auth — an intentional decision for this stage (see `docs/05_TECH_STACK.md`).

## What's missing (by design, not oversight)

Nutrition, an AI Coach, and ChatGPT sync are planned but not implemented — see `docs/03_PRODUCT.md` and `docs/10_ROADMAP.md`. No stub UI was added for these modules to avoid shipping screens that promise something that doesn't work yet.

## Stack

**Current:** Next.js 15 (App Router) · React 19 · JavaScript · Tailwind CSS 4 · Turbopack · npm — no backend, no auth, `localStorage` persistence.

**Long-term target:** Node.js (Express → NestJS) + PostgreSQL + Prisma. The current data model is already designed as relational entities (stable IDs, explicit foreign keys, no document-style nesting) to migrate without a redesign — see `docs/11_DECISIONS.md`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```text
app/                    App Router routes: dashboard, workouts/*, progress, settings
components/
  workouts/              live workout session UI
  dashboard/              home screen cards
  progress/               history and per-exercise progression
  settings/               local data backup
  ui/                     shared primitives (AppShell, Surface, SectionTitle)
data/
  exercises/              normalized catalog + repository.js (composition layer)
  workout-plans.js         today's prescription (kept separate from the catalog, see docs/11_DECISIONS.md)
utils/                    localStorage read/write, suggestion and history calculations
docs/                     product and architecture documentation (start with VISION.md)
```

## Working process

This project is developed against documentation in `docs/`: every meaningful product or architecture decision is recorded in `docs/11_DECISIONS.md` with its rationale before being implemented, and `docs/13_TODO.md` / `docs/12_CHANGELOG.md` are kept current per sprint. `docs/00_INDEX.md` explains the recommended reading order.
