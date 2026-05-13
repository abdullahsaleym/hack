"use client";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-2xl font-black tracking-tight"
            style={{ color: "#FF4D1C" }}
          >
            atomcamp
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-widest">
            SMART LMS
          </span>
        </div>

        {/* Right side info */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            10,000+ Learners
          </span>
          <span>80% Job Placement</span>
          <span
            className="font-semibold"
            style={{ color: "#FF4D1C" }}
          >
            Powered by Claude AI
          </span>
        </div>
      </div>
    </header>
  );
}
