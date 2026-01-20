import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Role = "user" | "assistant" | "system";
type ChatMessage = { role: Role; content: string };

export async function POST(req: Request) {
  try {
    const apiKey = "sk-daadb7c9968f4c07b802743b631164d1"
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing DEEPSEEK_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const model: string = body.model ?? "deepseek-chat";
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];

    const temperature: number | undefined = body.temperature;
    const top_p: number | undefined = body.top_p;
    const top_k: number | undefined = body.top_k;

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false, // ✅ IMPORTANT
        logprobs: true,
        top_logprobs: 5,
        ...(typeof temperature === "number" ? { temperature } : {}),
        ...(typeof top_p === "number" ? { top_p } : {}),
        ...(typeof top_k === "number" ? { top_k } : {}),
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return NextResponse.json(
        { error: "DeepSeek request failed", details: err || `HTTP ${r.status}` },
        { status: r.status }
      );
    }

    const data = await r.json();
    const text: string = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ text }); // ✅ pure JSON response
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "Server error", details: msg }, { status: 500 });
  }
}
