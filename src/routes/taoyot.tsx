import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { LeadForm } from "@/components/sections/LeadForm";
import { mistakes } from "@/data/content";
import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/taoyot")({
  head: () => ({ meta: [{ title: "טעויות פיננסיות נפוצות | המפה הפיננסית" }] }),
  component: () => {
    const cats = ["הכל", ...Array.from(new Set(mistakes.map((m) => m.category)))];
    const [f, setF] = useState("הכל");
    const list = f === "הכל" ? mistakes : mistakes.filter((m) => m.category === f);
    return (
      <PageLayout>
        <PageHero theme="growth"
          eyebrow="טעויות נפוצות"
          title="הטעויות הקטנות שעולות הרבה כסף"
          sub="רוב האנשים לא נופלים בגלל החלטה אחת גדולה, אלא בגלל רצף החלטות קטנות בלי בדיקה. כאן תלמד מה לבדוק לפני משכנתא, השקעה, ביטוח, פנסיה או עסקת נדל״ן."
          ctas={[
            { to: "/blog", label: "למד מהטעויות", variant: "primary" },
            { to: "/start", label: "בדוק את המצב שלך", variant: "ghost" },
          ]}
          actions={{
            title: "מה עושים עכשיו",
            items: [
              "מזהים את התחום הרלוונטי לטעות שאתה חושש ממנה",
              "קוראים מה לבדוק לפני שמקבלים החלטה",
              "ממפים פערים בתיק שלך מול הטעויות הנפוצות",
              "ממשיכים לאבחון או למחשבון מתאים",
            ],
            cta: { to: "/start", label: "התחל אבחון של 5 שאלות" },
          }}
        />
        <Section>
          <SectionHeader
            eyebrow="לפי תחום"
            title="באיזה תחום אתה הכי חושש לטעות?"
            sub="בחר תחום, וזיהוי מהיר יראה לך את הטעויות הנפוצות ואיך לבדוק אם גם אתה עושה אותן."
            center={false}
          />
          <div className="mt-6 flex flex-wrap gap-2 mb-8">
            {cats.map((c) => (
              <button key={c} onClick={() => setF(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${f === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((m) => (
              <Link
                key={m.slug}
                to="/taoyot/$slug"
                params={{ slug: m.slug }}
                className="group p-6 rounded-2xl border border-destructive/20 bg-white hover:border-destructive/40 hover:-translate-y-1 transition-all"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                    <AlertTriangle size={16} />
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-destructive uppercase">{m.category}</span>
                </div>
                <h3 className="mt-3 font-bold leading-snug text-primary">{m.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{m.intro}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  בדוק אם גם אתה עושה את זה ←
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section className="bg-secondary/50">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-accent uppercase border border-accent/20 bg-white">
                <Sparkles size={12} /> הצעד הבא
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-primary leading-tight">
                חושש שגם אתה עושה אחת מהטעויות האלה?
              </h2>
              <p className="mt-3 text-base text-foreground/75 leading-relaxed max-w-xl">
                השאר פרטים ונחזור אליך עם בדיקה ראשונית של המצב שלך מול הטעויות הנפוצות בתחום
                הרלוונטי. במידת הצורך נחבר לבעל מקצוע מאומת. ללא מכירה ישירה.
              </p>
            </div>
            <div>
              <LeadForm sourcePage="taoyot" />
            </div>
          </div>
          <div className="mt-12"><Disclaimer /></div>
        </Section>
      </PageLayout>
    );
  },
});
