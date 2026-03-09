import { z } from "zod";

export const JobAnalysisSchema = z.object({
  roleTitle: z.string().min(1),
  seniority: z.enum(["junior", "mid", "senior", "lead", "unknown"]),
  summary: z.array(z.string().min(1)).min(3).max(8),

  skills: z.object({
    mustHave: z.array(z.string().min(1)).min(1),
    niceToHave: z.array(z.string().min(1)).default([]),
  }),

  tech: z.object({
    languages: z.array(z.string().min(1)).default([]),
    frameworks: z.array(z.string().min(1)).default([]),
    tooling: z.array(z.string().min(1)).default([]),
    cloud: z.array(z.string().min(1)).default([]),
    testing: z.array(z.string().min(1)).default([]),
  }),

  confidence: z.number().min(0).max(1),
});

export type JobAnalysis = z.infer<typeof JobAnalysisSchema>;

export const AnalyzeRequestSchema = z.object({
  text: z
    .string()
    .min(200, "Please paste a longer job description (min 200 characters)."),
});


