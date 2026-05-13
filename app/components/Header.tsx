"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Student Portal", href: "/" },
    { label: "Instructor Admin", href: "/instructor" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: "#0d9488" }}
          >
            atomcamp
          </span>
          <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-widest">
            Smart LMS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "px-4 py-2 text-sm font-semibold rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:text-white transition-all duration-300 ease-in-out"
                    : "px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 ease-in-out rounded-full hover:bg-indigo-50 hover:text-indigo-600"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
