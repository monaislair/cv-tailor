# CV Tailor ✦ AI-Powered Job Application Assistant

> Paste a job description. Get a tailored CV and interview prep in under 60 seconds.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-slate?style=for-the-badge)]()
[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20API-orange?style=for-the-badge)](https://anthropic.com)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=for-the-badge)](https://typescriptlang.org)

---

## Why This Exists

I'm an HR Data Analyst actively transitioning into AI and automation roles. Applying to multiple positions means tailoring your CV for each one — different keywords, different emphasis, different story. Done well, it takes 45 minutes per application. Done poorly, it's a generic CV that gets filtered out in 10 seconds.

I built CV Tailor to solve that problem for myself, and made it portfolio-worthy in the process. It's a real tool I actually use, built with the same AI integration skills I'm applying for jobs to use. That's the point.

---

![CV Tailor App Screenshot](./docs/screenshot.png)
*[Screenshot coming soon — add after first working build]*

---

## What This Does

1. **Load your profile once** — your master professional profile, stored in the app
2. **Paste a job description** — the AI extracts requirements, keywords, and signals
3. **Generate a tailored CV** — matched to the specific role, ATS-optimized, export as PDF
4. **Get interview prep** — 5 likely questions with your specific angles based on your real experience

---

## Tech Stack

React 19 + TypeScript + Tailwind CSS + shadcn/ui on the frontend. Anthropic Claude API for intelligence. Vite for dev, Vercel for hosting.

One architectural decision worth noting: the API key never touches the client. All Claude calls are proxied through a Vercel serverless function that holds the key server-side. A portfolio piece that exposes credentials isn't actually a portfolio piece.

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS 3 + shadcn/ui |
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| API Security | Vercel serverless proxy — key never client-side |
| PDF Export | html2pdf.js |
| Build | Vite |
| Hosting | Vercel |

---

## Run Locally

```bash
git clone https://github.com/[your-username]/cv-tailor
cd cv-tailor
npm install
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local
npm run dev
```

Open `http://localhost:5173`

---

## Project Structure

```
src/
├── components/     # UI components by feature
├── hooks/          # useClaudeAPI, useAppState
├── prompts/        # All Claude prompt templates
├── types/          # TypeScript type definitions
└── utils/          # PDF export, formatting helpers
api/
└── claude.ts       # Vercel serverless proxy
```

See [`CLAUDE.md`](./CLAUDE.md) for full architecture documentation.

---

*Built by [Nicolás Duarte](https://linkedin.com/in/nicolasduarte-ferreira) — HR Data & Automation Analyst → AI/Data Engineer*
