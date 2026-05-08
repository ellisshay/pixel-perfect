import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { analyzeProfile } from "@/lib/yoetz.functions";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, Home, Shield, PiggyBank, TrendingUp, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/yoetz")({
  head: () => ({
    meta: [
      { title: "היועץ הפיננסי שלך | המפה הפיננסית" },
      { name: "description", content: "אבחון פיננסי חכם מבוסס AI ב-7 שאלות. קבלו ציון בריאות פיננסית, תובנה אישית והמלצות פעולה — תוך פחות מדקה." },
      { property: "og:title", content: "היועץ הפיננסי שלך — אבחון AI ב-7 שאלות" },
      { property: "og:description", content: "ציון פיננסי, תובנת AI אישית והמלצות פעולה מותאמות לכם." },
    ],
  }),
  component: YoetzPage,
});

const NAVY = "#0D2137";
const GREEN = "#1D9E75";
const LIGHT_GREEN = "#E1F5EE";
const BLUE = "#185FA5";

type Answers = { age: string; income: string; expenses: string; mortgage: string; insurance: string; savings: string; goal: string };
type Rec = { type: "mortgage_refi" | "insurance" | "savings" | "investing"; title: string; description: string; urgency: "high" | "medium" | "low"; estimated_annual_saving: number; expert_type: string };
type Result = { score: number; insight: string; recommendations: Rec[] };

const QUESTIONS: { key: keyof Answers; q: string; opts: { v: string; l: string }[] }[] = [
  { key: "age", q: "מה גילך?", opts: [
    { v: "under30", l: "מתחת ל-30" }, { v: "30to45", l: "30–45" }, { v: "45to60", l: "45–60" }, { v: "over60", l: "מעל 60" },
  ]},
  { key: "income", q: "מה ההכנסה החודשית נטו של משק הבית שלך?", opts: [
    { v: "low", l: "עד 8,000 ₪" }, { v: "mid", l: "8,000–15,000 ₪" }, { v: "high", l: "15,000–30,000 ₪" }, { v: "vhigh", l: "מעל 30,000 ₪" },
  ]},
  { key: "expenses", q: "כמה אחוז מהכנסתך הולך להוצאות קבועות?", opts: [
    { v: "low", l: "פחות מ-50%" }, { v: "mid", l: "50%–70%" }, { v: "high", l: "70%–90%" }, { v: "vhigh", l: "מעל 90%" },
  ]},
  { key: "mortgage", q: "האם יש לך משכנתא פעילה?", opts: [
    { v: "yes_high", l: "כן — ריבית מעל 4.5%" }, { v: "yes_low", l: "כן — ריבית עד 4.5%" }, { v: "renting", l: "שוכר/ת" }, { v: "owned", l: "דירה בבעלות, ללא משכנתא" },
  ]},
  { key: "insurance", q: "מה מצב הביטוחים שלך?", opts: [
    { v: "old", l: "יש, לא בדקתי שנים" }, { v: "checked", l: "יש, עדכני ומותאם" }, { v: "none", l: "אין כיסוי משמעותי" }, { v: "unknown", l: "לא בטוח/ה" },
  ]},
  { key: "savings", q: "האם אתה חוסך באופן פעיל מדי חודש?", opts: [
    { v: "yes_high", l: "כן — מעל 1,000 ₪" }, { v: "yes_low", l: "כן — פחות מ-1,000 ₪" }, { v: "want", l: "רוצה להתחיל" }, { v: "no", l: "לא חוסך/ת" },
  ]},
  { key: "goal", q: "מה המטרה הפיננסית הכי חשובה לך?", opts: [
    { v: "save", l: "לבנות חיסכון" }, { v: "invest", l: "להשקיע ולהגדיל הון" }, { v: "reduce", l: "להפחית חובות / הוצאות" }, { v: "retire", l: "להתכונן לפרישה" },
  ]},
];

const ils = (n: number) => Math.round(n).toLocaleString("he-IL");

function YoetzPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const analyze = useServerFn(analyzeProfile);

  const total = QUESTIONS.length;
  const progress = result ? 100 : (step / total) * 100;

  async function handlePick(v: string) {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.key]: v };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setError(null);
      try {
        const r = await analyze({ data: next as Answers });
        setResult(r as Result);
      } catch (e: any) {
        setError(e?.message || "שגיאה בניתוח");
      } finally {
        setLoading(false);
      }
    }
  }

  function reset() {
    setStep(0); setAnswers({}); setResult(null); setError(null); setSubmitted(false);
  }

  return (
    <div dir="rtl" lang="he" className="min-h-screen" style={{ background: "#F5F8FB", fontFamily: "Heebo, system-ui, sans-serif" }}>
      <header className="border-b" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="font-black text-lg" style={{ color: NAVY }}>המפה הפיננסית</a>
          <span className="text-xs font-medium" style={{ color: GREEN }}>היועץ הפיננסי שלך · AI</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8 md:py-12">
        {!result && !loading && (
          <>
            {step === 0 && (
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: NAVY }}>
                  קבלו אבחון פיננסי חכם ב-7 שאלות
                </h1>
                <p className="mt-3 text-base md:text-lg" style={{ color: "#475569" }}>
                  ציון בריאות פיננסית, תובנת AI אישית והמלצות פעולה — תוך פחות מדקה.
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-medium mb-2" style={{ color: "#64748B" }}>
                <span>שאלה {step + 1} מתוך {total}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: GREEN }} />
              </div>
            </div>

            <Step
              q={QUESTIONS[step].q}
              opts={QUESTIONS[step].opts}
              selected={(answers as any)[QUESTIONS[step].key]}
              onPick={handlePick}
              onBack={step > 0 ? () => setStep(step - 1) : undefined}
            />

            {error && <p className="mt-6 text-center text-sm" style={{ color: "#DC2626" }}>{error}</p>}
          </>
        )}

        {loading && <ThinkingLoader />}

        {result && !submitted && (
          <ResultView result={result} onSubmitted={() => setSubmitted(true)} answers={answers as Answers} onReset={reset} />
        )}

        {submitted && <ThankYouView result={result!} />}
      </main>

      <footer className="mt-12 py-6 text-center text-xs" style={{ color: "#64748B" }}>
        🔒 SSL · חוק הגנת הפרטיות התשמ״א-1981 · מאגר מידע רשום ·{" "}
        <a href="/legal/privacy" className="underline">מדיניות פרטיות</a>
      </footer>
    </div>
  );
}

function Step({ q, opts, selected, onPick, onBack }: { q: string; opts: { v: string; l: string }[]; selected?: string; onPick: (v: string) => void; onBack?: () => void }) {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8" style={{ border: "1px solid #E2E8F0" }}>
      <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: NAVY }}>{q}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {opts.map((o) => {
          const isSelected = selected === o.v;
          return (
            <button
              key={o.v}
              onClick={() => onPick(o.v)}
              className="text-right p-4 rounded-lg font-medium transition-all hover:translate-y-[-1px]"
              style={{
                border: `2px solid ${isSelected ? GREEN : "#E2E8F0"}`,
                background: isSelected ? LIGHT_GREEN : "white",
                color: NAVY,
              }}
            >
              {o.l}
            </button>
          );
        })}
      </div>
      {onBack && (
        <button onClick={onBack} className="mt-6 text-sm font-medium inline-flex items-center gap-1" style={{ color: "#64748B" }}>
          <ArrowLeft size={14} /> חזרה
        </button>
      )}
    </div>
  );
}

function ThinkingLoader() {
  return (
    <div className="bg-white rounded-xl p-10 text-center" style={{ border: "1px solid #E2E8F0" }}>
      <Loader2 className="mx-auto animate-spin" size={36} style={{ color: GREEN }} />
      <h2 className="mt-4 text-xl font-bold" style={{ color: NAVY }}>ה-AI מנתח את הפרופיל שלך...</h2>
      <ul className="mt-6 space-y-3 max-w-sm mx-auto text-right">
        {["מעבד נתונים פיננסיים", "משווה לדפוסים בשוק הישראלי", "בונה המלצות פעולה אישיות"].map((t, i) => (
          <li key={t} className="flex items-center gap-3 text-sm font-medium animate-pulse" style={{ color: NAVY, animationDelay: `${i * 0.3}s` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function scoreLabel(s: number) {
  if (s >= 80) return "מצב פיננסי טוב";
  if (s >= 60) return "יש מקום לשיפור";
  if (s >= 40) return "נדרשת פעולה";
  return "מצב דורש טיפול";
}

function ScoreDial({ score }: { score: number }) {
  const r = 56; const c = 2 * Math.PI * r; const offset = c - (score / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
      <circle cx="70" cy="70" r={r} fill="none" stroke={GREEN} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      <text x="70" y="74" textAnchor="middle" fill="white" fontSize="34" fontWeight="900">{score}</text>
      <text x="70" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">/ 100</text>
    </svg>
  );
}

function recIcon(type: Rec["type"]) {
  switch (type) {
    case "mortgage_refi": return { Icon: Home, bg: LIGHT_GREEN, color: GREEN };
    case "insurance": return { Icon: Shield, bg: "#E0EBF7", color: BLUE };
    case "savings": return { Icon: PiggyBank, bg: "#FEF3C7", color: "#B45309" };
    case "investing": return { Icon: TrendingUp, bg: "#CCFBF1", color: "#0F766E" };
  }
}

const urgencyMap: Record<Rec["urgency"], { l: string; bg: string; c: string }> = {
  high: { l: "דחוף", bg: "#FEE2E2", c: "#B91C1C" },
  medium: { l: "בינוני", bg: "#FEF3C7", c: "#B45309" },
  low: { l: "מומלץ", bg: LIGHT_GREEN, c: GREEN },
};

const domainMap: Record<Rec["type"], string> = {
  mortgage_refi: "mortgage", insurance: "insurance", savings: "savings", investing: "investing",
};

function ResultView({ result, onSubmitted, answers, onReset }: { result: Result; onSubmitted: () => void; answers: Answers; onReset: () => void }) {
  const top = result.recommendations[0];
  const totalSaving = result.recommendations.reduce((s, r) => s + (r.estimated_annual_saving || 0), 0);

  return (
    <div className="space-y-5">
      <div className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6" style={{ background: NAVY, color: "white" }}>
        <ScoreDial score={result.score} />
        <div className="text-center md:text-right flex-1">
          <div className="text-xs font-medium opacity-70 mb-1">הציון הפיננסי שלך</div>
          <h2 className="text-2xl md:text-3xl font-black">{scoreLabel(result.score)}</h2>
          {totalSaving > 0 && (
            <p className="mt-2 text-sm md:text-base opacity-90">
              פוטנציאל חיסכון משוער: <strong style={{ color: GREEN }}>₪{ils(totalSaving)}</strong> בשנה
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl p-5 md:p-6 flex gap-4" style={{ background: "#E0EBF7" }}>
        <Lightbulb size={28} style={{ color: BLUE, flexShrink: 0 }} />
        <div>
          <h3 className="font-bold mb-1" style={{ color: NAVY }}>תובנת AI מותאמת אישית</h3>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#1E293B" }}>{result.insight}</p>
        </div>
      </div>

      <div className="space-y-3">
        {result.recommendations.map((r, i) => {
          const { Icon, bg, color } = recIcon(r.type);
          const u = urgencyMap[r.urgency];
          return (
            <div key={i} className="rounded-xl p-5 bg-white" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-bold" style={{ color: NAVY }}>{r.title}</h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: u.bg, color: u.c }}>{u.l}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#475569" }}>{r.description}</p>
                  <div className="flex items-center gap-3 text-xs flex-wrap">
                    {r.estimated_annual_saving > 0 && (
                      <span className="font-bold" style={{ color: GREEN }}>חיסכון משוער: ₪{ils(r.estimated_annual_saving)} לשנה</span>
                    )}
                    <span style={{ color: "#64748B" }}>· {r.expert_type}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LeadForm topRec={top} answers={answers} result={result} onSubmitted={onSubmitted} />

      <button onClick={onReset} className="w-full text-center text-sm font-medium py-2" style={{ color: "#64748B" }}>
        התחל אבחון מחדש
      </button>
    </div>
  );
}

const phoneRe = /^0(5\d|[2-489])-?\d{7}$/;
const leadSchema = z.object({
  name: z.string().trim().min(2, "שם מלא הוא שדה חובה").max(80),
  phone: z.string().trim().regex(phoneRe, "מספר טלפון ישראלי לא תקין"),
  email: z.string().trim().email("כתובת אימייל לא תקינה").max(120),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "יש לאשר את מדיניות הפרטיות" }) }),
  marketing_consent: z.boolean().optional().default(false),
});
type LeadInput = z.infer<typeof leadSchema>;

function LeadForm({ topRec, answers, result, onSubmitted }: { topRec: Rec; answers: Answers; result: Result; onSubmitted: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema) as any,
    defaultValues: { privacy_consent: false as any, marketing_consent: false },
  });

  async function onSubmit(values: LeadInput) {
    setSubmitting(true); setErr(null);
    const domain = domainMap[topRec.type];
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      phone: values.phone,
      email: values.email,
      domain,
      sub_domain: topRec.type,
      decision_stage: "ai_quiz",
      privacy_consent: true,
      marketing_consent: !!values.marketing_consent,
      source_page: "/yoetz",
      metadata: {
        source: "ai_quiz",
        financial_score: result.score,
        quiz_answers: answers,
        ai_recommendations: result.recommendations,
        expert_type: topRec.expert_type,
      },
    });
    setSubmitting(false);
    if (error) { setErr("שגיאה בשליחה. נסה שוב."); return; }
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl p-5 md:p-6 bg-white space-y-4" style={{ border: `2px solid ${GREEN}` }}>
      <div>
        <h3 className="text-lg font-black" style={{ color: NAVY }}>חבר אותי ל{topRec.expert_type}</h3>
        <p className="text-sm mt-1" style={{ color: "#475569" }}>נחזור אליך תוך 24 שעות עם תוכנית פעולה אישית.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Input label="שם מלא" {...register("name")} error={errors.name?.message} />
        <Input label="טלפון" type="tel" placeholder="05X-XXXXXXX" {...register("phone")} error={errors.phone?.message} />
        <Input label="אימייל" type="email" {...register("email")} error={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Check label='קראתי ומסכים/ה למדיניות הפרטיות ולתנאי השימוש. המידע יועבר לאיש המקצוע הרלוונטי בלבד.' required {...register("privacy_consent")} error={errors.privacy_consent?.message} />
        <Check label="אני מסכים/ה לקבל עדכונים ותכנים שיווקיים." {...register("marketing_consent")} />
      </div>

      {err && <p className="text-sm" style={{ color: "#DC2626" }}>{err}</p>}

      <button type="submit" disabled={submitting}
        className="w-full py-3 rounded-lg font-bold text-white transition-opacity disabled:opacity-60"
        style={{ background: GREEN }}>
        {submitting ? "שולח..." : "חבר אותי לאיש המקצוע המתאים"}
      </button>

      <p className="text-[11px] text-center" style={{ color: "#64748B" }}>
        🔒 SSL · חוק הגנת הפרטיות תשמ״א-1981 · מאגר מידע רשום
      </p>
    </form>
  );
}

const Input = (() => {
  // eslint-disable-next-line react/display-name
  const C = (
    { label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => (
    <label className="block">
      <span className="text-xs font-semibold mb-1 block" style={{ color: NAVY }}>{label}</span>
      <input ref={ref} {...props} className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{ border: `1px solid ${error ? "#DC2626" : "#CBD5E1"}`, background: "white" }} />
      {error && <span className="text-[11px] mt-1 block" style={{ color: "#DC2626" }}>{error}</span>}
    </label>
  );
  return (require("react") as typeof import("react")).forwardRef(C);
})();

const Check = (() => {
  const C = (
    { label, error, required, ...props }: { label: string; error?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => (
    <label className="flex items-start gap-2 text-xs cursor-pointer" style={{ color: "#334155" }}>
      <input type="checkbox" ref={ref} {...props} className="mt-0.5 w-4 h-4 cursor-pointer" style={{ accentColor: GREEN }} />
      <span>
        {required && <span style={{ color: "#DC2626" }}>* </span>}
        {label}
        {error && <span className="block text-[11px] mt-0.5" style={{ color: "#DC2626" }}>{error}</span>}
      </span>
    </label>
  );
  return (require("react") as typeof import("react")).forwardRef(C);
})();

function ThankYouView({ result }: { result: Result }) {
  const top = result.recommendations[0];
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-8 text-center" style={{ border: "1px solid #E2E8F0" }}>
      <div className="inline-flex w-16 h-16 rounded-full items-center justify-center mb-4" style={{ background: LIGHT_GREEN }}>
        <CheckCircle2 size={32} style={{ color: GREEN }} />
      </div>
      <h2 className="text-2xl font-black" style={{ color: NAVY }}>תודה — קיבלנו את הפרטים</h2>
      <p className="mt-3 text-base" style={{ color: "#475569" }}>
        <strong>{top.expert_type}</strong> יחזור אליך תוך 24 שעות עם תוכנית פעולה אישית.
      </p>
      <div className="mt-6 rounded-lg p-4 text-right" style={{ background: LIGHT_GREEN }}>
        <div className="text-xs font-bold mb-1" style={{ color: GREEN }}>ההמלצה המרכזית</div>
        <h3 className="font-bold" style={{ color: NAVY }}>{top.title}</h3>
        <p className="text-sm mt-1" style={{ color: "#475569" }}>{top.description}</p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg font-bold text-white text-sm" style={{ background: "#25D366" }}>
          צור קשר ב-WhatsApp
        </a>
        <button onClick={() => navigate({ to: "/" })}
          className="px-5 py-2.5 rounded-lg font-bold text-sm" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
          חזרה לאתר
        </button>
      </div>
    </div>
  );
}