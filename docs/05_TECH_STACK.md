# Tech Stack

## Current (frontend-only, local storage)

- Next.js
- React
- JavaScript
- Tailwind CSS
- next-intl (ES/EN locale routing and translations — see `docs/11_DECISIONS.md`)
- `@anthropic-ai/sdk` (Claude API, server-side only — see `docs/11_DECISIONS.md`)
- npm

## Planned (long-term target)

- Frontend: Next.js (unchanged)
- Backend: Node.js — Express initially, with a path to migrate to NestJS
- Database: PostgreSQL
- ORM: Prisma

**Not Firebase.** Hércules's long-term backend is a custom Node.js service over PostgreSQL via Prisma, not a Firebase/NoSQL backend. Data models (starting with the exercise catalog, see `docs/11_DECISIONS.md`) are designed as relational entities from the start so they can migrate to Prisma models without a redesign.
