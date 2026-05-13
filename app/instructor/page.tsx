import type { Metadata } from "next";
import { mockStudents, kpis, type Status } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Instructor Dashboard — atomcamp Smart LMS",
  description: "Real-time learner intelligence for atomcamp instructors",
};

// ── Helpers ────────────────────────────────────────────────────────────────

function statusStyles(status: Status) {
  switch (status) {
    case "At Risk":
      return {
        badge: "bg-red-100 text-red-700 border border-red-200",
        dot: "bg-red-500",
        bar: "bg-red-500",
      };
    case "Needs Attention":
      return {
        badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        dot: "bg-yellow-500",
        bar: "bg-yellow-400",
      };
    case "On Track":
      return {
        badge: "bg-teal-100 text-teal-700 border border-teal-200",
        dot: "bg-teal-500",
        bar: "bg-teal-500",
      };
    case "Excelling":
      return {
        badge: "bg-green-100 text-green-700 border border-green-200",
        dot: "bg-green-500",
        bar: "bg-green-500",
      };
  }
}

// ── Sub-components (Server-safe — no event handlers) ──────────────────────

function KpiCard({
  emoji,
  label,
  value,
  sub,
  accent,
}: {
  emoji: string;
  label: string;
  value: string | number;
  sub: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5 flex items-center gap-4"
      style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: "#002333" }}
      >
        {emoji}
      </div>
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#5a9ab0" }}
        >
          {label}
        </p>
        <p className={`text-3xl font-black leading-none mt-1 ${accent}`}>
          {value}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium" style={{ color: "#5a9ab0" }}>
          Progress
        </span>
        <span className="text-xs font-bold text-white">{value}%</span>
      </div>
      <div
        className="w-full rounded-full h-2"
        style={{ backgroundColor: "#002333" }}
      >
        <div
          className={`h-2 rounded-full transition-all ${barClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const s = statusStyles(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
      style={{ backgroundColor: "#99d930", color: "#002333" }}
    >
      {initials}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#002333" }}>
      {/* ── Header ── */}
      <header
        className="border-b sticky top-0 z-10"
        style={{ backgroundColor: "#002333", borderColor: "#003a52" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black" style={{ color: "#99d930" }}>
              atomcamp
            </span>
            <span className="hidden sm:block" style={{ color: "#004d6b" }}>
              |
            </span>
            <span
              className="hidden sm:block text-sm font-semibold"
              style={{ color: "#99d930" }}
            >
              Instructor Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs hidden sm:block"
              style={{ color: "#5a9ab0" }}
            >
              Live · Updated just now
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: "#003a52", color: "#99d930" }}
            >
              I
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Page Title ── */}
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#99d930" }}>
            Learner Intelligence
          </h1>
          <p className="text-sm mt-1" style={{ color: "#5a9ab0" }}>
            Real-time gap analysis and intervention signals across all active
            bootcamps.
          </p>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            emoji="👥"
            label="Active Learners"
            value={kpis.totalLearners}
            sub="Across 4 bootcamps"
            accent="text-white"
          />
          <KpiCard
            emoji="📈"
            label="Avg. Progress"
            value={`${kpis.avgProgress}%`}
            sub="Cohort average"
            accent="text-teal-400"
          />
          <KpiCard
            emoji="🚨"
            label="At Risk"
            value={kpis.atRiskCount}
            sub="Need intervention"
            accent="text-red-400"
          />
          <KpiCard
            emoji="🏆"
            label="Excelling"
            value={kpis.excellingCount}
            sub="Peer mentor candidates"
            accent="text-green-400"
          />
        </div>

        {/* ── Student Grid ── */}
        <div>
          <h2
            className="text-base font-bold mb-4"
            style={{ color: "#99d930" }}
          >
            Learner Gap Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStudents.map((student) => {
              const s = statusStyles(student.status);
              return (
                <div
                  key={student.id}
                  className="rounded-2xl border p-5 space-y-4"
                  style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} />
                      <div>
                        <p className="font-bold text-white text-sm">
                          {student.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#99d930" }}
                        >
                          {student.bootcamp}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={student.status} />
                  </div>

                  {/* Progress bar */}
                  <ProgressBar
                    value={student.progress}
                    barClass={s.bar}
                  />

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Next Topic
                      </p>
                      <p className="font-medium text-white">
                        {student.nextTopic}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Quiz Score
                      </p>
                      <p className="font-bold text-white">{student.quizScore}</p>
                    </div>
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Goal
                      </p>
                      <p className="font-medium text-white">{student.goal}</p>
                    </div>
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Last Active
                      </p>
                      <p className="font-medium text-white">
                        {student.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recommended Actions ── */}
        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
        >
          <h3
            className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
            style={{ color: "#99d930" }}
          >
            <span>⚡</span> Recommended Instructor Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <span className="text-red-400 text-lg flex-shrink-0">🚨</span>
              <div>
                <p className="text-sm font-semibold text-red-300">
                  Immediate: Reach out to Abdullah S.
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  Only 42% through the bootcamp. Top gap: Advanced Prompt
                  Engineering — schedule a 1:1 before Module 3.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 text-lg flex-shrink-0">👀</span>
              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  Monitor: Sara Malik needs targeted support
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  REST API concepts still unaddressed. Share pre-reading
                  materials before Module 4 live session.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-green-400 text-lg flex-shrink-0">🏆</span>
              <div>
                <p className="text-sm font-semibold text-green-300">
                  Highlight: Fatima Khan scored 100% — peer mentor candidate
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  Strong candidate to mentor at-risk students in Cohort 18.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          className="text-center text-xs pb-4"
          style={{ color: "#5a9ab0" }}
        >
          <span className="font-bold" style={{ color: "#99d930" }}>
            atomcamp
          </span>{" "}
          Smart LMS · Instructor View · Built for atomcamp Hackathon 2025
        </footer>
      </main>
    </div>
  );
}
