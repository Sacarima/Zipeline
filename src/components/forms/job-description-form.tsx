"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JobAnalysis } from "@/lib/schemas/job-analysis.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AnalyzeRequestSchema } from "@/lib/schemas/job-analysis.schema";

type FormValues = z.infer<typeof AnalyzeRequestSchema>;

type Props = {
  onResult: (data: JobAnalysis) => void;
  onError: (message: string) => void;
};

export default function JobDescriptionForm({ onResult, onError }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(AnalyzeRequestSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const [loading, setLoading] = React.useState(false);
  const textValue = form.watch("text");
  const chars = textValue?.length ?? 0;

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/job-description/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();
      if (!res.ok) {
        onError(json?.error ?? "Request failed");
        return;
      }

      onResult(json.data);
    } catch (e) {
      onError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Job description</FormLabel>
                <span className="text-xs text-muted-foreground">
                  {chars} chars
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Paste the job description here..."
                  className="h-[240px] max-h-[400px] overflow-y-auto resize-none bg-gray-100/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading || chars < 200}
          className="w-full bg-[#EEE0FF] dark:bg-[#2F006B] cursor-pointer  hover:text-black hover:bg-gray-100 dark:text-white text-black dark:hover:text-white  hover:opacity-90 disabled:opacity-50 disabled:pointer-events-auto disabled:cursor-not-allowed!"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>
    </Form>
  );
}
