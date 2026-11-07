# Kuiper improvement plan

Last updated: 2026-11-07. Working rules (approvals, task specs, acceptance criteria) are in [`CLAUDE.md`](./CLAUDE.md); product principles are in [`docs/VISION.md`](./docs/VISION.md).

## The core problem

The app doesn't record what the user actually lifts. The live session has no weight or reps input, so every completed set stores the numbers prescribed in `data/workout-plans.js`. Progress, personal records and weight suggestions are therefore built on the plan, not on real training — which contradicts the first non-negotiable in `docs/VISION.md`: never show invented data.

The plan fixes that first, after putting a safety net in place. No new features until then.

## Known issues (from the 2026-11-07 review)

| Issue | Consequence |
|---|---|
| Logged sets store the plan's numbers | Progress, PRs and suggestions reflect the plan, not real lifts |
| Weight suggestions can't respond | No plan's `repsCompleted` is below its rep minimum, so "hold" and "reduce" never trigger, and suggestions are never applied |
| History breaks in English | Sets are saved under the localized name, but history is looked up in Spanish |
| Sets have no session or exercise ID | Grouped by UTC day: a session crossing 7 pm at UTC-5 counts as two, two same-day sessions merge |
| History can be wiped | Corrupted JSON reads as an empty list, and the next save overwrites everything |
| Sessions don't survive a reload | Session state lives only in React state |
| Gym basics missing | No wake lock, rest-end alert, manifest or service worker |
| No safety net | No tests or CI; `WorkoutSessionFlow.js` is 860 lines |
| Single-user setup | Weights live in source code, and "today" is always `espalda-biceps` |
| `localStorage` is per web address | Changing domain hides history; Vercel preview URLs start empty |

## Order of work

One task at a time, each with an approved spec (goal, changes, out of scope, tests, acceptance criteria) and tested on a Vercel preview before merging.

| # | Task | What it includes | Done when |
|---|---|---|---|
| 1 | **Upgrade Next** | 15.5.19 → 15.5.29, nothing else installed | Lint and build pass, routes behave as before, owner validates the preview |
| 2 | **Pause insights** | Feature flag; hide the card; route returns 503; no code deleted | Card hidden, route makes no Anthropic call |
| 3 | **Tests and CI** | Tests for suggestion, history and storage logic (including today's bugs); a check that main pages load; CI runs tests and lint on every push | CI is green on GitHub |
| 4 | **Safer local storage** | Corrupted data can't wipe history; handle full storage; automatic backup before import | Corrupted-data tests lose nothing |
| 5 | **Real logging** | Weight and reps per set (prefilled, one tap if unchanged); v2 data format with `sessionId`, `exerciseId`, planned vs. actual, optional RIR; migrate old records labeled as plan values; rewrite suggestions | What's saved is what was lifted, and logging is fast in the gym |
| 6 | **Database, login and sync** | Postgres + Prisma, sign-in (Google + email code), upload queue, migration of local history | A set logged without signal uploads later, never duplicated or lost |
| 7 | **Gym reliability** | Installable app, resume a session, wake lock, rest alert | A reload mid-workout keeps your place |
| 8 | **Four-week real test** | Train with it, ideally on two devices | Problems found are fixed |
| 9 | **Smarter features and other users** | Re-enable insights (with history, behind login), editable plans, a real "today" | Defined when we get there |

Status: tasks 1 and 2 are implemented on branch `chore/upgrade-next-15.5.29`, waiting for the owner's preview check and confirmation.

**Not yet:** Nutrition, AI Coach, NestJS, TypeScript, Next 16, or a bigger catalog.

## How data stays safe (task 6 onward)

- **Phone first:** every set is saved locally the moment it's tapped; training never waits on the network.
- **Then the server:** a background queue uploads sets and only clears them once the server confirms.
- **No duplicates:** each set gets a unique ID on the device, so a retry can't save it twice.
- **No overwrites:** edits and deletes are recorded, not erased.
- **Backups:** point-in-time recovery plus a scheduled backup stored elsewhere, a practice restore before relying on it, and JSON export for users.
- **Login stays out of the way:** the app works without an account; an expired session never blocks logging; logout warns about unsynced sets.
- **Hosting:** Next.js Route Handlers on Vercel (approval needed, since `docs/VISION.md` names Express), pooled Postgres connections, separate production and preview databases, migrations as a controlled step.

## Main risks

1. **Logging adds friction mid-workout** — prototype it in the gym before building it.
2. **Real data can make suggestions worse** — the latest set is usually the most fatigued; 10% jumps are large; 0.5 kg rounding ignores real dumbbell steps; PRs ignore reps. Rewrite them in task 5 and never apply them automatically.
3. **Migration can destroy the only copy** — export first and test on a copy.
4. **Old history can't be repaired** — label it as plan values, not real lifts.
5. **Changing domain hides local data** — export before any domain change.
6. **Sync can fail silently** — test with no signal and two devices; show a visible synced/pending state.
7. **Safari can clear storage** for sites unused for 7 days (installed home-screen apps are exempt) — another reason sync can't wait too long.
8. **Process can replace progress** — keep docs few; refactor only code already being changed.

## Open decisions

- Remaining transitive audit entries after the Next upgrade (`postcss` via Next, `sharp`, `source-map-js`) — fix separately or accept for now.
- Test runner for task 3 (Vitest recommended; new dev dependency, needs approval).
- Route Handlers instead of Express for the backend.
- Sign-in methods (Google + email code recommended).
