import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "התחל כאן — אבחון פיננסי בשש שאלות | המפה הפיננסית" },
      { name: "description", content: "אבחון פיננסי קצר בשש שאלות. בסוף התהליך תקבלו כיוון ראשוני, מסלול מותאם וכלים להמשך — בלי הבטחות, רק סדר." },
      { property: "og:title", content: "התחל כאן — אבחון פיננסי בשש שאלות" },
      { property: "og:description", content: "כיוון ראשוני, מסלול מותאם וכלים — בלי הבטחות, רק סדר." },
    ],
  }),
  component: StartPage,
});

type Step = {
  key: string;
  question: string;
  options: { value: string; label: string }[];
};

const STEPS: Step[] = [
  {
    key: "goal",
    question: "מה המטרה שלך?",
    options: [
      { value: "save", label: "להתחיל לחסוך" },
      { value: "invest", label: "להתחיל להשקיע" },
      { value: "mortgage", label: "לעשות סדר במשכנתא" },
      { value: "real_estate", label: "לבדוק נדל״ן" },
      { value: "stocks", label: "להבין שוק ההון" },
      { value: "debt", label: "לצאת מחובות" },
      { value: "family", label: "לבנות תוכנית למשפחה" },
      { value: "pension", label: "לבדוק פנסיה / ביטוחים" },
      { value: "unknown", label: "אני לא יודע מאיפה להתחיל" },
    ],
  },
  {
    key: "monthly_saving",
    question: "כמה כסף פנוי יש לך בחודש?",
    options: [
      { value: "0_100", label: "עד 100 ₪" },
      { value: "100_200", label: "100–200 ₪" },
      { value: "200_500", label: "200–500 ₪" },
      { value: "500_1000", label: "500–1,000 ₪" },
      { value: "1000_plus", label: "מעל 1,000 ₪" },
    ],
  },
  {
    key: "emergency_fund",
    question: "האם יש לך קרן חירום?",
    options: [
      { value: "yes", label: "כן" },
      { value: "no", label: "לא" },
      { value: "unknown", label: "לא יודע" },
    ],
  },
  {
    key: "debts",
    question: "האם יש לך חובות או הלוואות?",
    options: [
      { value: "none", label: "אין" },
      { value: "small", label: "יש מעט" },
      { value: "significant", label: "יש משמעותיים" },
      { value: "unknown", label: "לא בטוח" },
    ],
  },
  {
    key: "interest",
    question: "מה מעניין אותך יותר?",
    options: [
      { value: "stocks", label: "שוק ההון" },
      { value: "real_estate", label: "נדל״ן" },
      { value: "business", label: "עסקים" },
      { value: "mortgage", label: "משכנתאות" },
      { value: "pension", label: "פנסיה וביטוחים" },
      { value: "unknown", label: "לא יודע" },
    ],
  },
  {
    key: "preference",
    question: "איך אתה מעדיף להתקדם?",
    options: [
      { value: "self_study", label: "ללמוד לבד" },
      { value: "calculator", label: "להשתמש במחשבון" },
      { value: "professional", label: "לקבל שיחה עם בעל מקצוע" },
      { value: "plan", label: "לקבל תוכנית התחלה" },
    ],
  },
];

type Answers = Record<string, string>;

type ResultPath = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  domain: string;
  calculator?: { to: string; label: string };
  guide?: { to: string; label: string };
};

const PATHS: Record<string, ResultPath> = {
  stability: {
    key: "stability",
    title: "יציבות פיננסית קודם",
    subtitle: "לפני שמשקיעים — עושים סדר",
    description:
      "המקום הנכון להתחיל הוא בבניית קרן חירום וצמצום חובות יקרים. ברגע שיש בסיס יציב, אפשר להתחיל להפנות כסף לחיסכון והשקעה.",
    domain: "planning",
    calculator: { to: "/calculators", label: "מחשבון מצב פיננסי" },
    guide: { to: "/tichnun-piansi", label: "מדריך תכנון פיננסי" },
  },
  small_save: {
    key: "small_save",
    title: "חיסכון חודשי קטן",
    subtitle: "מתחילים בקטן ובונים הרגל",
    description:
      "גם 100–500 ₪ בחודש זה מספיק כדי לבנות הרגל פיננסי נכון. המפתח הוא קביעות, לא סכום. עם הזמן ריבית דריבית עושה את העבודה.",
    domain: "planning",
    calculator: { to: "/calculators", label: "מחשבון ריבית דריבית" },
    guide: { to: "/tichnun-piansi", label: "איך מתחילים לחסוך נכון" },
  },
  stocks: {
    key: "stocks",
    title: "שוק ההון למתחילים",
    subtitle: "להבין את הבסיס לפני שמתחילים",
    description:
      "מומלץ ללמוד את ההבדל בין השקעה למסחר, להבין דמי ניהול, פיזור וריבית דריבית — לפני בחירת מסלול. כלי הסימולציה כאן יעזרו לראות תמונה ראשונית.",
    domain: "investments",
    calculator: { to: "/calculators", label: "מחשבון השקעה חודשית" },
    guide: { to: "/shuk-hahon", label: "שוק ההון למתחילים" },
  },
  mortgage: {
    key: "mortgage",
    title: "בדיקת משכנתא",
    subtitle: "ההחלטה הכי יקרה בחיים — שווה לבדוק",
    description:
      "כדאי לבדוק החזר חודשי, מסלולים, ריבית והאם יש דרך לשפר את המצב לפני חתימה או המשך תשלום. מחזור משכנתא יכול לחסוך עשרות אלפי שקלים.",
    domain: "mortgages",
    calculator: { to: "/calculators", label: "מחשבון משכנתא" },
    guide: { to: "/mashkantaot", label: "מדריך משכנתאות" },
  },
  real_estate: {
    key: "real_estate",
    title: "בדיקת נדל״ן",
    subtitle: "תזרים, סיכון, מימון ומיסוי",
    description:
      "לפני שקונים נכס, צריך להבין את ההבדל בין מגורים, מסחרי, קרקע, חו״ל ותיירותי. לכל מסלול יש תזרים, סיכון, מימון ומיסוי משלו.",
    domain: "real-estate",
    calculator: { to: "/calculators", label: "מחשבון נדל״ן" },
    guide: { to: "/nadlan", label: "מדריך נדל״ן" },
  },
  family: {
    key: "family",
    title: "תכנון פיננסי למשפחה",
    subtitle: "סדר, יעדים וגיבוי",
    description:
      "תכנון פיננסי משפחתי כולל הכנסות, הוצאות, חובות, חסכונות, קרן חירום ויעדים לטווח קצר וארוך. בלי סדר, גם השקעה טובה הופכת ללחץ.",
    domain: "planning",
    calculator: { to: "/calculators", label: "מחשבון משפחתי" },
    guide: { to: "/tichnun-piansi", label: "תכנון פיננסי למשפחה" },
  },
  pension: {
    key: "pension",
    title: "בדיקת פנסיה / ביטוחים",
    subtitle: "הכסף הכי גדול שלך — לרוב מוזנח",
    description:
      "דמי ניהול גבוהים, מסלול לא מתאים לגיל או כיסויים כפולים יכולים לעלות עשרות אלפי שקלים. בדיקה ראשונית כדאית כל כמה שנים.",
    domain: "retirement",
    calculator: { to: "/calculators", label: "מחשבון פנסיה" },
    guide: { to: "/tichnun-piansi", label: "פנסיה — מה לבדוק" },
  },
  professional: {
    key: "professional",
    title: "שיחה עם בעל מקצוע",
    subtitle: "מתאים מול מי שמבין בתחום",
    description:
      "כשהמצב מורכב או דחוף — הדרך המהירה היא לדבר עם בעל מקצוע מורשה. השאר פרטים ונחבר אותך לאיש המקצוע הרלוונטי לתחום שבחרת.",
    domain: "planning",
  },
};

function decideResult(a: Answers): ResultPath {
  // Priority logic
  if (a.preference === "professional") return PATHS.professional;
  if (a.debts === "significant") return PATHS.stability;
  if (a.emergency_fund !== "yes" && a.goal !== "mortgage") return PATHS.stability;
  if (a.goal === "mortgage" || a.interest === "mortgage") return PATHS.mortgage;
  if (a.goal === "real_estate" || a.interest === "real_estate") return PATHS.real_estate;
  if (a.goal === "pension" || a.interest === "pension") return PATHS.pension;
  if (a.goal === "family") return PATHS.family;
  if (a.goal === "invest" || a.goal === "stocks" || a.interest === "stocks") return PATHS.stocks;
  if (a.goal === "save" || a.monthly_saving === "0_100" || a.monthly_saving === "100_200") return PATHS.small_save;
  return PATHS.stability;
}

function StartPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => (showResult ? decideResult(answers) : null), [showResult, answers]);
  const total = STEPS.length;
  const progress = showResult ? 100 : Math.round((step / total) * 100);

  const handleAnswer = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {!showResult ? (
          <>
            <header className="mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">שלב {step + 1} מתוך {total}</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-6" aria-hidden>
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {STEPS[step].question}
              </h1>
            </header>

            <div className="grid gap-3">
              {STEPS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(STEPS[step].key, opt.value)}
                  className="w-full text-right p-4 md:p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all font-medium text-base md:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowRight className="w-4 h-4" />
                חזרה לשאלה הקודמת
              </button>
            )}

            <p className="text-xs text-muted-foreground text-center mt-10 max-w-xl mx-auto leading-relaxed">
              השאלון הוא כלי עזר חינוכי בלבד. הוא לא מהווה ייעוץ אישי, ייעוץ השקעות, ייעוץ פנסיוני או ייעוץ מס.
            </p>
          </>
        ) : (
          <ResultView result={result!} answers={answers} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function ResultView({ result, answers }: { result: ResultPath; answers: Answers }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
          נראה שהשלב הנכון עבורך הוא
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">{result.title}</h1>
        <p className="text-lg text-muted-foreground">{result.subtitle}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
        <p className="text-base md:text-lg leading-relaxed text-foreground/90">{result.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {result.calculator && (
          <Link
            to={result.calculator.to}
            className="flex items-center justify-between rounded-2xl border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 p-5 transition-all group"
          >
            <div>
              <p className="text-xs font-semibold text-primary mb-1">מחשבון מומלץ</p>
              <p className="font-bold">{result.calculator.label}</p>
            </div>
            <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
          </Link>
        )}
        {result.guide && (
          <Link
            to={result.guide.to}
            className="flex items-center justify-between rounded-2xl border-2 border-border bg-card hover:border-foreground/30 p-5 transition-all group"
          >
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">מדריך לעומק</p>
              <p className="font-bold">{result.guide.label}</p>
            </div>
            <ArrowLeft className="w-5 h-5 text-foreground group-hover:-translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">רוצה שנחבר אותך לבעל מקצוע מתאים?</h2>
        <ResultLeadForm result={result} answers={answers} />
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-xl mx-auto leading-relaxed">
        המידע הוא כללי וחינוכי בלבד ואינו מהווה ייעוץ השקעות, ייעוץ פנסיוני, ייעוץ מס, ייעוץ משפטי, ייעוץ משכנתאות או המלצה אישית.
      </p>
    </div>
  );
}

function ResultLeadForm({ result, answers }: { result: ResultPath; answers: Answers }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneRegex = /^0(5[0-9]|2|3|4|7[2-9]|8|9)[-\s]?\d{7}$/;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) return setError("נא להזין שם");
    if (!phoneRegex.test(phone.trim())) return setError("מספר טלפון לא תקין");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("אימייל לא תקין");
    if (!consent) return setError("חובה לאשר את מדיניות הפרטיות");

    setSubmitting(true);
    const { data: lead, error: leadErr } = await supabase
      .from("leads")
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        domain: result.domain,
        privacy_consent: true,
        marketing_consent: false,
        source_page: "/start",
        source_cta: "quiz_result",
        quiz_result: result.key,
        decision_stage: answers.preference || null,
        metadata: { quiz_answers: answers },
      })
      .select("id")
      .single();

    if (leadErr || !lead) {
      console.error("[start lead]", leadErr);
      setSubmitting(false);
      setError("אירעה שגיאה בשליחה. נסו שוב בעוד רגע.");
      return;
    }

    // Save individual answers
    const rows = STEPS.map((s, idx) => {
      const v = answers[s.key];
      const opt = s.options.find((o) => o.value === v);
      return v
        ? {
            lead_id: lead.id,
            question_key: s.key,
            question_label: s.question,
            answer_value: v,
            answer_label: opt?.label || v,
            step_index: idx,
          }
        : null;
    }).filter(Boolean) as {
      lead_id: string;
      question_key: string;
      question_label: string;
      answer_value: string;
      answer_label: string;
      step_index: number;
    }[];

    if (rows.length) {
      await supabase.from("lead_answers").insert(rows);
    }

    setSubmitting(false);
    navigate({ to: "/thank-you", search: { name, domain: result.domain } as never });
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 grid sm:grid-cols-2 gap-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
      noValidate
    >
      <div>
        <label className="block text-sm font-semibold mb-1.5">שם מלא</label>
        <input className={inp} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">טלפון</label>
        <input className={inp} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="050-1234567" autoComplete="tel" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold mb-1.5">אימייל</label>
        <input className={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <label className="sm:col-span-2 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
        <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          הפרטים נשמרים בהתאם ל
          <Link to="/legal/privacy" target="_blank" className="text-primary underline">מדיניות הפרטיות</Link>
          {" "}וישמשו לצורך יצירת קשר והפניה לבעל מקצוע מתאים, בכפוף להסכמה.
        </span>
      </label>
      {error && <p role="alert" className="sm:col-span-2 text-sm text-destructive text-center">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 h-12 rounded-full font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all disabled:opacity-60"
      >
        {submitting ? <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> שולח…</span> : "חברו אותי לבעל מקצוע"}
      </button>
    </form>
  );
}
