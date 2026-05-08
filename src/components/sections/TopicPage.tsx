import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { LeadForm } from "./LeadForm";

type TopicProps = {
  hero: {
    eyebrow?: string;
    title: string;
    sub?: string;
    ctas?: { to: any; label: string; variant?: "primary" | "ghost" }[];
    actions?: { title?: string; items: string[]; cta?: { to: any; label: string; variant?: "primary" | "ghost" } };
  };
  /** 3 value cards immediately under the hero — the "why now" strip. */
  valueCards: { icon?: any; t: string; d: string }[];
  /** Headline + sub for the embedded converter section. */
  converter: { eyebrow?: string; title: string; sub?: string; element: ReactNode };
  /** Mini "fear strip" — 3-4 mistakes that drive the user toward the converter/lead form. */
  mistakes: { slug: string; title: string }[];
  /** LeadForm wiring. */
  leadDomain: string;
  /** Bottom CTA copy. */
  bottomCta?: { title: string; sub?: string };
  /** Optional further reading — kept slim, max 3. */
  guides?: { slug: string; title: string; excerpt: string; readTime: string }[];
};

export function TopicPage({ hero, valueCards, converter, mistakes, leadDomain, bottomCta, guides }: TopicProps) {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        ctas={
          hero.ctas ?? [
            { to: "/start", label: "התחל אבחון", variant: "primary" },
            { to: "/calculators", label: "פתח מחשבון", variant: "ghost" },
          ]
        }
        actions={hero.actions}
      />

      {/* 3 value cards — the "why act" strip */}
      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          {valueCards.map((v, i) => (
            <div key={i} className="p-6 rounded-3xl border border-primary/10 bg-white" style={{ boxShadow: "var(--shadow-soft)" }}>
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                {v.icon ? <v.icon size={20} /> : <ShieldCheck size={20} />}
              </span>
              <h3 className="mt-4 text-lg font-black text-primary">{v.t}</h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Fear strip — mistakes that drive action */}
      {mistakes.length > 0 && (
        <Section className="bg-secondary/50">
          <SectionHeader eyebrow="לפני שמתקדמים" title="הטעויות שעולות הכי הרבה כסף בתחום" center={false} />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mistakes.slice(0, 6).map((m) => (
              <Link
                key={m.slug}
                to="/taoyot/$slug"
                params={{ slug: m.slug }}
                className="group p-5 rounded-2xl border border-destructive/20 bg-white hover:border-destructive/40 hover:-translate-y-0.5 transition-all"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                    <AlertTriangle size={16} />
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-destructive uppercase">טעות נפוצה</span>
                </div>
                <h3 className="mt-3 font-bold text-sm leading-snug text-primary">{m.title}</h3>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                  בדוק אם גם אתה <ArrowLeft size={14} />
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Converter — embedded calculator/quiz */}
      <Section>
        <SectionHeader eyebrow={converter.eyebrow ?? "תחנת בדיקה"} title={converter.title} sub={converter.sub} center={false} />
        <div className="mt-8">{converter.element}</div>
      </Section>

      {/* Lead form + bottom CTA */}
      <Section className="bg-secondary/50">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-accent uppercase border border-accent/20 bg-white">
              <Sparkles size={12} /> הצעד הבא
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-primary leading-tight">
              {bottomCta?.title ?? "רוצה כיוון אישי לפני שמקבלים החלטה?"}
            </h2>
            <p className="mt-3 text-base text-foreground/75 leading-relaxed max-w-xl">
              {bottomCta?.sub ??
                "השאר פרטים ונחזור אליך עם כיוון ראשוני. אם נדרש, נחבר אותך לבעל מקצוע מאומת. ללא מכירה ישירה, ללא הבטחות תשואה."}
            </p>

            {guides && guides.length > 0 && (
              <div className="mt-8">
                <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">המשך קריאה</div>
                <ul className="space-y-2">
                  {guides.slice(0, 3).map((g) => (
                    <li key={g.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: g.slug }}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                      >
                        <ArrowLeft size={14} /> {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <LeadForm defaultDomain={leadDomain} sourcePage={leadDomain} />
          </div>
        </div>
        <div className="mt-12"><Disclaimer /></div>
      </Section>
    </>
  );
}
