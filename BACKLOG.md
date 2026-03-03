# CV Tailor — Product Backlog

**Format:** Epic → Story → Tasks  
**Status labels:** `[ ]` todo · `[~]` in progress · `[x]` done  
**Priority:** 🔴 critical · 🟡 important · 🟢 nice to have

---

## EPIC 1 — Project Foundation
*Everything needed before a single feature works. Do this first.*

---

### Story 1.1 — Repository Setup
**As a developer, I want a clean, well-structured repo so the project is legible to anyone who looks at it.**

- [ ] 🔴 Initialize GitHub repository (public, name: `cv-tailor`)
- [ ] 🔴 Add `.gitignore` (Node, build artifacts, env files)
- [ ] 🔴 Initialize React + TypeScript project with Vite
- [ ] 🔴 Install and configure Tailwind CSS 3.x
- [ ] 🔴 Install shadcn/ui and initialize with slate theme
- [ ] 🔴 Configure path aliases (`@/` → `src/`)
- [ ] 🔴 Verify dev server runs with no errors
- [ ] 🟡 Add Google Fonts import to `index.html` (display + body font pair)

---

### Story 1.2 — Project Documentation
**As a portfolio reviewer, I want clear documentation so I understand what this project is and how to run it.**

- [x] 🔴 Write `PROJECT_OVERVIEW.md`
- [x] 🔴 Write `CLAUDE.md`
- [x] 🔴 Write `BACKLOG.md` (this file)
- [ ] 🔴 Write `README.md` with: project description, live demo link, tech stack, how to run locally, screenshots (add after UI is built)
- [ ] 🟡 Add `LICENSE` (MIT)

---

### Story 1.3 — App Shell & Navigation
**As a user, I want a clear navigation structure so I know where I am and how to move through the app.**

- [ ] 🔴 Create `App.tsx` with tab-based navigation (Profile, Analyze Job, Generate CV, Interview Prep)
- [ ] 🔴 Create `Layout` component: header with app name + nav tabs
- [ ] 🔴 Create empty placeholder components for each tab
- [ ] 🔴 Implement tab switching with React state
- [ ] 🟡 Add active tab indicator animation
- [ ] 🟡 Add keyboard navigation between tabs (arrow keys)

---

### Story 1.4 — Global State Setup
**As a developer, I want centralized state management so data flows cleanly between tabs.**

- [ ] 🔴 Define all TypeScript types in `src/types/index.ts`
  - `MasterProfile`
  - `JobDescription`
  - `JobAnalysis`
  - `GeneratedCV`
  - `InterviewPrep`
  - `AppState`
  - `AppAction`
- [ ] 🔴 Create `AppContext` with `useReducer`
- [ ] 🔴 Implement actions: `SET_PROFILE`, `SET_JOB`, `SET_ANALYSIS`, `SET_CV`, `SET_PREP`, `SET_LOADING`, `SET_ERROR`, `CLEAR_ERROR`
- [ ] 🔴 Wrap `App.tsx` with context provider
- [ ] 🔴 Create `useAppState` hook for consuming context

---

### Story 1.5 — Claude API Hook
**As a developer, I want a single, reusable API hook so all Claude calls are consistent and easy to manage.**

- [ ] 🔴 Create `src/hooks/useClaudeAPI.ts`
- [ ] 🔴 Implement `callClaude(systemPrompt, userMessage)` function
- [ ] 🔴 Handle loading state
- [ ] 🔴 Handle API errors with user-friendly messages
- [ ] 🔴 Strip markdown fences from response before returning
- [ ] 🔴 Parse JSON responses safely with try/catch
- [ ] 🟡 Add response logging in dev mode only

---

## EPIC 2 — Master Profile
*The source of truth. Everything else depends on this being good.*

---

### Story 2.1 — Profile Input
**As a user, I want to input my professional profile once and have it available throughout the app.**

- [ ] 🔴 Create `ProfileTab` component
- [ ] 🔴 Add large textarea for raw profile paste
- [ ] 🔴 Add "Save Profile" button
- [ ] 🔴 On save: store profile text in global state
- [ ] 🔴 Show success confirmation when saved
- [ ] 🟡 Add character count indicator
- [ ] 🟡 Persist profile in memory across tab switches (already handled by global state)

---

### Story 2.2 — Profile Display
**As a user, I want to see my saved profile clearly so I can verify it was captured correctly.**

- [ ] 🔴 After saving, show profile in read-only view
- [ ] 🔴 Add "Edit Profile" button to return to edit mode
- [ ] 🟡 Show profile as formatted sections (Summary, Experience, Skills, Education)
- [ ] 🟢 Add profile completeness indicator (what sections are present)

---

### Story 2.3 — Master Profile Pre-load (Nico's Data)
**As the primary user, I want my actual profile pre-loaded so I don't have to paste it every session.**

- [ ] 🔴 Create `src/data/masterProfile.ts` with Nico's full profile as a constant
- [ ] 🔴 Add "Load My Profile" quick-fill button in ProfileTab
- [ ] 🔴 On click: populate textarea with master profile data

*Note: This is for personal use convenience. For portfolio demo, leave textarea empty so reviewers see the flow.*

---

## EPIC 3 — Job Analyzer
*The intelligence layer. This is where Claude does its first job.*

---

### Story 3.1 — Job Description Input
**As a user, I want to paste a job description and have the app extract what matters.**

- [ ] 🔴 Create `JobAnalyzerTab` component
- [ ] 🔴 Add textarea for job description paste
- [ ] 🔴 Add "Analyze Job" button
- [ ] 🔴 Validate: require profile to be saved before analyzing (show prompt if not)
- [ ] 🔴 Show loading state while Claude processes

---

### Story 3.2 — Job Analysis Prompt
**As a developer, I want a well-engineered prompt that reliably extracts structured job data.**

- [ ] 🔴 Create `src/prompts/analyzeJob.ts`
- [ ] 🔴 Define output schema:
  ```json
  {
    "jobTitle": "string",
    "company": "string",
    "seniorityLevel": "junior | mid | senior | lead | director",
    "requiredSkills": ["string"],
    "preferredSkills": ["string"],
    "keyResponsibilities": ["string"],
    "atsKeywords": ["string"],
    "industryContext": "string",
    "remotePolicy": "remote | hybrid | onsite | unspecified",
    "standoutRequirements": ["string"]
  }
  ```
- [ ] 🔴 Write system prompt instructing Claude to return only valid JSON
- [ ] 🔴 Write user message template that includes job description
- [ ] 🔴 Test prompt with 3 different real job descriptions
- [ ] 🟡 Iterate prompt if output quality is inconsistent

**Prompt Acceptance Criteria:** Output passes if — JSON parses cleanly (no markdown fences), all required fields populated, no hallucinated skills or responsibilities not present in the JD, seniority level correctly inferred, ATS keywords reflect actual JD language (not generic filler terms).

**Test Protocol:** For each of the 3 test runs — paste the JD and the JSON output side by side. Manually verify: (1) every skill in `requiredSkills` appears verbatim or near-verbatim in the JD, (2) `atsKeywords` contains terms from the JD not invented by the model, (3) JSON.parse() succeeds with no preprocessing. If any check fails, iterate the prompt before moving on.

---

### Story 3.3 — Job Analysis Display
**As a user, I want to see the extracted job analysis clearly so I can verify accuracy before generating.**

- [ ] 🔴 Display extracted job title and company prominently
- [ ] 🔴 Show required skills as badges/tags
- [ ] 🔴 Show preferred skills as badges (different color)
- [ ] 🔴 Show key responsibilities as a clean list
- [ ] 🔴 Show ATS keywords as highlighted tags
- [ ] 🟡 Show seniority level indicator
- [ ] 🟡 Show remote policy badge
- [ ] 🟢 Allow user to edit/remove individual extracted items

---

## EPIC 4 — CV Generator
*The main event. This is what users came for.*

---

### Story 4.1 — CV Generation Prompt
**As a developer, I want a prompt that produces a genuinely tailored, high-quality CV.**

- [ ] 🔴 Create `src/prompts/generateCV.ts`
- [ ] 🔴 Define output schema:
  ```json
  {
    "name": "string",
    "contact": { "email": "string", "phone": "string", "linkedin": "string", "location": "string" },
    "summary": "string",
    "experience": [{
      "title": "string",
      "company": "string",
      "period": "string",
      "bullets": ["string"]
    }],
    "skills": { "technical": ["string"], "tools": ["string"], "soft": ["string"] },
    "education": [{ "degree": "string", "institution": "string", "period": "string" }],
    "certifications": ["string"]
  }
  ```
- [ ] 🔴 Write system prompt: role, tailoring instructions, tone, ATS optimization rules
- [ ] 🔴 Include both master profile and job analysis in user message
- [ ] 🔴 Instruct Claude to: reorder bullets by relevance, use job's language, hit ATS keywords naturally
- [ ] 🔴 Test with 3 real job descriptions — evaluate output quality
- [ ] 🟡 Iterate prompt for consistency

**Prompt Acceptance Criteria:** Output passes if — JSON parses cleanly, summary uses vocabulary from the JD (not just the master profile), experience bullets are reordered with most relevant first, no experience is fabricated beyond what's in the profile, ATS keywords appear naturally integrated (not stuffed), output reads like a human wrote it for this specific role.

**Test Protocol:** For each of the 3 test runs — (1) JSON.parse() succeeds raw, (2) highlight every word in the summary that also appears in the JD — at least 3 should match, (3) read the top bullet of each experience and confirm it's the most role-relevant one, not just the first one from the master profile, (4) Google 2 random bullets — if any describe experience Nico doesn't have, the prompt hallucinated and must be fixed.

---

### Story 4.2 — CV Display
**As a user, I want to see my tailored CV rendered cleanly so I can review it before exporting.**

- [ ] 🔴 Create `CVGeneratorTab` component
- [ ] 🔴 Show "Generate CV" button (disabled until job analysis exists)
- [ ] 🔴 Loading state during generation
- [ ] 🔴 Render generated CV in a clean, document-like layout
- [ ] 🔴 Summary section at top
- [ ] 🔴 Experience section with company, title, period, bullets
- [ ] 🔴 Skills section grouped by type
- [ ] 🔴 Education + Certifications
- [ ] 🟡 Highlight matched ATS keywords in the rendered CV
- [ ] 🟢 Allow inline editing of individual sections

---

### Story 4.3 — PDF Export
**As a user, I want to export my tailored CV as a PDF so I can submit it directly.**

- [ ] 🔴 Install PDF export library (html2pdf.js or @react-pdf/renderer — evaluate both)
- [ ] 🔴 Create `src/utils/pdfExport.ts`
- [ ] 🔴 "Download PDF" button in CVGeneratorTab
- [ ] 🔴 PDF output: clean, ATS-friendly formatting (single column, standard fonts)
- [ ] 🔴 File named: `CV_[Name]_[JobTitle]_[Company].pdf`
- [ ] 🟡 PDF matches visual style of on-screen render
- [ ] 🟢 "Copy as plain text" button for paste-into-form scenarios

---

## EPIC 5 — Interview Prep
*The differentiator. Most CV tools stop at the CV.*

---

### Story 5.1 — Interview Prep Prompt
**As a developer, I want a prompt that generates relevant, personalized interview questions and strategic angles.**

- [ ] 🔴 Create `src/prompts/generatePrep.ts`
- [ ] 🔴 Define output schema:
  ```json
  {
    "questions": [{
      "question": "string",
      "category": "behavioral | technical | situational | culture",
      "whyTheyAsk": "string",
      "yourAngle": "string",
      "keyStory": "string"
    }]
  }
  ```
- [ ] 🔴 Instruct Claude to base angles on the user's *actual experience* from the profile
- [ ] 🔴 Generate exactly 5 questions per role
- [ ] 🔴 Test with 3 different roles
- [ ] 🟡 Iterate for specificity — generic answers are failure

**Prompt Acceptance Criteria:** Output passes if — exactly 5 questions generated, every `yourAngle` references a specific real experience from the profile (not generic advice), `keyStory` is a concrete situation (not a vague suggestion), questions vary across categories (not all behavioral), no question is a cliché like "tell me about yourself" without a specific framing.

**Test Protocol:** For each of the 3 test runs — (1) count questions, must be exactly 5, (2) for every `yourAngle`, find the specific experience it references in the master profile — if you can't find it, it's hallucinated, (3) read each `keyStory` aloud — if it sounds like advice rather than a specific situation from Nico's history, it fails, (4) check category distribution — reject if more than 2 questions share the same category.

---

### Story 5.2 — Interview Prep Display
**As a user, I want to see my interview prep clearly so I can study it efficiently.**

- [ ] 🔴 Create `InterviewPrepTab` component
- [ ] 🔴 "Generate Prep" button (disabled until job analysis exists)
- [ ] 🔴 Loading state
- [ ] 🔴 Display each question as an expandable card
- [ ] 🔴 Show: question, category badge, why they ask, your angle, key story
- [ ] 🟡 Color-code by category
- [ ] 🟢 "Copy all prep" button for pasting into notes

---

## EPIC 6 — Polish & Portfolio Readiness
*This is what separates a demo from a portfolio piece.*

---

### Story 6.1 — UI Polish
**As a portfolio reviewer, I want the app to look professional and intentional.**

- [ ] 🔴 Finalize color palette and apply consistently
- [ ] 🔴 Ensure font pairing is applied throughout
- [ ] 🔴 All loading states have visual feedback (spinner or skeleton)
- [ ] 🔴 All error states display clearly with actionable message
- [ ] 🔴 Empty states have helpful prompts (not just blank space)
- [ ] 🟡 Add subtle entrance animations on tab switch
- [ ] 🟡 Add micro-interactions on button hover/click
- [ ] 🟢 Add a dark/light mode toggle

---

### Story 6.2 — End-to-End Testing
**As a developer, I want to verify the full pipeline works before shipping.**

- [ ] 🔴 Manual E2E test: profile → analyze → generate CV → download PDF
- [ ] 🔴 Manual E2E test: profile → analyze → generate prep
- [ ] 🔴 Test with 3 different job descriptions (different industries/seniority)
- [ ] 🔴 Test error states: no profile, API failure, malformed response
- [ ] 🟡 Cross-browser test: Chrome, Firefox, Safari

---

### Story 6.3 — Deployment
**As a portfolio owner, I want the app live on a public URL so I can share it.**

- [ ] 🔴 Create Vercel account (if not exists)
- [ ] 🔴 Connect GitHub repo to Vercel
- [ ] 🔴 Configure environment (no API key in repo — handle via Vercel env or proxy)
- [ ] 🔴 Deploy and verify live URL works end-to-end
- [ ] 🔴 Add live URL to README and LinkedIn profile
- [ ] 🟡 Add custom domain (optional)

---

### Story 6.4 — README & Portfolio Presentation
**As a hiring manager, I want a compelling README so I can evaluate this project quickly.**

- [ ] 🔴 Write README: project description (1 paragraph, sharp)
- [ ] 🔴 Add animated GIF or screenshot of the app in action
- [ ] 🔴 List tech stack with icons
- [ ] 🔴 Add "Live Demo" badge with link
- [ ] 🔴 Add "How to run locally" section
- [ ] 🟡 Add "Design decisions" section explaining key architectural choices
- [ ] 🟡 Add "What I'd do next" section (shows product thinking)

---

## Backlog Summary

| Epic | Stories | Tasks | Priority |
|---|---|---|---|
| 1 — Foundation | 5 | 28 | 🔴 All critical |
| 2 — Master Profile | 3 | 12 | 🔴🟡 |
| 3 — Job Analyzer | 3 | 14 | 🔴🟡 |
| 4 — CV Generator | 3 | 16 | 🔴🟡🟢 |
| 5 — Interview Prep | 2 | 10 | 🔴🟡🟢 |
| 6 — Polish & Deploy | 4 | 22 | 🔴🟡🟢 |
| **Total** | **20** | **102** | |

---

## Suggested Sprint Order

**Sprint 1 — One thing working (~2–3 hrs):** Stories 1.1 + 1.2 + 1.3 only — repo initialized, shell renders, tabs switch, dev server runs clean. End condition: you can see the app in a browser. That's it. That's the win. Don't touch state or API.

**Sprint 2 — State + Profile (~3–4 hrs):** Stories 1.4 + 1.5 + Epic 2 — global state wired, profile saves and loads, Nico's master profile pre-loaded with one button click.

**Sprint 3 — Intelligence (~4–6 hrs):** Epic 3 — job description in, structured analysis out, displayed cleanly. Includes prompt testing protocol.

**Sprint 4 — The Output (~5–7 hrs):** Epic 4 — tailored CV generated, rendered, exported as PDF. Longest sprint — PDF formatting will fight you.

**Sprint 5 — Differentiator (~3–4 hrs):** Epic 5 — interview prep generated and displayed.

**Sprint 6 — Ship It (~4–5 hrs):** Epic 6 — polish, proxy wired up, Vercel deploy, README screenshot added.

**Total estimated:** 21–29 hours of focused work. At 2–3 hrs per session, that's 8–12 sessions.  
