"use client";

interface GapItem {
  questionId: number;
  missingConcept: string;
  whyStruggling: string;
  nextStep: string;
  resource: string;
}

interface AnalysisData {
  score: number;
  total: number;
  performanceLevel: string;
  overallFeedback: string;
  gapAnalysis: GapItem[];
  strengthAreas: string[];
  studyPlan: string;
  encouragement: string;
}

interface GapAnalysisViewProps {
  data: AnalysisData;
  learnerName: string;
  moduleTopic: string;
  courseName: string;
  onStartOver: () => void;
}

export default function GapAnalysisView({
  data,
  learnerName,
  moduleTopic,
  courseName,
  onStartOver,
}: GapAnalysisViewProps) {
  const scorePercent = Math.round((data.score / data.total) * 100);

  const performanceConfig: Record<
    string,
    { color: string; bg: string; emoji: string }
  > = {
    Excellent: { color: "#10B981", bg: "#ECFDF5", emoji: "🏆" },
    Good: { color: "#3B82F6", bg: "#EFF6FF", emoji: "👍" },
    "Needs Work": { color: "#F59E0B", bg: "#FFFBEB", emoji: "📚" },
    Beginner: { color: "#0d9488", bg: "#f0fdfa", emoji: "🌱" },
  };

  const perf =
    performanceConfig[data.performanceLevel] ??
    performanceConfig["Needs Work"];

  return (
    <div className="fade-in w-full max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ backgroundColor: "#f0fdfa", color: "#0d9488" }}
        >
          <span>📊</span> Your Gap Analysis
        </div>
        <h2 className="text-2xl font-black text-gray-900">
          {learnerName}&apos;s Learning Report
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {moduleTopic} · {courseName}
        </p>
      </div>

      {/* Score card */}
      <div
        className="rounded-2xl p-5 flex items-center gap-5"
        style={{ backgroundColor: perf.bg, border: `1px solid ${perf.color}30` }}
      >
        {/* Score circle */}
        <div
          className="w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 text-white shadow-md"
          style={{ backgroundColor: perf.color }}
        >
          <span className="text-2xl font-black leading-none">{scorePercent}%</span>
          <span className="text-xs opacity-80">
            {data.score}/{data.total}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{perf.emoji}</span>
            <span
              className="text-sm font-black"
              style={{ color: perf.color }}
            >
              {data.performanceLevel}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.overallFeedback}
          </p>
        </div>
      </div>

      {/* Strength areas */}
      {data.strengthAreas && data.strengthAreas.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-green-500">✓</span> What You Already Know
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.strengthAreas.map((strength, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gap analysis */}
      {data.gapAnalysis && data.gapAnalysis.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span style={{ color: "#0d9488" }}>⚡</span> Concepts to Focus On
          </h4>
          <div className="space-y-4">
            {data.gapAnalysis.map((gap, index) => (
              <div
                key={gap.questionId}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "#fff8f6",
                  borderColor: "#0d948820",
                }}
              >
                {/* Missing concept */}
                <div className="flex items-start gap-2 mb-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#0d9488" }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-gray-900">
                      {gap.missingConcept}
                    </span>
                  </div>
                </div>

                {/* Why struggling */}
                <div className="ml-7 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">
                      Why
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {gap.whyStruggling}
                    </p>
                  </div>

                  {/* Next step */}
                  <div
                    className="flex items-start gap-2 rounded-lg p-2.5"
                    style={{ backgroundColor: "#f0fdfa" }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide w-20 flex-shrink-0 pt-0.5" style={{ color: "#0d9488" }}>
                      Next Step
                    </span>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: "#0d9488" }}>
                      {gap.nextStep}
                    </p>
                  </div>

                  {/* Resource */}
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">
                      Focus On
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {gap.resource}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h4 className="text-sm font-bold text-green-700 mb-1">
            Perfect Score — No Gaps Found!
          </h4>
          <p className="text-xs text-gray-500">
            You have strong foundational knowledge for this module. You&apos;re
            ready to hit the ground running on day one!
          </p>
        </div>
      )}

      {/* Study plan */}
      <div className="bg-gray-900 rounded-2xl p-5 text-white">
        <h4 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-gray-300">
          <span>📅</span> Your 7-Day Study Plan
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
          {data.studyPlan}
        </p>
        <div
          className="mt-4 p-3 rounded-xl text-sm font-medium"
          style={{ backgroundColor: "#0d948815", color: "#0d9488" }}
        >
          💡 {data.encouragement}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="mailto:admissions@atomcamp.com"
          className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all hover:bg-gray-50"
          style={{ borderColor: "#0d9488", color: "#0d9488" }}
        >
          <span>✉️</span> Enrol Now
        </a>
        <button
          onClick={onStartOver}
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#0d9488" }}
        >
          <span>↩</span> Start Over
        </button>
      </div>

      {/* atomcamp footer */}
      <div className="text-center text-xs text-gray-400 pb-6 space-y-1">
        <p>
          <span className="font-bold" style={{ color: "#0d9488" }}>
            atomcamp
          </span>{" "}
          · 70+ corporate clients · Careem, HBL, UBL, Engro, Jazz, Telenor,
          UNDP
        </p>
        <p>
          <a href="tel:+923022278371" className="underline">
            +92-302-2278371
          </a>{" "}
          ·{" "}
          <a
            href="mailto:admissions@atomcamp.com"
            className="underline"
            style={{ color: "#0d9488" }}
          >
            admissions@atomcamp.com
          </a>
        </p>
      </div>
    </div>
  );
}
