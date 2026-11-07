# Working rules

These rules apply to anyone working on this project, human or AI. Product vision and principles live in `docs/VISION.md`; role details for AI assistants live in `.ai/`.

## Approval

1. Do not change anything without the owner's approval. That covers files, commits, pushes, merges, deploys and settings.
2. Do not install, upgrade or remove anything without the owner's approval.
3. Approval covers only the task that was approved. If something beyond it is needed, stop and ask.
4. Reading code and running checks that change nothing needs no approval. Builds and test runs that write output do need approval, which a task can include.

## Every task has a written spec, approved before work starts

- **Goal:** what changes, in one or two sentences.
- **Changes:** the files affected and any dependencies.
- **Out of scope:** what this task won't touch.
- **Tests:** what gets tested, written first where possible, so they fail before the fix and pass after it.
- **Acceptance criteria:** specific pass/fail checks.

Checks that can't be automated, such as how a screen feels mid-workout, go in the spec as manual steps, with who does them.

## A task is done only when

- All tests and criteria pass, and the actual results have been shown, including anything that failed or was skipped.
- The owner confirms it. Work can be reported as ready, but only the owner calls it done.

## Pull requests

1. After the owner approves a task's changes, push its branch and open a PR. Only the owner merges.
2. The PR description includes:
   - **Summary:** what changed and why, with one line per commit.
   - **Tests:** which tests were added or changed, the result of running them, and anything marked as a known failure, with the reason.
   - **Acceptance criteria:** every criterion from the approved spec, as a checklist. A box is checked only if it was verified, with how it was verified. Unchecked boxes say why, and who checks them.
   - **Known issues:** anything accepted for now, and why.
   - **Out of scope:** what this PR deliberately doesn't touch.
