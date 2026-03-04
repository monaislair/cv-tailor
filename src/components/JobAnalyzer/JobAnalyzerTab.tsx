import { useState } from "react";
import { useAppState } from "@/hooks/useAppState";
import { useClaudeAPI } from "@/hooks/useClaudeAPI";
import { ANALYZE_JOB_SYSTEM, buildAnalyzeJobMessage } from "@/prompts/analyzeJob";
import { JobAnalysisDisplay } from "@/components/JobAnalyzer/JobAnalysisDisplay";
import { Button } from "@/components/ui/button";
import type { JobAnalysis } from "@/types";

type Mode = "input" | "analyzed";

export function JobAnalyzerTab() {
  const { state, dispatch } = useAppState();
  const { callClaude } = useClaudeAPI();
  const [jobText, setJobText] = useState("");
  const [mode, setMode] = useState<Mode>(state.currentJob ? "analyzed" : "input");

  if (!state.masterProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
        <div className="text-4xl">🔒</div>
        <h2 className="text-xl font-semibold text-foreground">Profile Required</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Save your master profile first — the AI needs it to tailor the analysis to your background.
        </p>
      </div>
    );
  }

  if (mode === "analyzed" && state.currentJob) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Analysis complete.</p>
          <Button variant="ghost" onClick={() => { setJobText(""); setMode("input"); }}>
            Analyze New Job
          </Button>
        </div>
        <JobAnalysisDisplay analysis={state.currentJob} />
      </div>
    );
  }

  async function handleAnalyze() {
    const trimmed = jobText.trim();
    if (!trimmed) return;
    try {
      const result = await callClaude<JobAnalysis>(
        ANALYZE_JOB_SYSTEM,
        buildAnalyzeJobMessage(trimmed),
        ["jobTitle", "company", "seniorityLevel", "requiredSkills", "preferredSkills", "keyResponsibilities", "atsKeywords", "remotePolicy", "standoutRequirements"],
      );
      dispatch({ type: "SET_JOB", payload: result });
      setMode("analyzed");
    } catch {
      // Error already dispatched to global state by useClaudeAPI — ErrorBanner handles display
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <h2 className="text-xl font-semibold text-foreground">Analyze Job</h2>

      <p className="text-sm text-muted-foreground">
        Paste a job description. The AI will extract required skills, ATS keywords,
        key responsibilities, and seniority signals.
      </p>

      <textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        disabled={state.isLoading}
        placeholder="Paste the full job description here..."
        className="w-full h-72 bg-card border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-ring transition-colors disabled:opacity-50"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {jobText.length.toLocaleString()} characters
        </span>
        <Button onClick={handleAnalyze} disabled={!jobText.trim() || state.isLoading}>
          {state.isLoading ? "Analyzing…" : "Analyze Job"}
        </Button>
      </div>
    </div>
  );
}
