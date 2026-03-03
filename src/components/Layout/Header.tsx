export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm leading-none">
              CV
            </span>
          </div>
          <span className="text-foreground font-semibold text-lg tracking-tight">
            CV Tailor
          </span>
        </div>
        <span className="text-muted-foreground text-sm hidden sm:block">
          — AI-powered job application assistant
        </span>
      </div>
    </header>
  );
}
