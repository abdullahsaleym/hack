"use client";

interface Module {
  moduleNumber: number;
  moduleName: string;
  description: string;
  isFirst?: boolean;
}

interface RecommendationData {
  recommendedCourse: string;
  coursePrice: string;
  courseDuration: string;
  courseStart: string;
  recommendationReason: string;
  learningPath: Module[];
  firstModuleTopic: string;
  encouragement: string;
}

interface RecommendationViewProps {
  data: RecommendationData;
  learnerName: string;
  onStartQuiz: () => void;
  isLoading: boolean;
}

export default function RecommendationView({
  data,
  learnerName,
  onStartQuiz,
  isLoading,
}: RecommendationViewProps) {
  const courseColorMap: Record<string, string> = {
    "AI Bootcamp": "#0d9488",
    "Data Analytics Bootcamp": "#7C3AED",
    "Agentic AI Bootcamp": "#0EA5E9",
    "Automation with AI Bootcamp": "#10B981",
    "AI for Teens": "#F59E0B",
  };

  const courseColor =
    Object.entries(courseColorMap).find(([key]) =>
      data.recommendedCourse.includes(key)
    )?.[1] ?? "#0d9488";

  return (
    <div className="fade-in w-full max-w-2xl mx-auto space-y-5">
      {/* Greeting */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ backgroundColor: "#f0fdfa", color: "#0d9488" }}
        >
          <span>✨</span> Your Personalised Path is Ready
        </div>
        <h2 className="text-2xl font-black text-gray-900">
          Hey {learnerName}! Here&apos;s your path 🎯
        </h2>
        <p className="text-gray-500 text-sm mt-1">{data.encouragement}</p>
      </div>

      {/* Recommended Course Card */}
      <div
        className="rounded-2xl p-5 text-white shadow-lg"
        style={{ backgroundColor: courseColor }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">
              Recommended Course
            </div>
            <h3 className="text-xl font-black leading-tight mb-2">
              {data.recommendedCourse}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {data.recommendationReason}
            </p>
          </div>
        </div>

        {/* Course meta */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
          <div>
            <div className="text-xs opacity-70">Price</div>
            <div className="text-sm font-bold">{data.coursePrice}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">Duration</div>
            <div className="text-sm font-bold">{data.courseDuration}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">Starts</div>
            <div className="text-sm font-bold">{data.courseStart}</div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Your Learning Path — {data.learningPath.length} Modules
        </h4>

        <div className="space-y-0">
          {data.learningPath.map((module, index) => (
            <div key={module.moduleNumber} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white shadow-sm"
                  style={{
                    backgroundColor:
                      index === 0 ? courseColor : index < 3 ? "#374151" : "#D1D5DB",
                  }}
                >
                  {index === 0 ? "▶" : module.moduleNumber}
                </div>
                {index < data.learningPath.length - 1 && (
                  <div className="w-0.5 h-6 bg-gray-100 my-1"></div>
                )}
              </div>

              {/* Module content */}
              <div
                className={`pb-4 flex-1 ${
                  index === 0
                    ? "rounded-xl p-3 -mt-0.5 mb-1"
                    : ""
                }`}
                style={
                  index === 0
                    ? { backgroundColor: "#f0fdfa", border: `1px solid ${courseColor}30` }
                    : {}
                }
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-sm font-bold ${
                      index === 0 ? "" : "text-gray-700"
                    }`}
                    style={index === 0 ? { color: courseColor } : {}}
                  >
                    {module.moduleName}
                  </span>
                  {index === 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: courseColor,
                        color: "white",
                      }}
                    >
                      Start Here
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First module highlight + CTA */}
      <div className="bg-gray-900 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🧠</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Ready to test your knowledge?
          </span>
        </div>
        <h4 className="text-lg font-black mb-1">
          First Module: {data.firstModuleTopic}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          Take a 4-question diagnostic quiz. Claude AI will analyse your answers
          and show you exactly what to focus on before your first class.
        </p>
        <button
          onClick={onStartQuiz}
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: "#0d9488" }}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner"></span>
              Generating your quiz...
            </>
          ) : (
            <>
              <span>🚀</span>
              Start First Quiz — {data.firstModuleTopic}
            </>
          )}
        </button>
      </div>

      {/* Contact footer */}
      <div className="text-center text-xs text-gray-400 pb-4">
        Questions? Contact{" "}
        <a
          href="mailto:admissions@atomcamp.com"
          className="underline"
          style={{ color: "#0d9488" }}
        >
          admissions@atomcamp.com
        </a>{" "}
        or call{" "}
        <a href="tel:+923022278371" className="underline">
          +92-302-2278371
        </a>
      </div>
    </div>
  );
}
