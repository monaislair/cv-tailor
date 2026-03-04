import { useState, createElement } from "react";
import { useAppState } from "@/hooks/useAppState";
import { useClaudeAPI } from "@/hooks/useClaudeAPI";
import { GENERATE_CV_SYSTEM, buildGenerateCVMessage } from "@/prompts/generateCV";
import { CVDisplay } from "@/components/CVGenerator/CVDisplay";
import { buildFilename, triggerBlobDownload } from "@/utils/pdfExport";
import type { GeneratedCV } from "@/types";

type Mode = "idle" | "generated";

export function CVGeneratorTab() {
  const { state, dispatch } = useAppState();
  const { callClaude } = useClaudeAPI();
  const [mode, setMode] = useState<Mode>(state.generatedCV ? "generated" : "idle");
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleGenerate() {
    try {
      const result = await callClaude<GeneratedCV>(
        GENERATE_CV_SYSTEM,
        buildGenerateCVMessage(state.masterProfile!.rawText, state.currentJob!)
      );
      dispatch({ type: "SET_CV", payload: result });
      setMode("generated");
    } catch {
      // Error dispatched to global state by useClaudeAPI — ErrorBanner handles display
    }
  }

  async function handleDownload() {
    // Snapshot state before the first await — currentJob/generatedCV can change mid-flight
    // if the user triggers a new job analysis while the PDF is generating
    const cv = state.generatedCV!;
    const job = state.currentJob!;
    setIsDownloading(true);
    try {
      // Lazy-load @react-pdf/renderer + CVPdfDocument — ~600KB gzipped, only needed on download
      const [{ pdf }, { CVPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/CVGenerator/CVPdfDocument"),
      ]);
      // pdf() expects ReactElement<DocumentProps> — type assertion needed for component-wrapped Document
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(createElement(CVPdfDocument, { cv }) as any).toBlob();
      triggerBlobDownload(blob, buildFilename(cv, job));
    } catch (err) {
      const message = err instanceof Error ? err.message : "PDF generation failed. Please try again.";
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      setIsDownloading(false);
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
            : "Analyze a job description first — the CV is tailored to a specific role."}
        </p>
      </div>
    );
  }

  if (mode === "generated" && state.generatedCV) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-muted-foreground">
            Tailored for <span className="text-foreground">{state.currentJob.jobTitle}</span>{" "}
            at <span className="text-foreground">{state.currentJob.company}</span>.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isDownloading ? "Generating PDF…" : "Download PDF"}
            </button>
            <button
              onClick={() => setMode("idle")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
        <CVDisplay cv={state.generatedCV} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Generate CV</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Claude will tailor your profile for the{" "}
          <span className="text-foreground">{state.currentJob.jobTitle}</span> role at{" "}
          <span className="text-foreground">{state.currentJob.company}</span>,
          reordering bullets by relevance and weaving in ATS keywords naturally.
        </p>
      </div>
      <button
        onClick={handleGenerate}
        disabled={state.isLoading}
        className="self-start px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {state.isLoading ? "Generating…" : "Generate CV"}
      </button>
    </div>
  );
}
