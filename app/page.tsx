"use client";

import { useState } from "react";
import Header from "./components/Header";
import OnboardingForm from "./components/OnboardingForm";
import RecommendationView from "./components/RecommendationView";
import QuizView from "./components/QuizView";
import GapAnalysisView from "./components/GapAnalysisView";

// ── Types ──────────────────────────────────────────────────────────────────

interface OnboardingData {
  name: string;
  background: string;
  goal: string;
  experience: string;
  age: string;
}

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

interface Question {
  id: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

interface QuizData {
  moduleTopic: string;
  courseName: string;
  questions: Question[];
}

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

// ── Step type ──────────────────────────────────────────────────────────────

type Step =
  | "onboarding"
  | "loading_recommendation"
  | "recommendation"
  | "loading_quiz"
  | "quiz"
  | "loading_analysis"
  | "analysis";

// ── Loading screen ─────────────────────────────────────────────────────────

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full border-4 border-t-transparent spinner"
          style={{ borderColor: "#0d948840", borderTopColor: "#0d9488" }}
        ></div>
        <div
          className="absolute inset-0 flex items-center justify-center text-xl"
        >
          🤖
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">{message}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span
            className="w-2 h-2 rounded-full dot-1"
            style={{ backgroundColor: "#0d9488" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full dot-2"
            style={{ backgroundColor: "#0d9488" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full dot-3"
            style={{ backgroundColor: "#0d9488" }}
          ></span>
        </div>
      </div>
      <p className="text-xs text-gray-400 max-w-xs text-center">
        AI is personalising this for you using real atomcamp course data
      </p>
    </div>
  );
}

// ── Step indicator ─────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { id: "onboarding", label: "Profile" },
    { id: "recommendation", label: "Your Path" },
    { id: "quiz", label: "Quiz" },
    { id: "analysis", label: "Results" },
  ];

  const activeIndex = steps.findIndex((s) => step.includes(s.id));
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                i < currentIndex
                  ? "text-white"
                  : i === currentIndex
                  ? "text-white shadow-md"
                  : "bg-gray-100 text-gray-400"
              }`}
              style={
                i <= currentIndex
                  ? { backgroundColor: "#0d9488" }
                  : {}
              }
            >
              {i < currentIndex ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                i === currentIndex ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-12 h-0.5 mb-4 mx-1 transition-all"
              style={{
                backgroundColor: i < currentIndex ? "#0d9488" : "#E5E7EB",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function Home() {
  const [step, setStep] = useState<Step>("onboarding");
  const [error, setError] = useState<string | null>(null);

  // State for each stage
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [recommendationData, setRecommendationData] = useState<RecommendationData | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleOnboardingSubmit = async (data: OnboardingData) => {
    setOnboardingData(data);
    setError(null);
    setStep("loading_recommendation");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      setRecommendationData(json);
      setStep("recommendation");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStep("onboarding");
    }
  };

  const handleStartQuiz = async () => {
    if (!recommendationData) return;
    setError(null);
    setStep("loading_quiz");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleTopic: recommendationData.firstModuleTopic,
          courseName: recommendationData.recommendedCourse,
        }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      setQuizData(json);
      setStep("quiz");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStep("recommendation");
    }
  };

  const handleQuizSubmit = async (answers: Record<number, string>) => {
    if (!quizData || !onboardingData || !recommendationData) return;
    setError(null);
    setStep("loading_analysis");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: quizData.questions,
          userAnswers: answers,
          moduleTopic: quizData.moduleTopic,
          courseName: quizData.courseName,
          learnerName: onboardingData.name,
        }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      setAnalysisData(json);
      setStep("analysis");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStep("quiz");
    }
  };

  const handleStartOver = () => {
    setStep("onboarding");
    setOnboardingData(null);
    setRecommendationData(null);
    setQuizData(null);
    setAnalysisData(null);
    setError(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const isLoading = step.startsWith("loading_");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator — hide on loading screens */}
        {!isLoading && (
          <StepIndicator step={step} />
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
            <span className="text-red-500 flex-shrink-0">⚠️</span>
            <div>
              <strong>Something went wrong:</strong> {error}
              <br />
              <span className="text-xs text-red-500">
                Make sure your ANTHROPIC_API_KEY is set in .env.local
              </span>
            </div>
          </div>
        )}

        {/* ── Step: Onboarding ── */}
        {step === "onboarding" && (
          <OnboardingForm
            onSubmit={handleOnboardingSubmit}
            isLoading={false}
          />
        )}

        {/* ── Step: Loading recommendation ── */}
        {step === "loading_recommendation" && (
          <LoadingScreen message="AI is analysing your profile and building your personalised learning path..." />
        )}

        {/* ── Step: Recommendation ── */}
        {step === "recommendation" && recommendationData && onboardingData && (
          <RecommendationView
            data={recommendationData}
            learnerName={onboardingData.name}
            onStartQuiz={handleStartQuiz}
            isLoading={false}
          />
        )}

        {/* ── Step: Loading quiz ── */}
        {step === "loading_quiz" && (
          <LoadingScreen message="AI is generating your diagnostic quiz..." />
        )}

        {/* ── Step: Quiz ── */}
        {step === "quiz" && quizData && onboardingData && (
          <QuizView
            data={quizData}
            learnerName={onboardingData.name}
            onSubmit={handleQuizSubmit}
            isLoading={false}
          />
        )}

        {/* ── Step: Loading analysis ── */}
        {step === "loading_analysis" && (
          <LoadingScreen message="AI is analysing your answers and identifying learning gaps..." />
        )}

        {/* ── Step: Analysis ── */}
        {step === "analysis" &&
          analysisData &&
          onboardingData &&
          quizData &&
          recommendationData && (
            <GapAnalysisView
              data={analysisData}
              learnerName={onboardingData.name}
              moduleTopic={quizData.moduleTopic}
              courseName={recommendationData.recommendedCourse}
              onStartOver={handleStartOver}
            />
          )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 bg-white py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>
            <span className="font-bold" style={{ color: "#0d9488" }}>
              atomcamp
            </span>{" "}
            Smart LMS · Built for atomcamp Hackathon 2025
          </span>
          <span>
            Co-founder: Dr. Naveed Iftikhar ·{" "}
            <a
              href="mailto:admissions@atomcamp.com"
              className="underline hover:text-gray-600"
            >
              admissions@atomcamp.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
