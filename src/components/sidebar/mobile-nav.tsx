// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import { menuOptions } from "@/lib/constant";

// export default function MobileNav() {
//   const pathName = usePathname();

//   const mobileItems = menuOptions.filter((item) =>
//     ["/dashboard", "/job-description", "/workflows", "/settings"].includes(
//       item.href,
//     ),
//   );

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/70 backdrop-blur-lg md:hidden">
//       <nav className="mx-auto flex max-w-6xl items-center justify-around px-3 py-2">
//         {mobileItems.map((item) => {
//           const active = pathName === item.href;

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={clsx(
//                 "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs",
//                 active
//                   ? "dark:bg-[#2F006B] bg-[#EEE0FF]"
//                   : "text-muted-foreground",
//               )}
//             >
//               <div className="scale-[1.1]">
//                 <item.Component selected={active} />
//               </div>
//               <span className={clsx(active ? "text-foreground" : "")}>
//                 {item.name}
//               </span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { menuOptions } from "@/lib/constant";

export default function MobileNav() {
  const pathName = usePathname();

  const mobileItems = menuOptions.filter((item) =>
    [
      "/dashboard",
      "/job-description",
      "/workflows",
      "/settings",
      // "/templates",
      // "/logs",
    ].includes(item.href),
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/70 backdrop-blur-lg md:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-around px-3 py-2">
        {mobileItems.map((item) => {
          const active = pathName === item.href;

          if (item.comingSoon) {
            return (
              <span
                key={item.name}
                aria-label={`${item.name} coming soon`}
                aria-disabled="true"
                className="flex cursor-not-allowed flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs text-muted-foreground opacity-60"
              >
                <div className="scale-[1.1]">
                  <item.Component selected={false} />
                </div>
                <span>{item.name}</span>
              </span>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs",
                active
                  ? "bg-[#EEE0FF] dark:bg-[#2F006B]"
                  : "text-muted-foreground",
              )}
            >
              <div className="scale-[1.1]">
                <item.Component selected={active} />
              </div>
              <span className={clsx(active ? "text-foreground" : "")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}