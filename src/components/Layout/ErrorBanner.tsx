import { useAppState } from "@/hooks/useAppState";

export function ErrorBanner() {
  const { state, dispatch } = useAppState();

  if (!state.error) return null;

  return (
    <div className="bg-destructive/10 border-b border-destructive/30 px-6 py-3 flex items-center justify-between">
      <p className="text-sm text-destructive-foreground">
        {state.error}
      </p>
      <button
        onClick={() => dispatch({ type: "CLEAR_ERROR" })}
        className="text-destructive-foreground/60 hover:text-destructive-foreground text-lg leading-none transition-colors ml-4"
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}
