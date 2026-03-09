"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

//WIP: Top Social nav links
// Will be replaced with real links later
const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Youtube", href: "#" },
  { label: "Instagram", href: "#" },
];

// footer content, dynamically rendered 
// they are grouped into columns
const footerColumns = [
  {
    title: "About Us",
    links: ["Pricing", "Contact", "FAQ", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Terms", "Privacy", "Security"],
  },
  {
    title: "Community",
    links: ["Forum", "Events", "Partners", "Affiliates", "Career"],
  },
  {
    title: "Press",
    links: ["Investors", "Terms of Use", "Privacy Policy", "Cookie Policy", "Legal"],
  },
];

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative overflow-hidden bg-background dark:text-white"
    >
      {/* Hidden accessible heading so screen readers can identify this area as the site footer */}
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_14%)]"
      />
      {/* Subtle horizontal divider line placed behind the hero-like decorative element */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[42%] h-px bg-white/8"
      />

      <div className="relative mx-auto max-w-7xl ">
        {/* Top visual section of the footer.
            This is purely decorative and meant to design(styling) */}
        <div className="relative flex min-h-[420px] items-end justify-center px-6 pt-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-full h-52 w-[26rem] -translate-x-1/2 -translate-y-12 rounded-full bg-white/12 blur-3xl"
            />

            <div aria-hidden="true" className="relative h-52 w-64">
              <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-4">
                <div className="h-20 w-px bg-white/6" />
                <div className="h-28 w-px bg-white/6" />
                <div className="h-24 w-px bg-white/6" />
              </div>

              <div className="absolute z-0 left-1/2 top-10 h-36 w-56 -translate-x-1/2 rounded-[2rem] bg-[linear-gradient(180deg,rgba(28,28,31,0.96),rgba(10,10,12,0.98))] shadow-[0_20px_90px_rgba(0,0,0,0.6)] ring-1 ring-white/6">
                <div className="absolute right-5 top-5 h-3 w-3 rounded-full bg-white/6 shadow-[0_0_18px_rgba(255,255,255)]" />

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
                  <span className="h-14 w-7 skew-y-[-18deg] rounded-sm bg-zinc-800/90" />
                  <span className="h-14 w-7 skew-y-[-18deg] rounded-sm bg-zinc-700/70" />
                </div>

                <div className="absolute -left-10 top-[45%] h-px w-10 dark:bg-white/8 bg-slate-200" />
                <div className="absolute -right-10 top-[48%] h-px w-10 dark:bg-white/8" />
                <div className="absolute -right-14 top-[46%] h-4 w-4 rounded-md dark:bg-white/4" />
                <div className="absolute -left-14 top-[40%] h-4 w-4 rounded-md dark:bg-white/4" />
                <div className="absolute -right-28 top-[52%] h-4 w-4 rounded-md dark:bg-white/4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Social media navigation row */}
        <nav
          aria-label="Social media links"
          className="relative grid grid-cols-2 md:grid-cols-4"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px dark:bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px dark:bg-white/8"
          />

          {socialLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-between px-6 py-6 text-lg dark:text-white/90 transition hover:text-white",
                index !== socialLinks.length - 1 && "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-10 md:after:w-px md:after:-translate-y-1/2 md:after:bg-white/8"
              )}
            >
              <span className="text-base">{item.label}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition group-hover:translate-x-1"
              />
            </Link>
          ))}
        </nav>
          {/* Footer link columns */}
        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {footerColumns.map((column, index) => (
            <section
              key={column.title}
              aria-labelledby={`footer-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "relative min-h-[320px] px-6 py-14",
                index !== footerColumns.length - 1 &&
                  "after:absolute after:right-0 after:top-0 after:h-full after:w-px dark:after:bg-white/6"
              )}
            >
                {/* Section heading for accessibility and structure */}
              <h3
                id={`footer-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="mb-8 text-xs uppercase tracking-[0.18em] dark:text-white/30"
              >
                {column.title}
              </h3>

              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-base dark:text-white/88 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </footer>
  );
}