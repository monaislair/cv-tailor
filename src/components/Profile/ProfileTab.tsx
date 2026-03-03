export function ProfileTab() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
      <div className="text-4xl">📋</div>
      <h2 className="text-xl font-semibold text-foreground">
        Master Profile
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm">
        Paste your full professional profile here. This is your source of truth — the
        AI uses it to tailor everything else.
      </p>
      <span className="text-xs text-muted-foreground/60 bg-muted px-2 py-1 rounded">
        Coming in Sprint 2
      </span>
    </div>
  );
}
