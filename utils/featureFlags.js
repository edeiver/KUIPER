// Single place to turn whole features on or off without deleting their code.
// Read by both server code (Route Handlers) and client components, so a
// flag stays a plain constant — no environment variable to keep in sync
// between Vercel and local setups.

// AI session insight (app/api/insight): paused until the product has tests
// and reliable data storage — see docs/11_DECISIONS.md. Set back to `true`
// to re-enable both the summary card and the API route.
export const INSIGHTS_ENABLED = false;
