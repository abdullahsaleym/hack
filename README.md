<div align="center">

# 🧠 Atomcamp Smart Adaptive LMS

### *AUREX'26 Hackathon Submission*

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Claude AI](https://img.shields.io/badge/Claude_3.5_Sonnet-Anthropic-D97706?style=for-the-badge)](https://www.anthropic.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Live Demo →** [hack-tau-lac.vercel.app](https://hack-tau-lac.vercel.app)

</div>

---

## 📌 Problem Statement

> atomcamp is an emerging tech education ecosystem offering a range of programs, bootcamps, and learning resources designed to upskill learners across Pakistan and beyond. As the learner base grows and course offerings diversify, atomcamp faces a familiar but critical challenge: **no two learners are alike — yet most learning systems treat them as if they are.**
>
> Today, learners navigate a static catalogue of content with little personalization, instructors have limited visibility into who is struggling and why, and the platform lacks a unified system that ties together goals, progress, feedback, and outcomes.
>
> Our solution is an **integrated Smart Adaptive LMS** that personalises the learning journey for each student while giving instructors actionable intelligence to improve outcomes at scale.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎯 **AI-Powered Onboarding** | Adaptive profile assessment to match learners with their ideal tech path |
| 🗺️ **Dynamic Course Architect** | Personalised module generation based on atomcamp's existing program offerings |
| ⚡ **Real-time Diagnostic Engine** | Smart quizzes that adapt to the student's mastery of specific tech concepts |
| 📊 **Pedagogical Gap Analysis** | Instant feedback reports identifying specific learning roadblocks and tailored study plans |
| 🖥️ **Instructor Intelligence Cockpit** | A high-level analytics dashboard for administrators to monitor at-risk cohorts |

---

## 🏗️ Architecture Overview

```
Student Flow
────────────
Onboarding Form → Claude AI → Personalised Course Recommendation
       ↓
Diagnostic Quiz → Claude AI → Gap Analysis Report + 7-Day Study Plan

Instructor Flow
───────────────
/instructor → Mock Learner Data → Progress Bars + Risk Badges + Action Items
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16+ (App Router) |
| **Styling** | Tailwind CSS v4 |
| **AI Engine** | Anthropic Claude 3.5 Sonnet API |
| **Deployment** | Vercel |
| **Language** | TypeScript |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API Key](https://console.anthropic.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abdullahsaleym/hack.git
cd hack

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your key to .env.local:
# ANTHROPIC_API_KEY=sk-ant-...

# 4. Launch the application
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Student Portal.
Open [http://localhost:3000/instructor](http://localhost:3000/instructor) to see the Instructor Dashboard.

---

## 📸 Application Screens

### 🎓 Student Portal
1. **Onboarding** — Fill in your background, goal, and experience level
2. **AI Recommendation** — Receive a personalised course and learning path
3. **Diagnostic Quiz** — Take a 4-question AI-generated knowledge check
4. **Gap Analysis** — Get a detailed report of gaps + a 7-day study plan

### 📊 Instructor Dashboard
- Real-time cohort overview with KPI cards (active learners, avg. progress, at-risk count)
- Colour-coded student cards with progress bars and status badges
- AI-generated intervention recommendations per student

---

## 👥 Team

| Name | Role |
|---|---|
| **Abdullah Saleem** | Full-Stack Development & AI Integration |
| **Manzer Bibi** | Research, UX & Presentation |

---

## 🏆 Hackathon

**Event:** AUREX'26 Hackathon
**Organiser:** atomcamp
**Track:** EdTech / AI-Powered Learning

---

<div align="center">

Built with ❤️ for atomcamp · AUREX'26

*"Personalised learning for every Pakistani learner."*

</div>
