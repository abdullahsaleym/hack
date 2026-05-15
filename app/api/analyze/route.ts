import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { questions, userAnswers, moduleTopic, courseName, learnerName } =
      await req.json();

    // Build a summary of what the learner got right/wrong
    const questionSummary = questions
      .map(
        (q: {
          id: number;
          question: string;
          correctAnswer: string;
          explanation: string;
          options: Record<string, string>;
        }) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          return {
            questionId: q.id,
            question: q.question,
            userAnswer: userAnswer || "Not answered",
            userAnswerText: q.options[userAnswer] || "Not answered",
            correctAnswer: q.correctAnswer,
            correctAnswerText: q.options[q.correctAnswer],
            isCorrect,
            explanation: q.explanation,
          };
        }
      )
      .filter((q: { isCorrect: boolean }) => !q.isCorrect);

    const correctCount = questions.length - questionSummary.length;
    const totalCount = questions.length;

    const prompt = `You are a compassionate and expert learning coach at atomcamp — a Pakistani AI education platform with 10,000+ learners trained and 80% job placement rate.

Learner: ${learnerName}
Course: ${courseName}
Module being assessed: ${moduleTopic}
Score: ${correctCount} out of ${totalCount} correct

${
  questionSummary.length === 0
    ? `The learner got ALL ${totalCount} questions correct! They have strong foundational knowledge.`
    : `Questions the learner got WRONG:
${questionSummary
  .map(
    (q: {
      questionId: number;
      question: string;
      userAnswerText: string;
      correctAnswerText: string;
      explanation: string;
    }) => `
Question ${q.questionId}: ${q.question}
- Learner answered: ${q.userAnswerText}
- Correct answer: ${q.correctAnswerText}
- Why it's correct: ${q.explanation}
`
  )
  .join("\n")}`
}

atomcamp course modules for context (${courseName}):
- AI Bootcamp modules: Python for AI, No-Code AI Agents, Exploratory Data Analysis, Mathematics for AI, Machine Learning, Deep Learning & Neural Networks, Computer Vision, NLP & Text Processing, Large Language Models & Generative AI, AI Agents (LangChain/LangGraph/CrewAI), MLOps & Deployment, Capstone Project
- Data Analytics modules: Excel & Business Intelligence, Power BI & DAX, SQL with MySQL, Python for Data Analysis, Machine Learning basics, AI Automation, Freelancing & Career Track
- Agentic AI modules: Python for AI Development, LLMs & Prompt Engineering, Building AI Applications, RAG & Vector Databases, LangChain for AI Workflows, LangGraph for Agentic Systems, Multi-Agent Systems, MCP & External Integrations, Running Local Models, Deployment & Showcase

Generate a detailed, personalised gap analysis for this learner. Be warm, encouraging, and specific.

Respond ONLY with valid JSON in this exact structure (no markdown, no explanation):
{
  "score": ${correctCount},
  "total": ${totalCount},
  "performanceLevel": "Excellent / Good / Needs Work / Beginner",
  "overallFeedback": "2-3 sentences summarising their performance warmly, addressing them by name",
  "gapAnalysis": [
    {
      "questionId": 1,
      "missingConcept": "the specific concept or skill they are missing",
      "whyStruggling": "plain English explanation of why this concept is confusing for beginners — be empathetic",
      "nextStep": "exact actionable next step within the atomcamp ${courseName} curriculum — reference specific module names",
      "resource": "specific topic within the module they should focus on first"
    }
  ],
  "strengthAreas": ["list of concepts they demonstrated understanding of"],
  "studyPlan": "a concrete 3-step study plan for the next 7 days before the course starts, referencing atomcamp's real schedule (Mon/Tue/Thu 7-9 PM on Google Meet)",
  "encouragement": "a powerful, personalised motivational message addressing ${learnerName} by name, referencing atomcamp's 80% job placement rate and Pakistani tech ecosystem"
}

Note: If the learner got everything correct, return an empty array for gapAnalysis and reflect their strong performance.`;

    const chatCompletion = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    });

    let jsonText = chatCompletion.choices[0]?.message?.content?.trim() || "";
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
    }

    const data = JSON.parse(jsonText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Failed to generate gap analysis" },
      { status: 500 }
    );
  }
}
