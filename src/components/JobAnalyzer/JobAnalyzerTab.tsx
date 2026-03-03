export function JobAnalyzerTab() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
      <div className="text-4xl">🔍</div>
      <h2 className="text-xl font-semibold text-foreground">
        Analyze Job
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm">
        Paste a job description and the AI will extract required skills, ATS keywords,
        and key responsibilities.
      </p>
      <span className="text-xs text-muted-foreground/60 bg-muted px-2 py-1 rounded">
        Coming in Sprint 3
      </span>
    </div>
  );
}
