import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header
      className="fixed right-0 left-0 top-0 z-100 flex items-center justify-between border-b border-neutral-900 bg-black/40 px-4 py-4 backdrop-blur-lg"
    >
      <div className="flex items-center gap-1">
        <Link href="/" aria-label="Go to homepage" className="inline-flex">
      <div className="flex items-center gap-[2px] text-white">
        <p className="text-3xl font-bold">Zip</p>
        <Image
          src="/fuzzieLogo.png"
          width={15}
          height={15}
          alt="Zipeline logo"
          className="shadow-sm"
        />
        <p className="text-3xl font-bold">line</p>
      </div>

        </Link>
      </div>

      <nav
        aria-label="Primary"
        className="absolute left-[50%] top-[50%] hidden -translate-x-1/2 -translate-y-1/2 transform md:block"
      >
        <ul className="flex list-none items-center gap-4 text-white">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span
            aria-hidden="true"
            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
          />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Dashboard
          </span>
        </Link>

        <button
          type="button"
          aria-label="Open navigation menu"
          className="md:hidden"
        >
          <MenuIcon aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;