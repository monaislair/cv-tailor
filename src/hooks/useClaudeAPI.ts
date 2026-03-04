import { useAppState } from "@/hooks/useAppState";

function stripFences(raw: string): string {
  return raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
}

export function useClaudeAPI() {
  const { dispatch } = useAppState();

  async function callClaude<T>(systemPrompt: string, userMessage: string): Promise<T> {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // model and max_tokens are pinned server-side in api/claude.ts — not sent here
        body: JSON.stringify({
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({})) as { error?: string | { message?: string } };
        const apiMessage =
          typeof errData.error === "string"
            ? errData.error
            : errData.error?.message;
        throw new Error(apiMessage ?? `API error: ${response.status} ${response.statusText}`);
      }

      // Anthropic messages API always returns { content: [{ type, text }] } — asserting that shape here
      const data = await response.json() as { content?: { type: string; text: string }[] };
      const rawText = data.content?.[0]?.text ?? "";
      if (!rawText) {
        throw new Error("The AI returned an empty response. Please try again.");
      }
      const cleaned = stripFences(rawText);

      try {
        return JSON.parse(cleaned) as T;
      } catch {
        throw new Error("The AI returned an unexpected format. Please try again.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      dispatch({ type: "SET_ERROR", payload: message });
      throw err;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return { callClaude };
}
