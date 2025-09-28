const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function reviewCode(code, language) {
  const prompt = `
You are a code review assistant.
Analyze the following ${language} code and list issues and improvement suggestions.

Code:
${code}

Respond in JSON format with: issues, suggestions, improvedCode.
`;

  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { reviewCode };
