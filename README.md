# atomcamp Smart LMS (Hackathon demo)

Next.js app that demonstrates an **AI-guided learner journey** for [atomcamp](https://atomcamp.com): profile capture → personalised course recommendation → diagnostic quiz → gap analysis and study plan. A separate **instructor view** shows cohort-style metrics using **static mock data** (not wired to real learners or the APIs).

The **canonical application** lives at the **repository root** (`app/`, `lib/`, `package.json`).

A nested duplicate **`my-hackathon-app/`** (a second full copy of the app) was **removed from version control**. If you still see `my-hackathon-app/node_modules` on disk, Windows may have kept a few locked native binaries (Tailwind / Lightning CSS `.node` files). Close terminals and the IDE using this repo, then delete that folder manually, or reboot and delete it. It is listed in `.gitignore` so it is not committed again.

## Prerequisites

- Node.js 20+ (recommended)
- An [Anthropic](https://www.anthropic.com/) API key

## Setup

```bash
npm install
```

Create `.env.local` in the project root:

```bash
ANTHROPIC_API_KEY=your_key_here
```

## Scripts

| Command       | Description        |
| ------------- | ------------------ |
| `npm run dev` | Local dev server   |
| `npm run build` | Production build |
| `npm start`   | Run production build |
| `npm run lint` | ESLint           |

Dev server: [http://localhost:3000](http://localhost:3000)

## Routes

| Path | Description |
| ---- | ----------- |
| `/` | **Student portal**: onboarding form → recommendation → quiz → gap analysis (client state machine; calls APIs below). |
| `/instructor` | **Instructor dashboard**: KPI cards, learner cards, suggested actions — all from `lib/mockData.ts`. |

## API routes (server)

All use the Anthropic SDK and model **`claude-sonnet-4-5`**. They expect JSON bodies and return JSON (or `{ "error": "..." }` with 500 on failure).

| Method & path | Body (summary) | Purpose |
| --------------- | ---------------- | -------- |
| `POST /api/recommend` | `name`, `background`, `goal`, `experience`, `age` | Chooses an atomcamp course from prompt-embedded catalog copy and returns learning path + first module topic. |
| `POST /api/quiz` | `moduleTopic`, `courseName` | Generates 4 multiple-choice questions for that module. |
| `POST /api/analyze` | `questions`, `userAnswers`, `moduleTopic`, `courseName`, `learnerName` | Scores answers and returns gap analysis, strengths, study plan text. |

Course names, dates, and modules in prompts are **maintained in code**; update `app/api/recommend/route.ts` and `app/api/analyze/route.ts` when the real catalog changes.

## Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4
- `@anthropic-ai/sdk`

## Deploy

Configured for [Vercel](https://vercel.com/) (`vercel.json` sets `framework: nextjs`). Set `ANTHROPIC_API_KEY` in the project’s environment variables. For a public deployment, consider rate limiting and auth on `/api/*` (not implemented in this demo).

## License / context

Built as a hackathon-style demo; instructor metrics are illustrative only.
