# Testing

Jungle Quiz uses two test layers:

- `tests/unit/` covers catalog integrity, composables, persistence and
  deterministic game rules with Vitest.
- `tests/e2e/` covers the critical browser flow with Playwright: setup, six
  categories, resolving a question and persistence after reload.

Run the checks with:

```bash
pnpm test          # fast unit tests
pnpm test:watch    # unit tests while developing
pnpm test:e2e      # browser smoke tests
pnpm test:all      # typecheck + unit + browser tests
```

For future features, add a unit test for new state or selection logic and an
E2E assertion when the feature changes a real user flow. Keep browser tests
focused on outcomes rather than component internals.
