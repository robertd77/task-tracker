"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    clsx(
      "px-3 py-1.5 rounded-md transition",
      pathname === href
        ? "bg-white text-teal-600 shadow-sm"
        : "text-teal-100 hover:bg-teal-500/60",
    );

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-teal-500">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* App name  */}
        <Link
          href="/tasks"
          className="text-xl font-bold text-white tracking-tight"
        >
          TaskTracker
        </Link>

        {/* Nav links */}
        <div className="flex gap-2 text-sm font-semibold">
          <Link href="/tasks" className={linkClass("/tasks")}>
            Tasks
          </Link>
          <Link href="/activity" className={linkClass("/activity")}>
            Activity
          </Link>
        </div>
      </div>
    </nav>
  );
}
