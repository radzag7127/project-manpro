import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Add debug logging
export async function POST(request: Request) {
  console.log("API route called");

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not defined");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = await request.json();
    console.log("Processing messages:", messages);

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 512,
      top_p: 1,
    });

    console.log("Got response from Groq");
    return NextResponse.json(chatCompletion);
  } catch (error: any) {
    console.error("Detailed API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
