import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { moduleTopic, courseName } = await req.json();

    const prompt = `You are an expert educator for atomcamp — a Pakistani AI education platform. You are creating a diagnostic quiz for a learner who is about to start the "${courseName}" course.

The learner's first module is: "${moduleTopic}"

Create exactly 4 multiple-choice questions to assess their current knowledge of this topic. The questions should:
- Range from basic to intermediate difficulty
- Be practical and relevant to real-world AI/tech work in Pakistan
- Test genuine understanding, not just memorization
- Have exactly 4 answer options each (A, B, C, D)
- Have one clearly correct answer

Respond ONLY with valid JSON in this exact structure (no markdown, no explanation):
{
  "moduleTopic": "${moduleTopic}",
  "courseName": "${courseName}",
  "questions": [
    {
      "id": 1,
      "question": "question text here",
      "options": {
        "A": "option A text",
        "B": "option B text",
        "C": "option C text",
        "D": "option D text"
      },
      "correctAnswer": "A",
      "explanation": "brief explanation of why this is correct"
    },
    {
      "id": 2,
      "question": "question text here",
      "options": {
        "A": "option A text",
        "B": "option B text",
        "C": "option C text",
        "D": "option D text"
      },
      "correctAnswer": "B",
      "explanation": "brief explanation of why this is correct"
    },
    {
      "id": 3,
      "question": "question text here",
      "options": {
        "A": "option A text",
        "B": "option B text",
        "C": "option C text",
        "D": "option D text"
      },
      "correctAnswer": "C",
      "explanation": "brief explanation of why this is correct"
    },
    {
      "id": 4,
      "question": "question text here",
      "options": {
        "A": "option A text",
        "B": "option B text",
        "C": "option C text",
        "D": "option D text"
      },
      "correctAnswer": "D",
      "explanation": "brief explanation of why this is correct"
    }
  ]
}`;

    const chatCompletion = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    let jsonText = chatCompletion.choices[0]?.message?.content?.trim() || "";
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
    }

    const data = JSON.parse(jsonText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
