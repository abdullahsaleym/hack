import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { name, background, goal, experience, age } = await req.json();

    const prompt = `You are the AI advisor for atomcamp — a Pakistani AI education platform with 10,000+ learners trained, 80% job placement rate, and 45% women participation. Corporate clients include Careem, HBL, UBL, Engro, Jazz, Telenor, and UNDP. Classes run 7–9 PM Mon/Tue/Thu on Google Meet (designed for students and working professionals).

A new learner has submitted their profile:
- Name: ${name}
- Educational Background: ${background}
- Career Goal: ${goal}
- Experience Level: ${experience}
- Age Group: ${age}

atomcamp currently has these REAL courses open for enrollment:

1. AI Bootcamp (Cohort 18)
   - Start: 9th June | Duration: 3 months | PKR 75,000
   - Eligibility: STEM / CS / Engineering graduates
   - Modules (in order): Python for AI, No-Code AI Agents (n8n, Power Automate, Azure AI, Copilot Studio), Exploratory Data Analysis, Mathematics for AI (Linear Algebra, Stats, Probability), Machine Learning (supervised, unsupervised, sklearn), Deep Learning & Neural Networks, Computer Vision, NLP & Text Processing, Large Language Models & Generative AI, AI Agents (LangChain, LangGraph, CrewAI, MCP, A2A), MLOps & Deployment (Docker, FastAPI, Google Cloud), Capstone Project + Freelancing (Upwork)

2. Data Analytics Bootcamp
   - Start: 18th June | Duration: 3 months | PKR 50,000
   - Eligibility: Any degree, no prior experience needed
   - Modules (in order): Excel & Business Intelligence (Power Query, PivotTables, Copilot), Power BI & DAX (data modeling, dashboards), SQL with MySQL, Python for Data Analysis (pandas, matplotlib, seaborn), Machine Learning basics (sklearn), AI Automation (Make, Power Automate, Microsoft Copilot), Freelancing & Career Track (Upwork, QGIS, Julius AI)

3. Agentic AI Bootcamp
   - Start: 9th May | Duration: 2 months | PKR 50,000
   - Eligibility: CS/Engineering, must know Python basics and APIs
   - Modules (in order): Python for AI Development, LLMs & Prompt Engineering, Building AI Applications, RAG & Vector Databases, LangChain for AI Workflows, LangGraph for Agentic Systems, Multi-Agent Systems (CrewAI + A2A protocol), MCP & External Integrations, Running Local Models (Ollama, vLLM), Deployment & Showcase

4. Automation with AI Bootcamp
   - Start: 4th May | Duration: 6 weeks | PKR 30,000
   - Target: Working professionals wanting to automate workflows
   - Tools: n8n, Make, Power Automate, AI APIs

5. AI for Teens
   - Start: 26th June | Duration: 2 months | PKR 30,000
   - Target: Ages 13–18

Based on this learner's profile, recommend the BEST course for them and generate their personalised learning path.

Respond ONLY with valid JSON in this exact structure (no markdown, no explanation):
{
  "recommendedCourse": "exact course name from the list above",
  "coursePrice": "PKR XX,000",
  "courseDuration": "X months / X weeks",
  "courseStart": "date string",
  "recommendationReason": "2-3 sentences explaining why this course is perfect for this specific learner based on their background and goals",
  "learningPath": [
    {
      "moduleNumber": 1,
      "moduleName": "exact module name from the course",
      "description": "one sentence on what they will learn and why it matters for their goal",
      "isFirst": true
    }
  ],
  "firstModuleTopic": "the exact name of the first module",
  "encouragement": "a warm, personalised 1-sentence motivational message addressing them by name"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Strip markdown code fences if present
    let jsonText = content.text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
    }

    const data = JSON.parse(jsonText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
