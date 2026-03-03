# CV Tailor — Project Overview

## What This Is

CV Tailor is an AI-powered job application assistant built by Nicolás Duarte as a portfolio project demonstrating practical LLM integration, product thinking, and modern frontend development.

The app solves a real, personal problem: applying to multiple jobs requires tailoring your CV for each role — which is time-consuming, repetitive, and cognitively expensive. CV Tailor eliminates that friction by using Claude (Anthropic) to intelligently match a master profile against any job description, generating a tailored CV and interview prep in seconds.

---

## Why This Exists (The Real Problem)

Manual CV tailoring creates:
- **Decision fatigue** — what to include, what to cut, what to emphasize
- **Inconsistency** — different versions diverge, become hard to track
- **Time cost** — 30–60 min per application for a good human doing it well
- **Missed signal** — humans miss keyword patterns that ATS systems catch

CV Tailor solves all four.

---

## Who This Is For

**Primary user:** Nicolás Duarte (personal use + portfolio demonstration)  
**Secondary audience:** Hiring managers and technical interviewers evaluating his portfolio — they will *use* the app and see what it can do.

---

## Strategic Value as Portfolio

This project demonstrates:

| Skill | How It Shows |
|---|---|
| AI/LLM Integration | Live Claude API calls proxied through a serverless function |
| Prompt Engineering | Structured prompts with defined schemas, acceptance criteria, and iteration discipline — not just API wrappers |
| Product Thinking | Full user workflow, not just a demo |
| Frontend Development | React, clean UI, PDF generation |
| Systems Design | Modular architecture with clear separation of concerns |
| Security Awareness | API key never exposed client-side — serverless proxy pattern |
| Real-World Problem Solving | Solves an actual pain point with measurable output |

---

## Core Features

### 1. Master Profile
A one-time setup: paste or import your full professional profile. This is the source of truth the AI draws from for every tailoring operation. Persists in app state.

### 2. Job Analyzer
Paste any job description. The AI extracts:
- Required skills (hard)
- Preferred skills (soft)
- Key responsibilities
- Seniority signals
- Industry/domain context
- ATS keywords to hit

### 3. CV Generator
The AI matches your master profile against the analyzed job and produces:
- A tailored professional summary (3–5 lines)
- Reordered / reweighted experience bullets
- Skills section optimized for the role
- Clean formatted output ready to copy or export as PDF

### 4. Interview Prep
Based on the same job analysis, generates:
- 5 likely interview questions
- Your recommended angle for each (based on your actual experience)
- One key story or example to prepare per question

### 5. Application Tracker *(v2 scope)*
Track which roles you've applied to, status, and which CV version was used.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| AI | Anthropic Claude API (claude-sonnet-4-20250514) |
| PDF Export | react-to-pdf or html2pdf.js |
| Bundling | Vite + Parcel (single-file artifact) |
| Hosting | Vercel (free tier) |
| Source Control | GitHub (public repo — portfolio visibility) |

---

## Out of Scope (v1)

- User authentication / multi-user
- Database / backend persistence
- ATS simulation scoring
- LinkedIn scraping
- Cover letter generation *(v2)*

---

## Success Criteria

- [ ] App loads in under 3 seconds on a standard connection (test with Chrome DevTools throttled to Fast 3G)
- [ ] Full pipeline (profile → job → CV + prep) completes in under 60 seconds on a standard connection
- [ ] PDF passes ATS parse test on resumeworded.com with score ≥ 85
- [ ] App is live on a public Vercel URL with no console errors
- [ ] GitHub repo is public with completed README including screenshot
- [ ] Demo script written and rehearsed at least once — full flow demoed in under 2 minutes
- [ ] API key is never exposed in client-side code or git history (verify with `git log -S "ANTHROPIC"`)
