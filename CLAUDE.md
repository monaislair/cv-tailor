# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Status

**No source code exists yet.** The repo contains only planning documents:
- `PROJECT_OVERVIEW.md` — product vision
- `BACKLOG.md` — full epic/story/task breakdown with sprint order
- `README.md` — placeholder portfolio README

When starting work, follow the sprint order in `BACKLOG.md`. Sprint 1 is initializing a Vite + React + TypeScript project in the repo root.

---

## Project Purpose

CV Tailor is an AI-powered CV tailoring app. Users paste a master professional profile once, then paste job descriptions to get: a tailored CV (exported as PDF) and personalized interview prep. All AI work is done by the Anthropic Claude API.

---

## Stack

- **React 18 + TypeScript** — strict mode
- **Tailwind CSS + shadcn/ui** — slate theme, initialized with `npx shadcn@latest init`
- **Vite** — dev server and build (`npm run dev`)
- **Parcel** — final single-file HTML artifact (`bash scripts/bundle-artifact.sh`)
- **Vercel** — hosting + serverless function for the API proxy
- **Anthropic Claude API** — model `claude-sonnet-4-20250514`, never called directly from the frontend

---

## Running the Project

```bash
npm install
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # Production build
bash scripts/bundle-artifact.sh  # Single-file HTML artifact
```

Local API key: create `.env.local` with `ANTHROPIC_API_KEY=your_key_here` (never commit this).

---

## Architecture

### Data Flow

```
User button click
  → component calls useClaudeAPI.callClaude(systemPrompt, userMessage)
    → POST /api/claude (Vercel serverless — holds the key)
      → api.anthropic.com/v1/messages
    → strip markdown fences → JSON.parse() → dispatch to AppContext
```

### Directory Layout (target)

```
api/
  claude.ts          # Vercel serverless proxy — API key lives here only
src/
  components/
    Layout/          # Shell, header, tab nav
    Profile/         # Master profile input and display
    JobAnalyzer/     # JD input + analysis display
    CVGenerator/     # Tailored CV output + PDF export
    InterviewPrep/   # Questions + angles display
  hooks/
    useClaudeAPI.ts  # Only file that calls /api/claude
    useAppState.ts   # AppContext + useReducer (global state)
  prompts/
    analyzeJob.ts    # Extracts structured JobAnalysis from raw JD
    generateCV.ts    # Produces tailored GeneratedCV from profile + analysis
    generatePrep.ts  # Produces 5 interview questions with angles
  types/
    index.ts         # MasterProfile, JobAnalysis, GeneratedCV, InterviewPrep, AppState, AppAction
  utils/
    pdfExport.ts
    formatCV.ts
  data/
    masterProfile.ts # Nico's profile as a constant (pre-load button only)
  App.tsx
```

### Global State

```typescript
interface AppState {
  masterProfile: MasterProfile | null;
  currentJob: JobAnalysis | null;
  generatedCV: GeneratedCV | null;
  interviewPrep: InterviewPrep | null;
  isLoading: boolean;
  error: string | null;
}
// Actions: SET_PROFILE | SET_JOB | SET_ANALYSIS | SET_CV | SET_PREP | SET_LOADING | SET_ERROR | CLEAR_ERROR
```

State lives in `AppContext` (React Context + `useReducer`). No Redux, no Zustand, no localStorage.

### API Proxy

`api/claude.ts` — copy this verbatim, do not modify:

```typescript
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", detail: String(error) });
  }
}
```

All components call `useClaudeAPI` → which calls `/api/claude` → never `api.anthropic.com` directly.

Frontend call shape:
```typescript
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1000;

await fetch("/api/claude", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: systemPrompt, messages: [{ role: "user", content: userMessage }] })
});
```

### Prompt Rules

All prompts live in `src/prompts/`. For each:
1. System prompt sets role, output format, and schema — instructs Claude to return **raw JSON only**, no fences
2. User message is a template that interpolates runtime data (profile text, JD text, analysis JSON)
3. `useClaudeAPI` strips any accidental markdown fences, calls `JSON.parse()` in a try/catch, surfaces failures via `SET_ERROR`

---

## Hard Constraints

- No auth, no backend, no database — React state only
- No `localStorage` or `sessionStorage`
- API calls only on explicit button clicks, never on keystrokes
- No features outside v1 scope (see `BACKLOG.md`) without updating this file
- `data/masterProfile.ts` is a convenience pre-load, not the default — textarea starts empty
- TypeScript strict mode — no `any` without a comment explaining why
- Components under 150 lines — extract if larger
- No `console.log` outside a `DEBUG` flag guard

---

## Styling

- Dark professional: slate/zinc backgrounds, white text, amber or emerald accent
- Distinctive font pairing from Google Fonts, imported in `index.html`
- No purple gradients
- Use shadcn/ui primitives — don't build inputs, buttons, cards, or tabs from scratch
- Desktop primary, tablet secondary

---

## Definition of Done

- Feature works as specified in `BACKLOG.md`
- `tsc --noEmit` passes with no errors
- Error states are visible and actionable to the user
- UI matches dark theme with consistent spacing
- No browser console errors
- Manually tested end-to-end
