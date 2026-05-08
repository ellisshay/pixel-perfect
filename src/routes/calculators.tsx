import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Calculator, TrendingUp, PiggyBank, HeartPulse, Building2, Baby, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/calculators")({
  head: () => ({ meta: [{ title: "מחשבונים חכמים | המפה הפיננסית" }, { name: "description", content: "6 מחשבונים פיננסיים: משכנתא, השקעות, ריבית דריבית, מצב משפחתי, נדל״ן וחיסכון לילדים." }]}),
  component: () => {
    const items = [
      { to: "/calculators/family" as const, icon: HeartPulse, t: "מצב פיננסי משפחתי", d: "תמונת מצב מלאה: עודף, נכסים, חובות ושלב במפה." },
      { to: "/calculators/mortgage" as const, icon: Calculator, t: "מחשבון משכנתא", d: "החזר חודשי, ריבית כוללת ויחס החזר להכנסה." },
      { to: "/calculators/invest" as const, icon: TrendingUp, t: "השקעות", d: "צמיחת הון לאורך זמן עם הפקדה חודשית." },
      { to: "/calculators/compound" as const, icon: PiggyBank, t: "ריבית דריבית עם דמי ניהול", d: "כמה דמי ניהול 'אוכלים' לכם לאורך השנים." },
      { to: "/calculators/realestate" as const, icon: Building2, t: "השקעת נדל״ן", d: "תזרים, תשואה ויחס מימון לעסקה." },
      { to: "/calculators/child" as const, icon: Baby, t: "חיסכון לכל ילד", d: "סכום צפוי בגיל היעד אחרי דמי ניהול." },
    ];
    return (
      <PageLayout>
        <PageHero
          eyebrow="מחשבונים"
          title="מספרים עושים סדר בכסף"
          sub="המחשבונים של המפה הפיננסית עוזרים לך להבין החזר חודשי, תשואה, חיסכון, מס שבח, פנסיה והשקעות, כדי לקבל תמונה ראשונית לפני פנייה לבעל מקצוע."
          ctas={[
            { to: "/calculators/family", label: "פתח מחשבון", variant: "primary" },
            { to: "/start", label: "בחר תחום לבדיקה", variant: "ghost" },
          ]}
          actions={{
            title: "מה עושים עכשיו",
            items: [
              "בוחרים מחשבון לפי המטרה הפיננסית שלך",
              "מזינים מספרים אמיתיים מהחיים",
              "מבינים את ההשפעה של ריבית, זמן ועמלות",
              "ממשיכים לבדיקה מקצועית עם נתונים בידיים",
            ],
            cta: { to: "/start", label: "התחל אבחון אישי" },
          }}
        />
        <Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((c) => (
              <Link key={c.to} to={c.to} className="group p-7 rounded-2xl border border-border bg-card hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}><c.icon size={22} /></div>
                <h3 className="mt-4 font-bold text-lg">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">פתח <ArrowLeft size={14} /></div>
              </Link>
            ))}
          </div>
        </Section>
      </PageLayout>
    );
  },
});
