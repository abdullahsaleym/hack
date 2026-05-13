import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructor Dashboard — atomcamp Smart LMS",
  description: "Actionable intelligence for atomcamp instructors",
};

// ── Mock Data ──────────────────────────────────────────────────────────────

type RiskLevel = "High Risk" | "Monitor" | "On Track";

interface Student {
  id: number;
  name: string;
  goal: string;
  bootcamp: string;
  quizScore: number;
  quizTotal: number;
  topGap: string;
  risk: RiskLevel;
  lastActive: string;
}

const students: Student[] = [
  {
    id: 1,
    name: "Abdullah",
    goal: "Learn Agentic AI",
    bootcamp: "Agentic AI Bootcamp",
    quizScore: 2,
    quizTotal: 4,
    topGap: "Advanced Prompting",
    risk: "High Risk",
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Sara Malik",
    goal: "Transition into tech from another field",
    bootcamp: "Agentic AI Bootcamp",
    quizScore: 2,
    quizTotal: 4,
    topGap: "REST API Concepts",
    risk: "Monitor",
    lastActive: "Yesterday",
  },
  {
    id: 3,
    name: "Ahmed Raza",
    goal: "Start freelancing on Upwork",
    bootcamp: "Data Analytics Bootcamp",
    quizScore: 3,
    quizTotal: 4,
    topGap: "DAX Calculated Columns",
    risk: "Monitor",
    lastActive: "Today",
  },
  {
    id: 4,
    name: "Usman Tariq",
    goal: "Build AI automation for my business",
    bootcamp: "Automation with AI Bootcamp",
    quizScore: 4,
    quizTotal: 4,
    topGap: "None — Perfect Score",
    risk: "On Track",
    lastActive: "2 days ago",
  },
  {
    id: 5,
    name: "Fatima Khan",
    goal: "Get a job in AI / Data Science",
    bootcamp: "AI Bootcamp (Cohort 18)",
    quizScore: 4,
    quizTotal: 4,
    topGap: "None — Perfect Score",
    risk: "On Track",
    lastActive: "Today",
  },
];

// ── Derived KPIs ───────────────────────────────────────────────────────────

const totalLearners = students.length;
const avgScore = Math.round(
  students.reduce((sum, s) => sum + (s.quizScore / s.quizTotal) * 100, 0) /
    students.length
);
const highRiskCount = students.filter((s) => s.risk === "High Risk").length;

// ── Risk Badge ─────────────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: RiskLevel }) {
  if (risk === "High Risk") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm shadow-red-400">
        <span className="w-1.5 h-1.5 rounded-full bg-red-200 animate-pulse"></span>
        High Risk
      </span>
    );
  }
  if (risk === "Monitor") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
        Monitor
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
      On Track
    </span>
  );
}

// ── Score Bar ──────────────────────────────────────────────────────────────

function ScoreBar({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100);
  const color =
    pct >= 75 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 w-12 text-right">
        {score}/{total} ({pct}%)
      </span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#002333" }}>
      {/* Top nav */}
      <header
        className="border-b sticky top-0 z-10"
        style={{ backgroundColor: "#002333", borderColor: "#003a52" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black" style={{ color: "#99d930" }}>
              atomcamp
            </span>
            <span className="hidden sm:block" style={{ color: "#004d6b" }}>|</span>
            <span
              className="hidden sm:block text-sm font-semibold"
              style={{ color: "#99d930" }}
            >
              Instructor Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs hidden sm:block" style={{ color: "#5a9ab0" }}>
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
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#99d930" }}>
            Learner Intelligence
          </h1>
          <p className="text-sm mt-1" style={{ color: "#5a9ab0" }}>
            Real-time gap analysis and intervention signals across all active
            bootcamps.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Learners */}
          <div
            className="rounded-2xl border p-5 flex items-center gap-4"
            style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#002333" }}
            >
              👥
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#5a9ab0" }}
              >
                Total Active Learners
              </p>
              <p
                className="text-3xl font-black leading-none mt-1"
                style={{ color: "#99d930" }}
              >
                {totalLearners}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                Across 4 bootcamps
              </p>
            </div>
          </div>

          {/* Avg Quiz Score */}
          <div
            className="rounded-2xl border p-5 flex items-center gap-4"
            style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#002333" }}
            >
              📊
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#5a9ab0" }}
              >
                Average Quiz Score
              </p>
              <p
                className="text-3xl font-black leading-none mt-1"
                style={{
                  color:
                    avgScore >= 75
                      ? "#10B981"
                      : avgScore >= 50
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              >
                {avgScore}%
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                Cohort diagnostic average
              </p>
            </div>
          </div>

          {/* High Risk */}
          <div
            className="rounded-2xl border p-5 flex items-center gap-4"
            style={{ backgroundColor: "#003a52", borderColor: "#7f1d1d" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#450a0a" }}
            >
              🚨
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#5a9ab0" }}
              >
                High-Risk Students
              </p>
              <p className="text-3xl font-black text-red-500 leading-none mt-1">
                {highRiskCount}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                Need immediate intervention
              </p>
            </div>
          </div>
        </div>

        {/* Actionable Intelligence Table */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "#003a52", borderColor: "#004d6b" }}
        >
          {/* Table header */}
          <div
            className="px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{ borderColor: "#004d6b" }}
          >
            <div>
              <h2 className="text-base font-bold" style={{ color: "#99d930" }}>
                Learner Gap Analysis
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                Sorted by intervention priority
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-red-200"></span>
                {highRiskCount} High Risk
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                {students.filter((s) => s.risk === "Monitor").length} Monitor
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {students.filter((s) => s.risk === "On Track").length} On Track
              </span>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{ backgroundColor: "#002333", borderColor: "#004d6b" }}
                >
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Learner
                  </th>
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Enrolled Bootcamp
                  </th>
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Quiz Score
                  </th>
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Top Knowledge Gap
                  </th>
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#5a9ab0" }}
                  >
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...students]
                  .sort((a, b) => {
                    const order: Record<RiskLevel, number> = {
                      "High Risk": 0,
                      Monitor: 1,
                      "On Track": 2,
                    };
                    return order[a.risk] - order[b.risk];
                  })
                  .map((student) => (
                    <tr
                      key={student.id}
                      className="border-b transition-colors hover:bg-[#002d42]"
                      style={{
                        borderColor: "#004d6b",
                      }}
                    >
                      {/* Learner */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                            style={{
                              backgroundColor: "#99d930",
                              color: "#002333",
                            }}
                          >
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {student.name}
                            </p>
                            <p className="text-xs" style={{ color: "#5a9ab0" }}>
                              {student.goal}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Bootcamp */}
                      <td className="px-5 py-4">
                        <span className="font-medium" style={{ color: "#99d930" }}>
                          {student.bootcamp}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-5 py-4">
                        <ScoreBar
                          score={student.quizScore}
                          total={student.quizTotal}
                        />
                      </td>

                      {/* Gap */}
                      <td className="px-5 py-4">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: student.topGap.startsWith("None")
                              ? "#10B981"
                              : "#e2e8f0",
                          }}
                        >
                          {student.topGap}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="px-5 py-4">
                        <RiskBadge risk={student.risk} />
                      </td>

                      {/* Last active */}
                      <td className="px-5 py-4 text-xs" style={{ color: "#5a9ab0" }}>
                        {student.lastActive}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y" style={{ borderColor: "#004d6b" }}>
            {[...students]
              .sort((a, b) => {
                const order: Record<RiskLevel, number> = {
                  "High Risk": 0,
                  Monitor: 1,
                  "On Track": 2,
                };
                return order[a.risk] - order[b.risk];
              })
              .map((student) => (
                <div
                  key={student.id}
                  className="p-4 space-y-3"
                  style={{ borderColor: "#004d6b" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{ backgroundColor: "#99d930", color: "#002333" }}
                      >
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {student.name}
                        </p>
                        <p className="text-xs" style={{ color: "#5a9ab0" }}>
                          {student.goal}
                        </p>
                      </div>
                    </div>
                    <RiskBadge risk={student.risk} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Bootcamp
                      </p>
                      <p className="font-medium" style={{ color: "#99d930" }}>
                        {student.bootcamp}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color: "#5a9ab0" }}
                      >
                        Last Active
                      </p>
                      <p className="text-white">{student.lastActive}</p>
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide mb-1"
                      style={{ color: "#5a9ab0" }}
                    >
                      Quiz Score
                    </p>
                    <ScoreBar
                      score={student.quizScore}
                      total={student.quizTotal}
                    />
                  </div>

                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                      style={{ color: "#5a9ab0" }}
                    >
                      Top Knowledge Gap
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: student.topGap.startsWith("None")
                          ? "#10B981"
                          : "#e2e8f0",
                      }}
                    >
                      {student.topGap}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Intervention Recommendations */}
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
                  Immediate: Reach out to Abdullah
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  Scored 50% on the Agentic AI diagnostic. Key gap is Advanced
                  Prompting — schedule a 1:1 before Module 2.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 text-lg flex-shrink-0">👀</span>
              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  Monitor: Sara Malik & Ahmed Raza need targeted support
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  Sara needs REST API pre-reading before Module 3. Ahmed should
                  revisit DAX Calculated Columns before the next Power BI session.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-green-400 text-lg flex-shrink-0">🏆</span>
              <div>
                <p className="text-sm font-semibold text-green-300">
                  Highlight: Usman Tariq & Fatima Khan scored 100%
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5a9ab0" }}>
                  Both are strong candidates for peer mentorship roles in their
                  respective bootcamp cohorts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs pb-4" style={{ color: "#5a9ab0" }}>
          <span className="font-bold" style={{ color: "#99d930" }}>
            atomcamp
          </span>{" "}
          Smart LMS · Instructor View · Built for atomcamp Hackathon 2025
        </footer>
      </main>
    </div>
  );
}
