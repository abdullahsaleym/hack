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
    name: "Fatima Khan",
    goal: "Get a job in AI / Data Science",
    bootcamp: "AI Bootcamp (Cohort 18)",
    quizScore: 1,
    quizTotal: 4,
    topGap: "Python Loops & Functions",
    risk: "High Risk",
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    goal: "Start freelancing on Upwork",
    bootcamp: "Data Analytics Bootcamp",
    quizScore: 3,
    quizTotal: 4,
    topGap: "DAX Calculated Columns",
    risk: "On Track",
    lastActive: "Today",
  },
  {
    id: 3,
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
    name: "Zainab Hussain",
    goal: "Upskill at my current job",
    bootcamp: "Data Analytics Bootcamp",
    quizScore: 1,
    quizTotal: 4,
    topGap: "SQL JOINs & Aggregations",
    risk: "High Risk",
    lastActive: "3 days ago",
  },
];

// ── Derived KPIs ───────────────────────────────────────────────────────────

const totalLearners = students.length;
const avgScore = Math.round(
  (students.reduce((sum, s) => sum + (s.quizScore / s.quizTotal) * 100, 0) /
    students.length)
);
const highRiskCount = students.filter((s) => s.risk === "High Risk").length;

// ── Risk Badge ─────────────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: RiskLevel }) {
  const config: Record<RiskLevel, { bg: string; text: string; dot: string }> = {
    "High Risk": {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
    Monitor: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
    },
    "On Track": {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },
  };
  const c = config[risk];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {risk}
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
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black" style={{ color: "#FF4D1C" }}>
              atomcamp
            </span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="hidden sm:block text-sm font-semibold text-gray-500">
              Instructor Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">
              Live · Updated just now
            </span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">
              I
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Learner Intelligence
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time gap analysis and intervention signals across all active
            bootcamps.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Learners */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#fff1ed" }}
            >
              👥
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total Active Learners
              </p>
              <p className="text-3xl font-black text-gray-900 leading-none mt-1">
                {totalLearners}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Across 4 bootcamps</p>
            </div>
          </div>

          {/* Avg Quiz Score */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#eff6ff" }}
            >
              📊
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
              <p className="text-xs text-gray-400 mt-0.5">
                Cohort diagnostic average
              </p>
            </div>
          </div>

          {/* High Risk */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl flex-shrink-0">
              🚨
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                High-Risk Students
              </p>
              <p className="text-3xl font-black text-red-600 leading-none mt-1">
                {highRiskCount}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Need immediate intervention
              </p>
            </div>
          </div>
        </div>

        {/* Actionable Intelligence Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Learner Gap Analysis
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Sorted by intervention priority
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
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
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Enrolled Bootcamp
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Quiz Score
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Top Knowledge Gap
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
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
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Learner */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                            style={{ backgroundColor: "#FF4D1C" }}
                          >
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {student.goal}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Bootcamp */}
                      <td className="px-5 py-4">
                        <span className="text-gray-700 font-medium">
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
                          className={`text-sm font-medium ${
                            student.topGap.startsWith("None")
                              ? "text-green-600"
                              : "text-gray-800"
                          }`}
                        >
                          {student.topGap}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="px-5 py-4">
                        <RiskBadge risk={student.risk} />
                      </td>

                      {/* Last active */}
                      <td className="px-5 py-4 text-xs text-gray-400">
                        {student.lastActive}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
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
                <div key={student.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ backgroundColor: "#FF4D1C" }}
                      >
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400">{student.goal}</p>
                      </div>
                    </div>
                    <RiskBadge risk={student.risk} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Bootcamp
                      </p>
                      <p className="text-gray-700 font-medium">
                        {student.bootcamp}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Last Active
                      </p>
                      <p className="text-gray-700">{student.lastActive}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                      Quiz Score
                    </p>
                    <ScoreBar
                      score={student.quizScore}
                      total={student.quizTotal}
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                      Top Knowledge Gap
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        student.topGap.startsWith("None")
                          ? "text-green-600"
                          : "text-gray-800"
                      }`}
                    >
                      {student.topGap}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Intervention Recommendations */}
        <div className="bg-gray-900 rounded-2xl p-5 text-white">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
            <span>⚡</span> Recommended Instructor Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-red-400 text-lg flex-shrink-0">🚨</span>
              <div>
                <p className="text-sm font-semibold text-red-300">
                  Immediate: Reach out to Fatima Khan & Zainab Hussain
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Both scored 25% on their diagnostic quiz. Schedule a 1:1
                  catch-up session before the next class.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 text-lg flex-shrink-0">👀</span>
              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  Monitor: Sara Malik needs REST API support
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Scored 50% — share the REST API pre-reading resource before
                  Module 3 of Agentic AI Bootcamp.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-green-400 text-lg flex-shrink-0">🏆</span>
              <div>
                <p className="text-sm font-semibold text-green-300">
                  Highlight: Usman Tariq scored 100%
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Consider assigning as a peer mentor for the Automation
                  Bootcamp cohort.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pb-4">
          <span className="font-bold" style={{ color: "#FF4D1C" }}>
            atomcamp
          </span>{" "}
          Smart LMS · Instructor View · Built for atomcamp Hackathon 2025
        </footer>
      </main>
    </div>
  );
}
