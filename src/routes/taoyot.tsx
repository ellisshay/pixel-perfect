import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { mistakes } from "@/data/content";
import { useState } from "react";

export const Route = createFileRoute("/taoyot")({
  head: () => ({ meta: [{ title: "טעויות פיננסיות נפוצות | המפה הפיננסית" }] }),
  component: () => {
    const cats = ["הכל", ...Array.from(new Set(mistakes.map((m) => m.category)))];
    const [f, setF] = useState("הכל");
    const list = f === "הכל" ? mistakes : mistakes.filter((m) => m.category === f);
    return (
      <PageLayout>
        <PageHero
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
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map((c) => (
              <button key={c} onClick={() => setF(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${f === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((m) => (
              <Link key={m.slug} to="/taoyot/$slug" params={{ slug: m.slug }} className="p-6 rounded-2xl border border-border bg-card hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <span className="text-[11px] font-bold tracking-widest text-primary uppercase">{m.category}</span>
                <h3 className="mt-2 font-bold leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{m.intro}</p>
              </Link>
            ))}
          </div>
        </Section>
      </PageLayout>
    );
  },
});
