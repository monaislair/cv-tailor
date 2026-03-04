import type { GeneratedCV, JobAnalysis } from "@/types";

function sanitize(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

export function buildFilename(cv: GeneratedCV, job: JobAnalysis): string {
  return `CV_${sanitize(cv.name)}_${sanitize(job.jobTitle)}_${sanitize(job.company)}.pdf`;
}

export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  // Anchor must be in the DOM for Firefox to trigger the download on programmatic click
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revocation — synchronous revoke can abort the download in Firefox before the fetch completes
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

