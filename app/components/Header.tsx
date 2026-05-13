"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Student Portal", href: "/", emoji: "🎓" },
    { label: "Instructor Dashboard", href: "/instructor", emoji: "📊" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#002333", borderColor: "#003a52" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: "#99d930" }}
          >
            atomcamp
          </span>
          <span
            className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
            style={{ backgroundColor: "#003a52", color: "#5a9ab0" }}
          >
            Smart LMS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#002333]"
                    : "text-[#5a9ab0] hover:text-white"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "#99d930" }
                    : { backgroundColor: "transparent" }
                }
              >
                <span className="hidden sm:inline">{link.emoji}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
