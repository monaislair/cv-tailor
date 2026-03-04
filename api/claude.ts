import type { VercelRequest, VercelResponse } from "@vercel/node";

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 4096;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server misconfiguration: API key not configured." });
  }

  try {
    const { system, messages } = (req.body ?? {}) as { system?: string; messages?: unknown[] };
    if (typeof system !== "string" || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request body." });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system, messages }),
    });
    const data = await response.json().catch(() => null);
    res.status(response.status).json(data ?? { error: "Upstream returned non-JSON response" });
  } catch (error) {
    res.status(500).json({
      error: "Proxy error",
      ...(process.env.NODE_ENV !== "production" && { detail: String(error) }),
    });
  }
}
