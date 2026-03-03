# CV Tailor — Progress Tracker

> Quality confirmation document. Updated after every sprint or significant change.
> Cross-reference with `BACKLOG.md` for full task details.

---

## Current Status

**Active sprint:** Sprint 3 — Job Analyzer
**Last completed sprint:** Sprint 2 — State + Profile
**Build status:** ✅ Clean (`tsc --noEmit` + `vite build` pass with zero errors/warnings)
**Lint status:** ✅ Clean (`eslint .` passes)

---

## Sprint 1 — Project Foundation ✅ Complete

### Story 1.1 — Repository Setup
| Task | Status | Notes |
|---|---|---|
| Initialize GitHub repository (public) | ✅ Done | `github.com/monaislair/cv-tailor` |
| Add `.gitignore` | ✅ Done | Covers `node_modules`, `dist`, `*.local` |
| Initialize React + TypeScript with Vite | ✅ Done | React 19, Vite 7, TypeScript 5.9 strict |
| Install and configure Tailwind CSS 3.x | ✅ Done | Dark slate palette, amber accent |
| Install shadcn/ui with slate theme | ✅ Done | Manual setup — components.json, cn() utility, Tabs primitive |
| Configure path aliases (`@/` → `src/`) | ✅ Done | Both vite.config.ts and tsconfig.app.json |
| Verify dev server runs with no errors | ✅ Done | Build + type-check both clean |
| Add Google Fonts to index.html | ✅ Done | Space Grotesk (headings) + Inter (body) |

### Story 1.2 — Project Documentation
| Task | Status | Notes |
|---|---|---|
| Write `PROJECT_OVERVIEW.md` | ✅ Done | |
| Write `CLAUDE.md` | ✅ Done | Improved from original planning doc |
| Write `BACKLOG.md` | ✅ Done | |
| Write `README.md` | ✅ Done | Portfolio version — screenshot placeholder remains |
| Add `LICENSE` (MIT) | ✅ Done | MIT, Nicolás Duarte, 2026 |

### Story 1.3 — App Shell & Navigation
| Task | Status | Notes |
|---|---|---|
| Create `App.tsx` with tab-based navigation | ✅ Done | 4 tabs, typed `Tab` union |
| Create `Layout/Header` component | ✅ Done | Logo, brand name, tagline |
| Create placeholder components for each tab | ✅ Done | Replaced by real components in Sprint 2 |
| Implement tab switching with React state | ✅ Done | `useState<Tab>` in App.tsx |
| Active tab indicator animation | ✅ Done | Amber accent + 200ms transition + content fade-in |
| Keyboard navigation between tabs | ✅ Done | Radix handles arrow keys natively |

### Sprint 1 Quality Notes
- ✅ Zero TypeScript errors, strict mode enabled
- ✅ Zero ESLint violations — `no-console` rule enforced (allows `warn`/`error`)
- ✅ All components under 150 lines
- ✅ No inline font duplication — Space Grotesk applied via global CSS
- ✅ No `any` types anywhere
- ✅ `*.local` in `.gitignore` — API key safe

---

## Sprint 2 — State + Profile ✅ Complete

### Story 1.4 — Global State Setup
| Task | Status | Notes |
|---|---|---|
| Define all TypeScript types in `src/types/index.ts` | ✅ Done | Completed early in Sprint 1 |
| Create `AppContext` with `useReducer` | ✅ Done | `src/hooks/useAppState.tsx` |
| Implement all actions | ✅ Done | SET_PROFILE resets downstream state (job, CV, prep) |
| Wrap `App.tsx` with context provider | ✅ Done | `AppProvider` wraps full app |
| Create `useAppState` hook | ✅ Done | Throws if used outside provider |

### Story 1.5 — Claude API Hook
| Task | Status | Notes |
|---|---|---|
| Create `src/hooks/useClaudeAPI.ts` | ✅ Done | |
| Implement `callClaude(systemPrompt, userMessage)` | ✅ Done | Returns `unknown` — callers cast to their type |
| Handle loading state | ✅ Done | SET_LOADING dispatched on start and finally |
| Handle API errors with user-friendly messages | ✅ Done | Error message extracted from Error or falls back to generic string |
| Strip markdown fences from response | ✅ Done | Regex strips ` ```json ` and ` ``` ` wrappers |
| Parse JSON safely with try/catch | ✅ Done | Throws with user-friendly message on parse failure |

### Story 2.1 — Profile Input
| Task | Status | Notes |
|---|---|---|
| Create real `ProfileTab` component | ✅ Done | Replaces placeholder entirely |
| Add textarea for raw profile paste | ✅ Done | 72-character-high, focus ring, placeholder text |
| Add "Save Profile" button | ✅ Done | Disabled when textarea is empty |
| On save: store in global state | ✅ Done | Dispatches `SET_PROFILE` |
| Show success confirmation | ✅ Done | Animated "Saved" badge, auto-dismisses after 2.5s |
| Character count indicator | ✅ Done | Live count below textarea |

### Story 2.2 — Profile Display
| Task | Status | Notes |
|---|---|---|
| Show profile in read-only view after saving | ✅ Done | `<pre>` block with card styling |
| Add "Edit Profile" button | ✅ Done | Returns to edit mode |

### Story 2.3 — Profile Pre-load
| Task | Status | Notes |
|---|---|---|
| Create `src/data/masterProfile.ts` | ✅ Done | ⚠️ Contains placeholder — fill with real profile |
| Add "Load My Profile" button | ✅ Done | Amber accent, fills textarea on click |

### Sprint 2 Quality Notes
- ✅ Zero TypeScript errors
- ✅ Zero ESLint violations
- ✅ No `any` types
- ✅ All components under 150 lines
- ✅ API only called on explicit button click (no keystroke triggers)
- ✅ Setting a new profile resets downstream state (job analysis, CV, prep) — prevents stale data
- ⚠️ `src/data/masterProfile.ts` has placeholder text — needs Nico's real profile before Sprint 2.3 is truly complete

---

## Sprint 3 — Job Analyzer 🔄 Next

### Story 3.1 — Job Description Input
| Task | Status | Notes |
|---|---|---|
| Create real `JobAnalyzerTab` component | ⬜ Todo | Replace placeholder |
| Add textarea for job description | ⬜ Todo | |
| Add "Analyze Job" button | ⬜ Todo | |
| Validate: require profile before analyzing | ⬜ Todo | |
| Show loading state | ⬜ Todo | |

### Story 3.2 — Job Analysis Prompt
| Task | Status | Notes |
|---|---|---|
| Create `src/prompts/analyzeJob.ts` | ⬜ Todo | |
| Write system prompt + schema | ⬜ Todo | |
| Write user message template | ⬜ Todo | |
| Test with 3 real job descriptions | ⬜ Todo | Manual prompt acceptance criteria per BACKLOG.md |

### Story 3.3 — Job Analysis Display
| Task | Status | Notes |
|---|---|---|
| Display job title + company | ⬜ Todo | |
| Required skills as badges | ⬜ Todo | |
| Preferred skills as badges (different colour) | ⬜ Todo | |
| Key responsibilities as list | ⬜ Todo | |
| ATS keywords as highlighted tags | ⬜ Todo | |

---

## Sprints 4–6 — Not Started

| Sprint | Scope | Status |
|---|---|---|
| Sprint 4 | Epic 4 — CV Generator + PDF export | ⬜ Not started |
| Sprint 5 | Epic 5 — Interview Prep | ⬜ Not started |
| Sprint 6 | Epic 6 — Polish + Vercel deploy | ⬜ Not started |

---

## Intentionally Missing (by design)

| Item | Reason |
|---|---|
| `api/claude.ts` (Vercel proxy) | Sprint 6 — not needed until deployment |
| `src/prompts/` (all 3 files) | Sprints 3–5 |
| `src/utils/pdfExport.ts` | Sprint 4 |
| `src/utils/formatCV.ts` | Sprint 4 |
| `scripts/bundle-artifact.sh` + Parcel | Sprint 6 |
| `@vercel/node` dev dependency | Sprint 6 — needed when proxy is written |
| README screenshot | After first working build |
| Vercel deployment | Sprint 6 |

---

## Known Gaps (unintentional — to fix)

| Item | Status |
|---|---|
| `src/data/masterProfile.ts` — placeholder content | ⚠️ Needs Nico's real profile pasted in |

---

## Hard Constraints Checklist

| Constraint | Status |
|---|---|
| No auth, backend, or database | ✅ |
| No `localStorage` or `sessionStorage` | ✅ |
| API calls only on button clicks | ✅ |
| TypeScript strict mode, no `any` | ✅ |
| Components under 150 lines | ✅ |
| No `console.log` (ESLint enforced) | ✅ |
| Dark professional theme | ✅ |
| shadcn/ui primitives only | ✅ |
| API key never in client code | ✅ |
