"use client";

import * as React from "react";
import JobDescriptionForm from "@/components/forms/job-description-form";
import ResultPanel from "@/components/job-description/result-panel";
import { toast } from "sonner";
import type { JobAnalysis } from "@/lib/schemas/job-analysis.schema";

export default function JobDescriptionPage() {
  const [data, setData] = React.useState<JobAnalysis | null>(null);

  function onError(message: string) {
    toast.error(message);
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto px-6 py-6">
      <h1 className="md:sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 md:text-4xl text-2xl backdrop-blur-lg">
        <span>JD Report</span>
      </h1>

      <div className="mx-auto grid max-w-7xl gap-6 md:mt-10 lg:grid-cols-2 lg:items-start">
        <div className="self-start rounded border bg-secondary/30 p-6 py-8">
          <h2 className="md:text-xl text-md font-semibold">
            Ai Job Description Analyzer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste a job description and get a structured summary and required
            skills.
          </p>

          <div className="mt-6 py-1.5">
            <JobDescriptionForm
              onResult={(result: JobAnalysis) => setData(result)}
              onError={onError}
            />
          </div>
        </div>

        <div className="rounded-sm border bg-secondary/80 p-6">
          {data ? (
            <ResultPanel data={data} />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center text-sm text-muted-foreground">
              Run an analysis to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
