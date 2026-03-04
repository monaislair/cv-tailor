import { useAppState } from "@/hooks/useAppState";

function stripFences(raw: string): string {
  return raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
}

/** Runtime check that a parsed JSON value contains the expected top-level keys. */
function assertShape<T extends Record<string, unknown>>(
  obj: unknown,
  requiredKeys: readonly (keyof T)[],
): asserts obj is T {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("The AI returned an incomplete response. Please try again.");
  }
  for (const key of requiredKeys) {
    if (!(key in obj)) {
      throw new Error(`The AI returned an incomplete response (missing "${String(key)}"). Please try again.`);
    }
  }
}

export function useClaudeAPI() {
  const { dispatch } = useAppState();

  async function callClaude<T extends Record<string, unknown>>(
    systemPrompt: string,
    userMessage: string,
    requiredKeys: readonly (keyof T)[],
  ): Promise<T> {
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

      let parsed: unknown;
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error("The AI returned an unexpected format. Please try again.");
      }

      assertShape<T>(parsed, requiredKeys);
      return parsed;
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
