"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isInstructor = pathname === "/instructor";

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <span
              className="text-2xl font-black tracking-tight cursor-pointer"
              style={{ color: "#FF4D1C" }}
            >
              atomcamp
            </span>
          </Link>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-widest">
            SMART LMS
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              10,000+ Learners
            </span>
            <span>80% Job Placement</span>
            <span className="font-semibold" style={{ color: "#FF4D1C" }}>
              AI-Powered
            </span>
          </div>

          {/* Instructor toggle */}
          {isInstructor ? (
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:bg-gray-50"
              style={{ borderColor: "#FF4D1C", color: "#FF4D1C" }}
            >
              ← Learner View
            </Link>
          ) : (
            <Link
              href="/instructor"
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF4D1C" }}
            >
              Instructor View →
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
