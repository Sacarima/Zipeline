"use client";

import * as React from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";

const LoginSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type LoginValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submittedEmail, setSubmittedEmail] = React.useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  async function onSubmit(values: LoginValues) {
    setStatus("loading");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOtp({
        email: values.email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) {
        setStatus("error");
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
        return;
      }

      setSubmittedEmail(values.email.trim());
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      form.setError("email", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full">
      <main className="relative z-20 flex min-h-screen w-full items-center justify-center px-6 py-10">
        {!isSuccess ? (
          <section
            aria-labelledby="login-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/50 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent dark:via-violet-400/60"
            />

            <div className="relative z-10">
              <header className="mb-8 space-y-5">
                <div className="flex items-center gap-[2px] py-4 ">
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">Zip</p>
                  <Image
                    src="/fuzzieLogo.png"
                    width={15}
                    height={15}
                    alt="Zipeline logo"
                    className="shadow-sm bg-violet-500 dark:bg-background"
                  />
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">line</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Continue with a secure magic link and login in seconds.
                  </p>
                </div>
              </header>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                          Email address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail
                              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                              aria-hidden="true"
                            />
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              autoComplete="email"
                              inputMode="email"
                              placeholder="you@example.com"
                              className="h-12 rounded border border-black/10 bg-white/80 pl-10 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 transition focus-visible:border-violet-500/60 focus-visible:ring-2 focus-visible:ring-violet-500/20 dark:border-white/5 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500 dark:focus-visible:border-violet-400/60 dark:focus-visible:ring-violet-400/30"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-rose-500 dark:text-rose-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full rounded bg-gradient-to-r from-violet-500 via-fuchsia-700 to-cyan-900 px-4 text-sm font-medium text-white transition hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? "Sending link..." : "Continue with magic link"}
                    {!isLoading ? (
                      <ArrowRight className="size-4" aria-hidden="true" />
                    ) : null}
                  </Button>
                </form>
              </Form>

              <div className="mt-8 flex items-start gap-3 rounded border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                  aria-hidden="true"
                />
                <p className="text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                  Passwordless authentication powered by secure email
                  verification.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div
            className="rounded border border-emerald-500/20 bg-emerald-50/80 p-5 shadow-[0_10px_40px_rgba(16,185,129,0.08)] backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:shadow-none"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Check your email
                </p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  We sent a magic link to{" "}
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {submittedEmail}
                  </span>
                  . You should receive a login link momentarily.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </BackgroundBeamsWithCollision>
  );
};

export default LoginPage;