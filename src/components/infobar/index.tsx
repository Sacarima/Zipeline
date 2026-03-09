"use client";

import React from "react";
import { Book, Headphones, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import LogoutButton from "@/app/auth/logout-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InfoBar = () => {
  return (
    <section
      aria-label="Top information bar"
      className="flex w-full flex-row items-center justify-end gap-6 px-4 py-4 dark:bg-black"
    >
      <div className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light dark:text-gray-300">Credits</p>
      </div>

      <form
        role="search"
        aria-label="Quick search"
        className="flex items-center rounded-full bg-muted px-4"
      >
        <Search aria-hidden="true" />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
          aria-label="Quick search"
        />
      </form>

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button type="button" aria-label="Contact support">
              <Headphones aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button type="button" aria-label="Open guide">
              <Book aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <LogoutButton />
    </section>
  );
};

export default InfoBar;