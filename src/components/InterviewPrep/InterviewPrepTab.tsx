import { useAppState } from "@/hooks/useAppState";
import { useClaudeAPI } from "@/hooks/useClaudeAPI";
import { GENERATE_PREP_SYSTEM, buildGeneratePrepMessage } from "@/prompts/generatePrep";
import { InterviewPrepDisplay } from "@/components/InterviewPrep/InterviewPrepDisplay";
import { Button } from "@/components/ui/button";
import type { InterviewPrep } from "@/types";

export function InterviewPrepTab() {
  const { state, dispatch } = useAppState();
  const { callClaude } = useClaudeAPI();

  async function handleGenerate() {
    try {
      const result = await callClaude<InterviewPrep>(
        GENERATE_PREP_SYSTEM,
        buildGeneratePrepMessage(state.masterProfile!.rawText, state.currentJob!),
        ["questions"],
      );
      dispatch({ type: "SET_PREP", payload: result });
    } catch {
      // Error dispatched to global state by useClaudeAPI — ErrorBanner handles display
    }
  }

  if (!state.masterProfile || !state.currentJob) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
        <div className="text-4xl">🔒</div>
        <h2 className="text-xl font-semibold text-foreground">Analysis Required</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          {!state.masterProfile
            ? "Save your master profile first."
            : "Analyze a job description first — prep is tailored to a specific role."}
        </p>
      </div>
    );
  }

  if (state.interviewPrep) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-muted-foreground">
            {state.interviewPrep.questions.length} questions for <span className="text-foreground">{state.currentJob.jobTitle}</span>{" "}
            at <span className="text-foreground">{state.currentJob.company}</span>.
          </p>
          <Button variant="ghost" onClick={handleGenerate} disabled={state.isLoading}>
            {state.isLoading ? "Regenerating…" : "Regenerate"}
          </Button>
        </div>
        <InterviewPrepDisplay prep={state.interviewPrep} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Interview Prep</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Claude will generate 5 targeted questions for the{" "}
          <span className="text-foreground">{state.currentJob.jobTitle}</span> role at{" "}
          <span className="text-foreground">{state.currentJob.company}</span>,
          with personalised angles and key stories drawn from your actual experience.
        </p>
      </div>
      <Button className="self-start" onClick={handleGenerate} disabled={state.isLoading}>
        {state.isLoading ? "Generating…" : "Generate Prep"}
      </Button>
    </div>
  );
}
