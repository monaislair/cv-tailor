import type { GeneratedCV } from "@/types";

interface Props {
  cv: GeneratedCV;
}

export function CVDisplay({ cv }: Props) {
  const contactParts = [cv.contact.email, cv.contact.phone, cv.contact.linkedin, cv.contact.location].filter(Boolean);

  return (
    <div className="bg-white text-zinc-900 rounded-lg p-8 max-w-3xl shadow-sm font-sans">

      {/* Header */}
      <div className="border-b border-zinc-200 pb-5 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{cv.name}</h1>
        {contactParts.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-500">
            {contactParts.map((part, i) => <span key={i}>{part}</span>)}
          </div>
        )}
      </div>

      {/* Summary */}
      {cv.summary && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-700">{cv.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Experience</h2>
          <div className="flex flex-col gap-5">
            {cv.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-sm">{exp.title}</span>
                  <span className="text-xs text-zinc-400 shrink-0">{exp.period}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-2">{exp.company}</p>
                <ul className="flex flex-col gap-1">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-700">
                      <span className="mt-2 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(cv.skills.technical.length > 0 || cv.skills.tools.length > 0 || cv.skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Skills</h2>
          <div className="flex flex-col gap-1 text-sm text-zinc-700">
            {cv.skills.technical.length > 0 && <p><span className="font-semibold">Technical:</span> {cv.skills.technical.join(", ")}</p>}
            {cv.skills.tools.length > 0 && <p><span className="font-semibold">Tools:</span> {cv.skills.tools.join(", ")}</p>}
            {cv.skills.soft.length > 0 && <p><span className="font-semibold">Soft Skills:</span> {cv.skills.soft.join(", ")}</p>}
          </div>
        </section>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Education</h2>
          <div className="flex flex-col gap-2">
            {cv.education.map((edu, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-zinc-500">{edu.institution}</p>
                </div>
                <span className="text-xs text-zinc-400 shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <section>
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Certifications</h2>
          <ul className="flex flex-col gap-1">
            {cv.certifications.map((cert, i) => <li key={i} className="text-sm text-zinc-700">{cert}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
