"use client";

import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
}

interface QuizData {
  moduleTopic: string;
  courseName: string;
  questions: Question[];
}

interface QuizViewProps {
  data: QuizData;
  learnerName: string;
  onSubmit: (answers: Record<number, string>) => void;
  isLoading: boolean;
}

export default function QuizView({
  data,
  learnerName,
  onSubmit,
  isLoading,
}: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const allAnswered = data.questions.every((q) => answers[q.id] !== undefined);
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (questionId: number, option: string) => {
    if (isLoading) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    if (allAnswered) {
      onSubmit(answers);
    }
  };

  const optionLabels = ["A", "B", "C", "D"] as const;

  return (
    <div className="fade-in w-full max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ backgroundColor: "#f0fdfa", color: "#0d9488" }}
        >
          <span>🧠</span> Diagnostic Quiz
        </div>
        <h2 className="text-2xl font-black text-white">
          {data.moduleTopic}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#5a9ab0" }}>
          Hey {learnerName}, answer all 4 questions — there&apos;s no pressure,
          this helps Claude understand where to focus your learning.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500">
            Progress
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "#0d9488" }}
          >
            {answeredCount} / {data.questions.length} answered
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#0d9488",
              width: `${(answeredCount / data.questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Questions */}
      {data.questions.map((question, qIndex) => (
        <div
          key={question.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
        >
          {/* Question header */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{
                backgroundColor: answers[question.id]
                  ? "#0d9488"
                  : "#E5E7EB",
                color: answers[question.id] ? "white" : "#9CA3AF",
              }}
            >
              {answers[question.id] ? "✓" : qIndex + 1}
            </div>
            <p className="text-sm font-semibold text-gray-800 leading-relaxed pt-0.5">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 ml-10">
            {optionLabels.map((label) => {
              const isSelected = answers[question.id] === label;
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(question.id, label)}
                  disabled={isLoading}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
                    isSelected
                      ? "border-transparent text-white shadow-sm"
                      : "border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50"
                  } disabled:cursor-not-allowed`}
                  style={
                    isSelected
                      ? { backgroundColor: "#0d9488", borderColor: "#0d9488" }
                      : {}
                  }
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      isSelected
                        ? "border-white text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                  <span>{question.options[label]}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit button */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        {!allAnswered && (
          <p className="text-center text-xs text-gray-400 mb-3">
            Answer all {data.questions.length} questions to submit
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || isLoading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: "#0d9488" }}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner"></span>
              AI is analysing your answers...
            </>
          ) : (
            <>
              <span>📊</span>
              Submit Quiz & Get Gap Analysis
            </>
          )}
        </button>
        <p className="text-center text-xs mt-3" style={{ color: "#5a9ab0" }}>
          Our AI will identify exactly what you need to work on before your
          first atomcamp class
        </p>
      </div>
    </div>
  );
}
