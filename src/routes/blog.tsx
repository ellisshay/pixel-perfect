import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { guides } from "@/data/content";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "בלוג ומדריכים | המפה הפיננסית" }] }),
  component: () => {
    const cats = ["הכל", ...Array.from(new Set(guides.map((g) => g.category)))];
    const [f, setF] = useState("הכל");
    const list = f === "הכל" ? guides : guides.filter((g) => g.category === f);
    return (
      <PageLayout>
        <PageHero theme="growth"
          eyebrow="בלוג ומדריכים"
          title="מדריכים פיננסיים פשוטים לאנשים אמיתיים"
          sub="מאמרים, מדריכים, סיפורים וכלים שיעזרו לך להבין כסף, השקעות, חיסכון, נדל״ן, משכנתאות ופנסיה בלי מילים מסובכות ובלי הבטחות ריקות."
          ctas={[
            { to: "/blog", label: "קרא מדריכים", variant: "primary" },
            { to: "/start", label: "בחר נושא", variant: "ghost" },
          ]}
          actions={{
            title: "מה עושים עכשיו",
            items: [
              "בוחרים תחום: שוק ההון, נדל״ן, משכנתאות או פנסיה",
              "קוראים מדריך אחד שמתחבר לשאלה הכי בוערת",
              "מסמנים פעולה אחת לבצע השבוע",
              "ממשיכים למחשבון או לאבחון מתאים",
            ],
            cta: { to: "/start", label: "התחל אבחון אישי" },
          }}
        />
        <Section>
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map((c) => (
              <button key={c} onClick={() => setF(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${f === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((g) => (
              <Link key={g.slug} to="/blog/$slug" params={{ slug: g.slug }} className="p-6 rounded-2xl border border-border bg-card hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <span className="text-[11px] font-bold tracking-widest text-primary uppercase">{g.category} · {g.readTime}</span>
                <h3 className="mt-2 font-bold leading-snug">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      </PageLayout>
    );
  },
});
