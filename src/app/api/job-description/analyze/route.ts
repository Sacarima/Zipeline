import { NextResponse } from "next/server";
import { AnalyzeRequestSchema } from "@/lib/schemas/job-analysis.schema";
import { analyzeJobDescription } from "@/lib/openai/analyze-job";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = AnalyzeRequestSchema.parse(body);

    const data = await analyzeJobDescription(text);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: err.flatten() },
        { status: 400 },
      );
    }

    const message = err instanceof Error ? err.message : "Unknown error";

    // OpenAi only
    if (message.includes("OPENAI_API_KEY")) {
      return NextResponse.json(
        { error: "OpenAI is not configured", details: message },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze job description", details: message },
      { status: 502 },
    );
  }
}
