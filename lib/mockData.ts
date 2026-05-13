// ── Mock Student Data ──────────────────────────────────────────────────────
// "Smoke and mirrors" demo data — no database required.

export type Status = "At Risk" | "Needs Attention" | "On Track" | "Excelling";

export interface Student {
  id: number;
  name: string;
  bootcamp: string;
  goal: string;
  status: Status;
  progress: number; // 0–100
  nextTopic: string;
  lastActive: string;
  quizScore: string;
}

export const mockStudents: Student[] = [
  {
    id: 1,
    name: "Abdullah S.",
    bootcamp: "Agentic AI Bootcamp",
    goal: "Build AI-powered SaaS",
    status: "At Risk",
    progress: 42,
    nextTopic: "Advanced Prompt Engineering",
    lastActive: "Today",
    quizScore: "2 / 4",
  },
  {
    id: 2,
    name: "Sara Malik",
    bootcamp: "Agentic AI Bootcamp",
    goal: "Transition into tech",
    status: "Needs Attention",
    progress: 58,
    nextTopic: "REST API Integration",
    lastActive: "Yesterday",
    quizScore: "2 / 4",
  },
  {
    id: 3,
    name: "Ahmed Raza",
    bootcamp: "Data Analytics Bootcamp",
    goal: "Freelance on Upwork",
    status: "On Track",
    progress: 76,
    nextTopic: "DAX Calculated Columns",
    lastActive: "Today",
    quizScore: "3 / 4",
  },
  {
    id: 4,
    name: "Fatima Khan",
    bootcamp: "AI Bootcamp (Cohort 18)",
    goal: "Land a Data Science job",
    status: "Excelling",
    progress: 100,
    nextTopic: "Capstone Project Review",
    lastActive: "Today",
    quizScore: "4 / 4",
  },
];

export const kpis = {
  totalLearners: mockStudents.length,
  avgProgress: Math.round(
    mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length
  ),
  atRiskCount: mockStudents.filter((s) => s.status === "At Risk").length,
  excellingCount: mockStudents.filter((s) => s.status === "Excelling").length,
};
