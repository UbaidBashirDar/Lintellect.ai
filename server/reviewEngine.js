// Lintellect.ai reviewEngine: builds review prompt, calls AI API, and returns structured report
import OpenAI from 'openai';
import dotenv from 'dotenv';


dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function runReview({ code, language }) {
const system = `You are Lintellect.ai, an expert software engineer and reviewer. Produce JSON with summary, issues [{title,detail,severity,line?}], suggestions, and optional patch.`;
const user = `Language: ${language}\n---\nCode:\n${code}\n`;


const resp = await client.chat.completions.create({
model: process.env.AI_MODEL || 'gpt-4o-mini',
messages: [
{ role:'system', content: system },
{ role:'user', content: user }
],
temperature: 0.2,
max_tokens: 1000
});


const content = resp.choices?.[0]?.message?.content || '';
try {
const jsonMatch = content.match(/\{[\s\S]*\}$/m);
const jsonText = jsonMatch ? jsonMatch[0] : content;
const parsed = JSON.parse(jsonText);
return {
summary: parsed.summary || 'No summary provided',
issues: parsed.issues || [],
suggestions: parsed.suggestions || [],
patch: parsed.patch
};
} catch (e) {
return {
summary: 'AI output could not be parsed.',
issues: [],
suggestions: [ 'Raw output: ' + content.slice(0,500) ]
};
}
}