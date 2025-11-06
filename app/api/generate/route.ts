import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const endpoint =
  "https://ace-flowgen-foundry.openai.azure.com/openai/deployments/gpt-5/chat/completions?api-version=2025-01-01-preview";

const apiKey = process.env.AZURE_OPENAI_API_KEY!;

// 🧩 Dynamically load all step templates
function loadSteps() {
  const stepsDir = path.join(process.cwd(), "data", "steps");
  const files = fs.readdirSync(stepsDir);
  const steps = files.map((file) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(stepsDir, file), "utf-8")
    );
    return {
      name: data.name,
      description: data.description,
      sample: data.sample,
      instructions: data.instructions
    };
  });
  return steps;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const steps = loadSteps();

    // 🧠 Build a smart system prompt with all available step definitions
    const systemPrompt = `
You are an ACE Flow YAML generator.
You generate YAML configurations by combining modular steps.

### Available Step Types
${steps
  .map(
    (s) =>
      `#### ${s.name}\n${s.description}\nInstructions:\n- ${s.instructions.join(
        "\n- "
      )}\n\nSample:\n${JSON.stringify(s.sample, null, 2)}`
  )
  .join("\n\n")}

### Composition Rules
- If the user says "one-step flow", use a single step.
- If the user says "two-step flow", combine two relevant steps (e.g., rest-new + jwt).
- Ask for missing details like endpoint URLs or secrets if not provided.
- Use snake_case for flow names.
- Output must be YAML only, wrapped in triple backticks (\`\`\`yaml ... \`\`\`).
- No extra text or explanation outside YAML.
`;

    const body = {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 1,
      max_completion_tokens: 1500,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Azure OpenAI error:", errText);
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const result = await response.json();
    const output = result.choices?.[0]?.message?.content ?? "";
    const yaml = extractYamlBlock(output);

    return NextResponse.json({ yaml });
  } catch (error: any) {
    console.error("Error generating flow:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate YAML" },
      { status: 500 }
    );
  }
}

// 🧹 Helper: Extracts YAML block
function extractYamlBlock(text: string) {
  const regex = /```(?:yaml)?\s*([\s\S]*?)```/i;
  const match = text.match(regex);
  return match ? match[1].trim() : text.trim();
}
