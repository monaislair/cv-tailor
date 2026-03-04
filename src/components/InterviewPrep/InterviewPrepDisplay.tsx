import { useState, useEffect } from "react";
import type { InterviewPrep, InterviewQuestion } from "@/types";

const CATEGORY_STYLES: Record<InterviewQuestion["category"], string> = {
  behavioral:  "bg-amber-900/40 text-amber-300 border-amber-700/50",
  technical:   "bg-sky-900/40 text-sky-300 border-sky-700/50",
  situational: "bg-violet-900/40 text-violet-300 border-violet-700/50",
  culture:     "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
};

interface Props {
  prep: InterviewPrep;
}

export function InterviewPrepDisplay({ prep }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Reset to first card whenever a new prep arrives (e.g. after regeneration)
  useEffect(() => {
    setOpenIndex(0);
  }, [prep]);

  return (
    <div className="flex flex-col gap-3">
      {prep.questions.map((q, i) => {
        const isOpen = openIndex === i;
        const catStyle = CATEGORY_STYLES[q.category];

        return (
          <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`prep-panel-${i}`}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-accent/20 transition-colors"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <span className={`self-start text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border ${catStyle}`}>
                  {q.category}
                </span>
                <span className="text-sm font-medium text-foreground leading-snug">{q.question}</span>
              </div>
              <span className="text-muted-foreground shrink-0 mt-1 text-xs select-none">
                {isOpen ? "▲" : "▼"}
              </span>
            </button>

            {isOpen && (
              <div
                id={`prep-panel-${i}`}
                role="region"
                className="px-5 pt-4 pb-5 flex flex-col gap-4 border-t border-border"
              >
                <PrepSection label="Why They Ask" text={q.whyTheyAsk} />
                <PrepSection label="Your Angle" text={q.yourAngle} />
                <PrepSection label="Key Story" text={q.keyStory} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PrepSection({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}
