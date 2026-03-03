export function InterviewPrepTab() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
      <div className="text-4xl">🎯</div>
      <h2
        className="text-xl font-semibold text-foreground"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Interview Prep
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm">
        Five likely interview questions with your personalised angle and key story for
        each — drawn from your actual experience.
      </p>
      <span className="text-xs text-muted-foreground/60 bg-muted px-2 py-1 rounded">
        Coming in Sprint 5
      </span>
    </div>
  );
}
