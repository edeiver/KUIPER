# TODO

- Workout MVP
- Exercise DB — Planned
- Progress
- Nutrition

## Technical debt

- **`TodayWorkoutCard` loads the full exercise catalog just for a 4-field summary.** Since Phase 4 of the "catalog as single source of truth" migration, `components/dashboard/TodayWorkoutCard.js` imports `getWorkoutSummary`/`espaldaBicepsPlan` from `data/workout-plans.js`, which resolves the *entire* plan (technique steps, mistakes, cues, alternatives for all 6 exercises) just to display `exerciseCount`, `estimatedDurationMinutes`, `totalVolume`, and `difficulty`. Home's bundle grew from 5.52 kB to 13.6 kB because of this. Not fixed now — logged here for later. Possible future solutions: (a) split lightweight plan/exercise metadata (name, sets, reps, weight, difficulty — enough for any summary) from the full catalog detail (instructions, mistakes, cues, alternatives, media), so a summary view never needs to resolve the heavy fields; or (b) add a dedicated summary selector/query that reads only the scalar fields it needs instead of going through the full `getExerciseById`/`resolvePlan` composition. Relevant when the catalog grows past a handful of exercises and/or when this data source moves to a real backend (`docs/VISION.md` §10) where a lightweight query becomes trivial (`SELECT` only the needed columns) but doesn't exist yet in the in-memory array version.
