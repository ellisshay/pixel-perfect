import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Disclaimer } from "@/components/layout/Section";
import { useState } from "react";
import { ReferralForm } from "@/components/sections/ReferralForm";

export const Route = createFileRoute("/start")({
  head: () => ({ meta: [{ title: "שאלון התחל כאן | המפה הפיננסית" }] }),
  component: Start,
});

const questions = [
  { q: "מה המטרה שלך כרגע?", opts: ["סדר כלכלי", "השקעות שוק ההון", "נדל״ן", "משכנתא", "הלוואה", "פרישה", "חיסכון לילדים"] },
  { q: "מה מצבך?", opts: ["יחיד", "זוג", "משפחה", "עצמאי", "משקיע מתחיל", "משקיע מתקדם"] },
  { q: "מה טווח הזמן שלך?", opts: ["עד שנה", "1-3 שנים", "3-7 שנים", "מעל 7 שנים"] },
  { q: "רמת סיכון שאת/ה מרגיש/ה איתה בנוח?", opts: ["נמוכה", "בינונית", "גבוהה"] },
  { q: "מה אתם מחפשים כרגע?", opts: ["רק ללמוד", "לקבל הפניה", "עדיין לא יודע"] },
];

function Start() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const done = step >= questions.length;
  const goal = ans[0] ?? "סדר כלכלי";

  if (done) {
    const stage = goal.includes("סדר") ? "שלב 1 – יציבות" : goal.includes("פרישה") ? "שלב 2 – הגנה" : goal.includes("שוק") ? "שלב 3 – צמיחה" : goal.includes("נדל״ן") ? "שלב 4 – מינוף" : "שלב 2 – הגנה";
    const calc = goal.includes("משכנתא") ? "/calculators/mortgage" : goal.includes("שוק") ? "/calculators/invest" : goal.includes("ילדים") ? "/calculators/child" : "/calculators/family";
    return (
      <PageLayout>
        <PageHero eyebrow="התוצאה שלך" title={`אתם נמצאים ב${stage}`} sub="להלן 3 צעדים מומלצים, מחשבון מותאם ומדריכים להמשך." />
        <Section>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <h3 className="font-bold mb-3">3 צעדים עקרוניים</h3>
                <ol className="list-decimal pr-5 space-y-2 text-sm text-muted-foreground">
                  <li>מיפוי תזרים מלא – הכנסות, הוצאות וכרית ביטחון.</li>
                  <li>סדר בחובות, דמי ניהול וביטוחים מיותרים.</li>
                  <li>בניית תוכנית פעולה לטווח של {ans[2] ?? "מספר שנים"}.</li>
                </ol>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <h3 className="font-bold mb-3">המחשבון שלכם</h3>
                <Link to={calc as any} className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>פתחו את המחשבון</Link>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <h3 className="font-bold mb-3">מדריכים מומלצים</h3>
                <ul className="text-sm space-y-1.5">
                  <li><Link to="/blog" className="text-primary font-semibold">איך בונים תמונת מצב כלכלית</Link></li>
                  <li><Link to="/blog" className="text-primary font-semibold">למה דמי ניהול קטנים עושים נזק גדול</Link></li>
                  <li><Link to="/blog" className="text-primary font-semibold">איך ריבית דריבית בונה הון</Link></li>
                </ul>
              </div>
              <Disclaimer />
            </div>
            <div>
              <h3 className="font-bold mb-4">רוצים שנחבר אתכם לאיש מקצוע מתאים?</h3>
              <ReferralForm defaultArea={goal} />
            </div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const q = questions[step];
  return (
    <PageLayout>
      <PageHero eyebrow={`שאלה ${step + 1} מתוך ${questions.length}`} title={q.q} />
      <Section>
        <div className="max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-3">
            {q.opts.map((o) => (
              <button key={o} onClick={() => { setAns([...ans, o]); setStep(step + 1); }}
                className="text-right p-5 rounded-2xl border border-border bg-card hover:border-primary hover:-translate-y-0.5 transition-all font-semibold" style={{ boxShadow: "var(--shadow-soft)" }}>
                {o}
              </button>
            ))}
          </div>
          <div className="mt-6 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full transition-all" style={{ width: `${(step / questions.length) * 100}%`, background: "var(--gradient-hero)" }} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
