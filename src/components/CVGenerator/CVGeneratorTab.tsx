export function CVGeneratorTab() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
      <div className="text-4xl">📄</div>
      <h2 className="text-xl font-semibold text-foreground">
        Generate CV
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm">
        Your tailored CV — reordered, reweighted, and ATS-optimised for the specific
        role — ready to export as PDF.
      </p>
      <span className="text-xs text-muted-foreground/60 bg-muted px-2 py-1 rounded">
        Coming in Sprint 4
      </span>
    </div>
  );
}
