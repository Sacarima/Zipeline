"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";

const MenuOptions = () => {
  const pathName = usePathname();

  return (
    <nav
      aria-label="Sidebar"
      className="hidden h-screen flex-col items-center justify-between gap-10 overflow-scroll px-2 py-6 dark:bg-black md:flex"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex flex-row font-bold text-2xl"
        >
          ZL.
        </Link>

        <TooltipProvider>
          <ul className="flex flex-col gap-4">
            {menuOptions.map((menuItem) => {
              const isActive = pathName === menuItem.href;

              return (
                <li key={menuItem.name}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      {menuItem.comingSoon ? (
                        <span
                          aria-label={`${menuItem.name} coming soon`}
                          aria-disabled="true"
                          className="group flex h-8 w-8 scale-[1.5] cursor-not-allowed items-center justify-center rounded-lg p-[3px] opacity-60"
                        >
                          <menuItem.Component selected={false} />
                        </span>
                      ) : (
                        <Link
                          href={menuItem.href}
                          aria-label={menuItem.name}
                          aria-current={isActive ? "page" : undefined}
                          className={clsx(
                            "group flex h-8 w-8 scale-[1.5] cursor-pointer items-center justify-center rounded-lg p-[3px]",
                            {
                              "bg-[#EEE0FF] dark:bg-[#2F006B]": isActive,
                            },
                          )}
                        >
                          <menuItem.Component selected={isActive} />
                        </Link>
                      )}
                    </TooltipTrigger>

                    <TooltipContent
                      side="right"
                      className="bg-black/10 backdrop-blur-xl"
                    >
                      <p className="dark:text-white text-black">
                        {menuItem.name}
                        {menuItem.comingSoon ? " — Coming soon" : ""}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>

        <Separator />

        <section
          aria-label="Workflow status"
          className="flex h-56 flex-col items-center gap-9 overflow-scroll rounded-full border-[1px] px-2 py-4 dark:bg-[#353346]/30"
        >
          <div className="relative rounded-full border-[1px] p-2 dark:border-t-[2px] dark:border-t-[#353346] dark:bg-[#353346]/70">
            <LucideMousePointerClick
              className="dark:text-white"
              size={18}
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-[30px] left-1/2 h-6 -translate-x-1/2 transform border-l-2 border-muted-foreground/50"
            />
          </div>

          <div className="relative rounded-full border-[1px] p-2 dark:border-t-[2px] dark:border-t-[#353346] dark:bg-[#353346]/70">
            <GitBranch
              className="text-muted-foreground"
              size={18}
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-[30px] left-1/2 h-6 -translate-x-1/2 transform border-l-2 border-muted-foreground/50"
            />
          </div>

          <div className="relative rounded-full border-[1px] p-2 dark:border-t-[2px] dark:border-t-[#353346] dark:bg-[#353346]/70">
            <Database
              className="text-muted-foreground"
              size={18}
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-[30px] left-1/2 h-6 -translate-x-1/2 transform border-l-2 border-muted-foreground/50"
            />
          </div>

          <div className="relative rounded-full border-[1px] p-2 dark:border-t-[2px] dark:border-t-[#353346] dark:bg-[#353346]/70">
            <GitBranch
              className="text-muted-foreground"
              size={18}
              aria-hidden="true"
            />
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MenuOptions;
