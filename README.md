# Kuiper (Hércules)

A strength-training platform built from real, daily gym use — not designed in a vacuum. It combines an exercise catalog with real technique detail, guided sessions sequenced by biomechanical logic, and a relational data model designed from day one to scale into a proper backend — with no invented data on any screen.

> Full product and architecture documentation lives in [`docs/VISION.md`](./docs/VISION.md) (in Spanish). This README covers what you need to run the project and understand what's actually built today.

## The problem

Training seriously today means choosing between a generic logger (no technique, no ordering logic) or a bloated app that knows nothing about your actual gym or history. Kuiper does the opposite: a catalog with personal-trainer-level detail (technique, common mistakes, muscles to feel, equipment-aware alternatives), exercises sequenced by hypertrophy/fatigue logic, and progress computed only from what the user actually logged.

## What's built

- **Guided workout session** (`components/workouts/WorkoutSessionFlow.js`): a set-by-set flow with a rest timer, technique/anatomy panel, perceived-energy scale, coach checklist, and an exercise-switcher that only offers alternatives matching available equipment.
- **Weight suggestions from real history**: `utils/weightSuggestion.js` compares up to the last 3 real sessions per exercise against the target rep range — distinguishing a one-off day from a confirmed trend — and recommends increasing, holding, or reducing load accordingly. Never a made-up number, and never an LLM call: this is deterministic and free.
- **Exercise catalog as relational entities** (`data/exercises/`): normalized tables for instructions, common mistakes, cues, alternatives, media, and secondary muscles, composed through a single join point (`data/exercises/repository.js`) that does in-memory joins today and will become a Prisma query tomorrow without changing any caller.
- **Dashboard** with a last-session summary, quick access, and recent activity, all read from `localStorage` (`utils/workoutStorage.js`). The greeting asks for the user's name once (`utils/userProfile.js`) instead of hardcoding one, and remembers it from then on.
- **Progress**: total sessions, cumulative volume, and per-exercise weight progression (`app/progress`), computed entirely from real logged sets.
- **Local backup** (`app/settings`): export/import the full workout history as JSON, since everything lives client-side.
- **Full ES/EN i18n** via `next-intl`: locale-prefixed routing (`/es`, `/en`), a language switcher, and the entire exercise catalog (names, technique steps, mistakes, cues, alternatives) translated — not just UI chrome. See `docs/11_DECISIONS.md` for how translations sit alongside the relational tables without duplicating structural data.
- **AI session insight** (`app/api/insight`): after saving a workout, one optional, user-initiated call to the Claude API (Haiku 4.5) turns that session's real logged data — sets, volume, energy, comments — into a short coaching takeaway. Server-side only (`ANTHROPIC_API_KEY` never reaches the client); grounded strictly in the data sent, per the app's no-invented-data rule.
- Versioned local persistence (`kuiper.workout.*.v1`) with no auth — the AI insight route is the only server-side code in the app so far (see `docs/05_TECH_STACK.md`).

## What's missing (by design, not oversight)

Nutrition and ChatGPT sync are planned but not implemented — see `docs/03_PRODUCT.md` and `docs/10_ROADMAP.md`. The roadmap's full "AI Coach" (ongoing, conversational programming) is also still ahead; what exists today is the scoped, single-purpose insight call described above, not that module. No stub UI was added for anything still unbuilt, to avoid shipping screens that promise something that doesn't work yet.

## Stack

**Current:** Next.js 15 (App Router) · React 19 · JavaScript · Tailwind CSS 4 · next-intl · Claude API (`@anthropic-ai/sdk`) · Turbopack · npm — no auth, `localStorage` persistence, one Route Handler as the only server-side code.

**Long-term target:** Node.js (Express → NestJS) + PostgreSQL + Prisma. The current data model is already designed as relational entities (stable IDs, explicit foreign keys, no document-style nesting) to migrate without a redesign — see `docs/11_DECISIONS.md`.

## Running it

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY to use the AI insight feature (optional)
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```text
app/[locale]/           App Router routes under the locale segment: dashboard, workouts/*, progress, settings
app/api/insight/        Route Handler that calls the Claude API server-side (ANTHROPIC_API_KEY)
i18n/                    next-intl routing/navigation config
messages/                UI-chrome translations (es.json, en.json)
middleware.js            locale detection/redirect
components/
  workouts/              live workout session UI
  dashboard/              home screen cards
  progress/               history and per-exercise progression
  settings/               local data backup
  ui/                     shared primitives (AppShell, Surface, SectionTitle, LanguageSwitcher)
data/
  exercises/              normalized catalog + per-(id, locale) translations.js + repository.js (composition layer)
  workout-plans.js         today's prescription (kept separate from the catalog, see docs/11_DECISIONS.md)
utils/                    localStorage read/write, suggestion and history calculations
docs/                     product and architecture documentation (start with VISION.md)
```

## Working process

This project is developed against documentation in `docs/`: every meaningful product or architecture decision is recorded in `docs/11_DECISIONS.md` with its rationale before being implemented, and `docs/13_TODO.md` / `docs/12_CHANGELOG.md` are kept current per sprint. `docs/00_INDEX.md` explains the recommended reading order.

## Built with Claude Code

Every feature in this repo — including the i18n migration and this README — was built in collaboration with [Claude Code](https://claude.com/claude-code), following the documented process above rather than ad hoc prompting: proposals before large changes, decisions recorded with their rationale, real data verified in a running browser before calling something done. `.ai/CLAUDE.md` is the operating brief Claude works from; `.ai/CHATGPT.md` and `.ai/CODEX.md` document the roles of the other assistants in the same workflow.
