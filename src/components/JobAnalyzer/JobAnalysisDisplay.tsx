import type { JobAnalysis } from "@/types";
import { Badge } from "@/components/ui/badge";

const SENIORITY_LABEL: Record<JobAnalysis["seniorityLevel"], string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  director: "Director",
};

const REMOTE_LABEL: Record<JobAnalysis["remotePolicy"], string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
  unspecified: "Location unspecified",
};

interface Props {
  analysis: JobAnalysis;
}

export function JobAnalysisDisplay({ analysis }: Props) {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">{analysis.jobTitle}</h2>
        <p className="text-muted-foreground">{analysis.company}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="info">{SENIORITY_LABEL[analysis.seniorityLevel]}</Badge>
          <Badge variant="info">{REMOTE_LABEL[analysis.remotePolicy]}</Badge>
          {analysis.industryContext && (
            <Badge variant="info">{analysis.industryContext}</Badge>
          )}
        </div>
      </div>

      {/* Required Skills */}
      {analysis.requiredSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {analysis.requiredSkills.map((skill, i) => (
              <Badge key={`req-${i}`} variant="required">{skill}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Preferred Skills */}
      {analysis.preferredSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-2">Preferred Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {analysis.preferredSkills.map((skill, i) => (
              <Badge key={`pref-${i}`} variant="preferred">{skill}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Key Responsibilities */}
      {analysis.keyResponsibilities.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-2">Key Responsibilities</h3>
          <ul className="flex flex-col gap-1.5">
            {analysis.keyResponsibilities.map((item, i) => (
              <li key={`resp-${i}`} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ATS Keywords */}
      {analysis.atsKeywords.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-2">ATS Keywords</h3>
          <div className="flex flex-wrap gap-1.5">
            {analysis.atsKeywords.map((kw, i) => (
              <Badge key={`kw-${i}`} variant="keyword">{kw}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Standout Requirements */}
      {analysis.standoutRequirements.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-2">Standout Requirements</h3>
          <ul className="flex flex-col gap-1.5">
            {analysis.standoutRequirements.map((item, i) => (
              <li key={`stand-${i}`} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-amber-400 mt-0.5 shrink-0">⚑</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
