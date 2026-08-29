import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// Server-only: ANTHROPIC_API_KEY is read from the environment and never sent
// to the client. Requires ANTHROPIC_API_KEY in .env.local (see .env.example).
const client = new Anthropic();

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 400;

const LOCALE_NAMES = { es: "Spanish", en: "English" };

const SYSTEM_PROMPT = `You are a strength coach reviewing a single workout session for Kuiper, a training app.
You will be given the real, logged data for one session — the workout name, duration, sets, volume, energy level, per-exercise weight/reps, and any comments the user wrote.
Write a short coaching takeaway (2-4 sentences) based only on the data provided. Never invent numbers, trends, or history you were not given. If the data doesn't support a strong observation, say something honest and modest instead of fabricating insight.
Do not use markdown formatting. Do not repeat the raw numbers back verbatim — interpret them.`;

function buildUserPrompt({ locale, workout, exercises, energy, comments }) {
  const localeName = LOCALE_NAMES[locale] ?? LOCALE_NAMES.es;
  const exerciseLines = exercises
    .map((exercise) => `- ${exercise.name}: ${exercise.sets} sets x ${exercise.repsCompleted} reps @ ${exercise.weight} kg`)
    .join("\n");

  return `Respond only in ${localeName}.

Session: ${workout.title}
Total time: ${workout.totalTime}
Sets completed: ${workout.totalSets}
Total volume: ${workout.totalVolume} kg
Energy level reported: ${energy}
User comments: ${comments || "(none)"}

Exercises:
${exerciseLines}`;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { locale, workout, exercises, energy, comments } = body ?? {};

  if (!workout || !Array.isArray(exercises) || exercises.length === 0) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: buildUserPrompt({ locale, workout, exercises, energy, comments }) },
      ],
    });

    const insight = message.content.find((block) => block.type === "text")?.text ?? "";

    return NextResponse.json({ insight });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic authentication error — check ANTHROPIC_API_KEY", error);
      return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error", error);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    console.error("Unexpected error generating insight", error);
    return NextResponse.json({ error: "unknown_error" }, { status: 500 });
  }
}
