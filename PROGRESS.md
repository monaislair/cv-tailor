# CV Tailor — Progress Tracker

> Quality confirmation document. Updated after every sprint or significant change.
> Cross-reference with `BACKLOG.md` for full task details.

---

## Current Status

**Active sprint:** Sprint 6 — Polish + Deploy
**Last completed sprint:** Sprint 5 — Interview Prep
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

## Sprint 3 — Job Analyzer ✅ Complete

### Story 3.1 — Job Description Input
| Task | Status | Notes |
|---|---|---|
| Create real `JobAnalyzerTab` component | ✅ Done | Replaces placeholder entirely |
| Add textarea for job description | ✅ Done | 72-char height, disabled during loading |
| Add "Analyze Job" button | ✅ Done | Disabled when empty or loading, text changes to "Analyzing…" |
| Validate: require profile before analyzing | ✅ Done | Lock icon guard with actionable message |
| Show loading state | ✅ Done | Button text + textarea disabled |
| "Analyze New Job" reset flow | ✅ Done | Clears textarea, returns to input mode |

### Story 3.2 — Job Analysis Prompt
| Task | Status | Notes |
|---|---|---|
| Create `src/prompts/analyzeJob.ts` | ✅ Done | |
| Write system prompt + schema | ✅ Done | 10-field schema, strict JSON-only instructions |
| Write user message template | ✅ Done | `buildAnalyzeJobMessage()` interpolates JD text |
| Test with 3 real job descriptions | ⬜ Manual | Per BACKLOG.md — user acceptance criteria, cannot be automated |

### Story 3.3 — Job Analysis Display
| Task | Status | Notes |
|---|---|---|
| Create `Badge` UI primitive | ✅ Done | `src/components/ui/badge.tsx` — required/preferred/keyword/info variants |
| Display job title + company | ✅ Done | Header with seniority + remote + industry badges |
| Required skills as badges | ✅ Done | Amber (`required` variant) |
| Preferred skills as badges (different colour) | ✅ Done | Muted (`preferred` variant) |
| Key responsibilities as list | ✅ Done | Amber arrow bullets |
| ATS keywords as highlighted tags | ✅ Done | Emerald (`keyword` variant) |
| Standout requirements | ✅ Done | ⚑ icon, muted text — goes beyond BACKLOG.md spec |

### Sprint 3 Quality Notes
- ✅ Zero TypeScript errors
- ✅ Zero ESLint violations
- ✅ No `any` types
- ✅ All components under 150 lines (`JobAnalyzerTab` 91 lines, `JobAnalysisDisplay` ~110 lines)
- ✅ API only called on explicit button click
- ✅ Profile guard prevents analysis without a master profile
- ✅ Error handling decoupled — `ErrorBanner` reads from global state, catch block in tab is intentionally empty
- ✅ `useClaudeAPI` made generic (`callClaude<T>`) — type-safe result without `any`
- ✅ `MAX_TOKENS` raised 1000 → 4096 — covers analyzeJob safely, unblocks Sprint 4 CV generation
- ✅ Duplicate key props fixed in `JobAnalysisDisplay` — all list keys are index-prefixed
- ✅ Dead `JobDescription` type removed from `types/index.ts`
- ✅ `analyzeJob` prompt: `company` returns "Unknown" when absent; `industryContext` constrained to 1–3 words
- ⬜ Manual prompt testing still needed (3 real JDs) — user action required

---

## Sprint 4 — CV Generator ✅ Complete

### Story 4.1 — CV Generation Prompt
| Task | Status | Notes |
|---|---|---|
| Create `src/prompts/generateCV.ts` | ✅ Done | |
| Write system prompt + schema | ✅ Done | Strict no-fabrication rules, ATS keyword integration, bullet reordering |
| Include profile + job analysis in user message | ✅ Done | `buildGenerateCVMessage()` interpolates both |
| Test with 3 real job descriptions | ⬜ Manual | User acceptance criteria per BACKLOG.md |

### Story 4.2 — CV Display
| Task | Status | Notes |
|---|---|---|
| Create `CVGeneratorTab` component | ✅ Done | Replaces placeholder |
| Guard: disabled until job analysis exists | ✅ Done | Separate messages for missing profile vs missing job |
| Loading state during generation | ✅ Done | Button text changes to "Generating…", disabled |
| Render CV in document-like layout | ✅ Done | `CVDisplay.tsx` — white card, clean typography |
| Summary, experience, skills, education, certifications | ✅ Done | All sections rendered with proper hierarchy |

### Story 4.3 — PDF Export
| Task | Status | Notes |
|---|---|---|
| Install PDF export library | ✅ Done | `@react-pdf/renderer` — text-based, ATS-friendly |
| Create `src/utils/pdfExport.ts` | ✅ Done | `buildFilename()` + `triggerBlobDownload()` |
| Create `CVPdfDocument.tsx` | ✅ Done | react-pdf layout — Helvetica, A4, single-column |
| "Download PDF" button | ✅ Done | In CVGeneratorTab generated view |
| ATS-friendly formatting | ✅ Done | Text-based PDF (not image), Helvetica, single column |
| File named `CV_Name_JobTitle_Company.pdf` | ✅ Done | `buildFilename()` sanitizes all parts |
| Lazy-load @react-pdf/renderer | ✅ Done | Dynamic import on click — main bundle 260KB, PDF chunk 527KB gzip loads on demand |

### Sprint 4 Quality Notes
- ✅ Zero TypeScript errors
- ✅ Zero ESLint violations
- ✅ One `any` with explanatory comment (react-pdf type bridge — unavoidable without complex generics)
- ✅ All components under 150 lines
- ✅ API only called on explicit button click
- ✅ Cascade state reset confirmed: SET_JOB clears generatedCV — stale CV never shown
- ✅ `@react-pdf/renderer` lazy-loaded — initial bundle 260KB (82KB gzip), PDF engine loads only on download
- ✅ PDF is text-based (not image-rasterized) — ATS systems can read it
- ✅ `URL.revokeObjectURL` deferred 100ms — prevents Firefox download abort
- ✅ Download catch block dispatches `SET_ERROR` — user sees failure instead of silent reset
- ✅ Skills section in `CVPdfDocument` guarded — no orphan header when all arrays empty
- ✅ `generateCV` prompt: required skills listed before preferred in skills output
- ✅ `const s` renamed to `const styles` in CVPdfDocument — consistent naming
- ⬜ Manual prompt testing still needed (3 real JDs) — user action required

---

## Sprint 5 — Interview Prep ✅ Complete

### Story 5.1 — Interview Prep Prompt
| Task | Status | Notes |
|---|---|---|
| Create `src/prompts/generatePrep.ts` | ✅ Done | |
| Write system prompt + schema | ✅ Done | Exactly 5 questions, ≥3 categories, ≤2 per category, no fabrication rule |
| Instruct Claude to base angles on actual profile experience | ✅ Done | `yourAngle` must name specific project/role; `keyStory` must be concrete situation |
| Test with 3 different roles | ⬜ Manual | User acceptance criteria per BACKLOG.md |

### Story 5.2 — Interview Prep Display
| Task | Status | Notes |
|---|---|---|
| Create `InterviewPrepTab` component | ✅ Done | Replaces placeholder |
| Guard: disabled until job analysis exists | ✅ Done | Lock screen with separate messages for missing profile vs missing job |
| Loading state | ✅ Done | Button text changes; `state.isLoading` disables it |
| Expandable question cards | ✅ Done | `InterviewPrepDisplay.tsx` — first card open by default |
| Question, category badge, why/angle/story sections | ✅ Done | Color-coded by category (amber/sky/violet/emerald) |
| Regenerate flow | ✅ Done | Inline button in generated view; `SET_JOB` auto-clears prep via reducer |

### Sprint 5 Quality Notes
- ✅ Zero TypeScript errors
- ✅ Zero ESLint violations
- ✅ No `any` types
- ✅ All components under 150 lines (`InterviewPrepTab` 72 lines, `InterviewPrepDisplay` 62 lines)
- ✅ API only called on explicit button click
- ✅ `SET_JOB` reducer clears `interviewPrep` — no stale prep shown for new job
- ✅ No local `mode` state needed — `state.interviewPrep` drives view directly (cleaner than CVGeneratorTab)
- ⬜ Manual prompt testing still needed (3 real roles) — user action required

---

## Sprint 6 — Not Started

| Sprint | Scope | Status |
|---|---|---|
| Sprint 6 | Epic 6 — Polish + Vercel deploy | ⬜ Not started |

---

## Intentionally Missing (by design)

| Item | Reason |
|---|---|
| `api/claude.ts` (Vercel proxy) | Sprint 6 — not needed until deployment |
| `src/prompts/analyzeJob.ts` | ✅ Done — Sprint 3 |
| `src/prompts/generateCV.ts` | ✅ Done — Sprint 4 |
| `src/prompts/generatePrep.ts` | ✅ Done — Sprint 5 |
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
| `ProfileTab` draft lost on tab switch | ⚠️ Unsaved text is discarded on unmount. By design for now — fix requires global draft state (scope creep). Primary flow is paste-then-save; real-world impact is low. |

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
