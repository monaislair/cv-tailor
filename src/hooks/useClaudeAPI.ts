import { useAppState } from "@/hooks/useAppState";

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1000;

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
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Anthropic messages API always returns { content: [{ type, text }] } — asserting that shape here
      const data = await response.json() as { content?: { type: string; text: string }[] };
      const rawText = data.content?.[0]?.text ?? "";
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
