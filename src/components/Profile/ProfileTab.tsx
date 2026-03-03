import { useState, useRef, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { MASTER_PROFILE } from "@/data/masterProfile";

type Mode = "edit" | "saved";

export function ProfileTab() {
  const { state, dispatch } = useAppState();
  const [text, setText] = useState(state.masterProfile?.rawText ?? "");
  const [mode, setMode] = useState<Mode>(state.masterProfile ? "saved" : "edit");
  const [justSaved, setJustSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: "SET_PROFILE", payload: { rawText: trimmed } });
    setMode("saved");
    setJustSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setJustSaved(false), 2500);
  }

  function handleEdit() {
    setMode("edit");
    setJustSaved(false);
  }

  function handlePreLoad() {
    setText(MASTER_PROFILE.rawText);
  }

  if (mode === "saved" && state.masterProfile) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">Master Profile</h2>
            {justSaved && (
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded animate-tab-in">
                Saved
              </span>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Edit Profile
          </button>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <pre className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-sans">
            {state.masterProfile.rawText}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground">
          {state.masterProfile.rawText.length.toLocaleString()} characters saved.
          The AI will draw from this for every tailoring operation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Master Profile</h2>
        <button
          onClick={handlePreLoad}
          className="text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Load My Profile
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Paste your full professional profile — experience, skills, education, everything.
        This is your source of truth. The AI uses it for every tailoring operation.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your full professional profile here..."
        className="w-full h-72 bg-card border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {text.length.toLocaleString()} characters
        </span>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
