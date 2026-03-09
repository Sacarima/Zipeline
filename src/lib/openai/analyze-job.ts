import { getOpenAIClient } from "./client";
//import { JobAnalysisSchema, type JobAnalysis } from "@/lib/types";
import {
  JobAnalysisSchema,
  type JobAnalysis,
} from "@/lib/schemas/job-analysis.schema";
function extractJson(text: string) {
  // this will accept either raw JSON, or JSON inside a fenced block
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) return fenced[1].trim();
  return text.trim();
}

export async function analyzeJobDescription(
  jdText: string,
): Promise<JobAnalysis> {
  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

  const system = [
    "You extract a structured job analysis from a job description.",
    "Return ONLY valid JSON that matches the provided schema. No extra keys, no commentary.",
    "Use concise skill names (e.g., 'React', 'TypeScript', 'AWS').",
  ].join(" ");

  const schemaHint = {
    roleTitle: "string",
    seniority: "junior | mid | senior | lead | unknown",
    summary: "string[] (3-8 bullets)",
    skills: { mustHave: "string[]", niceToHave: "string[]" },
    tech: {
      languages: "string[]",
      frameworks: "string[]",
      tooling: "string[]",
      cloud: "string[]",
      testing: "string[]",
    },
    confidence: "number (0..1)",
  };

  const res = await client.responses.create({
    model,
    input: [
      { role: "system", content: system },
      {
        role: "user",
        content: [
          "SCHEMA (for reference, do not include it in output):",
          JSON.stringify(schemaHint),
          "",
          "JOB DESCRIPTION:",
          jdText,
          "",
          "Return JSON only.",
        ].join("\n"),
      },
    ],
  });

  const outputText = res.output_text ?? "";
  const jsonText = extractJson(outputText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    //retry to repair output
    const repair = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content:
            "Fix the user's content into valid JSON only. Return JSON only.",
        },
        { role: "user", content: jsonText },
      ],
    });
    parsed = JSON.parse(extractJson(repair.output_text ?? ""));
  }

  return JobAnalysisSchema.parse(parsed);
}
