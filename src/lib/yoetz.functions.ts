import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway";

const AnswersSchema = z.object({
  age: z.string(),
  income: z.string(),
  expenses: z.string(),
  mortgage: z.string(),
  insurance: z.string(),
  savings: z.string(),
  goal: z.string(),
});

const RecSchema = z.object({
  type: z.enum(["mortgage_refi", "insurance", "savings", "investing"]),
  title: z.string(),
  description: z.string(),
  urgency: z.enum(["high", "medium", "low"]),
  estimated_annual_saving: z.number(),
  expert_type: z.string(),
});

const ResultSchema = z.object({
  score: z.number().min(0).max(100),
  insight: z.string(),
  recommendations: z.array(RecSchema).min(1).max(4),
});

export const analyzeProfile = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnswersSchema.parse((input as any)?.answers ? (input as any).answers : input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-2.5-flash");

    const system = `אתה יועץ פיננסי ישראלי מנוסה. קבל פרופיל פיננסי של לקוח וספק ניתוח קצר וממוקד בעברית.
הציון יחושב לפי: ריבית גבוהה במשכנתא = -15, חוסר ביטוח = -15, ביטוח ישן = -8, ללא חיסכון = -10, הכנסה גבוהה = +5, חיסכון פעיל = +10. בסיס: 75. טווח: 20-98.
תן 2-4 המלצות פעולה קונקרטיות. כל המלצה כוללת חיסכון שנתי משוער בש"ח (0 אם לא רלוונטי) וסוג מומחה מתאים.

החזר JSON בלבד, ללא טקסט נוסף וללא markdown. מבנה:
{"score": number 20-98, "insight": "משפט קצר בעברית", "recommendations": [{"type": "mortgage_refi"|"insurance"|"savings"|"investing", "title": "...", "description": "...", "urgency": "high"|"medium"|"low", "estimated_annual_saving": number, "expert_type": "..."}]}`;

    const prompt = `פרופיל הלקוח: גיל=${data.age}, הכנסה=${data.income}, הוצאות=${data.expenses}, משכנתא=${data.mortgage}, ביטוח=${data.insurance}, חיסכון=${data.savings}, מטרה=${data.goal}`;

    try {
      const { text } = await generateText({
        model,
        system,
        prompt,
        temperature: 0,
      });
      const parsed = extractJson(text);
      return ResultSchema.parse(parsed);
    } catch (err: any) {
      const msg = String(err?.message || err);
      console.error("[analyzeProfile]", err);
      if (msg.includes("429")) throw new Error("עומס גבוה — נסה שוב בעוד רגע");
      if (msg.includes("402")) throw new Error("נגמר הקרדיט של ה-AI — יש להוסיף קרדיט בהגדרות");
      throw new Error(`שגיאה בניתוח: ${msg.slice(0, 200)}`);
    }
  });

function extractJson(response: string): unknown {
  let cleaned = response.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.search(/[\{\[]/);
  const isArr = start !== -1 && cleaned[start] === "[";
  const end = cleaned.lastIndexOf(isArr ? "]" : "}");
  if (start === -1 || end === -1) throw new Error("No JSON found in response");
  cleaned = cleaned.substring(start, end + 1);
  try {
    return JSON.parse(cleaned);
  } catch {
    cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
    return JSON.parse(cleaned);
  }
}