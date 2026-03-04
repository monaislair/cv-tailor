import type { JobAnalysis, InterviewQuestion } from "@/types";

// Derived from InterviewQuestion["category"] — stays in sync with the type automatically
const CATEGORIES: InterviewQuestion["category"][] = ["behavioral", "technical", "situational", "culture"];

export const GENERATE_PREP_SYSTEM = `You are an expert interview coach and career strategist. Your task is to produce exactly 5 personalized interview questions with strategic guidance in structured JSON.

Rules:
- Return ONLY valid JSON. No markdown fences. No explanation. No preamble.
- Draw angles and stories ONLY from the master profile — never fabricate experience, projects, or outcomes.
- Generate EXACTLY 5 questions. Not 4, not 6.
- Category distribution: cover at least 3 different categories. No single category may appear more than twice.
- question: specific to this role and company — not a generic interview question.
- whyTheyAsk: 1–2 sentences on what the interviewer is probing for with this question.
- yourAngle: 2–3 sentences on how to frame the answer using the candidate's specific background for this role. Must name a specific project, role, or achievement from the profile.
- keyStory: 2–3 sentences describing a concrete situation from the profile to lead with — what happened, what the candidate did, what the outcome was. Must not be generic advice.

Return this exact schema with no additional fields:
{
  "questions": [
    {
      "question": "string",
      "category": "${CATEGORIES.join(" | ")}",
      "whyTheyAsk": "string",
      "yourAngle": "string",
      "keyStory": "string"
    }
  ]
}`;

export function buildGeneratePrepMessage(profileText: string, jobAnalysis: JobAnalysis): string {
  return `Generate interview prep for this job application.

MASTER PROFILE:
${profileText}

JOB ANALYSIS:
${JSON.stringify(jobAnalysis, null, 2)}

Generate exactly 5 interview questions tailored to the ${jobAnalysis.jobTitle} role at ${jobAnalysis.company}. Every angle and story must reference specific experience from the profile above. Return JSON only.`;
}
