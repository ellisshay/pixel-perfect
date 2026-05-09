import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2, Activity } from "lucide-react";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { LeadForm } from "./LeadForm";

/* ============================================================
   Premium Category Hero — fintech glass style, alive & on-brand
   ============================================================ */
function PremiumCategoryHero({
  eyebrow,
  title,
  sub,
  ctas,
  actions,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  ctas?: { to: any; label: string; variant?: "primary" | "ghost" }[];
  actions?: { title?: string; items: string[]; cta?: { to: any; label: string; variant?: "primary" | "ghost" } };
}) {
  const hasSide = !!actions && actions.items.length > 0;
  return (
    <section className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-70" style={{ background: "var(--gradient-mesh)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="ph-grid-prem" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid-prem)" />
      </svg>
      <svg className="absolute inset-x-0 bottom-0 w-full h-48 opacity-40" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="cat-ln" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.7 0.14 165)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,180 C160,140 280,200 420,150 C560,100 700,170 840,120 C980,70 1120,140 1260,90 C1340,60 1400,80 1440,70" fill="none" stroke="url(#cat-ln)" strokeWidth="2" />
      </svg>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.62 0.13 240) 0%, transparent 70%)" }} />

      <div className={`relative container mx-auto px-6 pt-20 pb-20 md:pt-24 md:pb-24 ${hasSide ? "grid lg:grid-cols-12 gap-10 items-center" : ""}`}>
        <div className={hasSide ? "lg:col-span-7 animate-fade-in" : "max-w-3xl animate-fade-in"}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-xl border border-white/15 bg-white/5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
              {title}
            </span>
          </h1>
          {sub && <p className="mt-5 text-base md:text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">{sub}</p>}
          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={
                    c.variant === "ghost"
                      ? "inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-sm border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all"
                      : "group inline-flex items-center gap-2 h-12 px-7 rounded-full font-bold text-sm text-accent-foreground hover:scale-[1.03] transition-all"
                  }
                  style={c.variant === "ghost" ? undefined : { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {c.label} <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasSide && (
          <div className="lg:col-span-5 animate-fade-in">
            <div
              className="relative rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7"
              style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.45)" }}
            >
              <div
                className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-accent-foreground"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Activity size={12} /> {actions!.title ?? "מה עושים עכשיו"}
              </div>
              <ul className="mt-3 space-y-2.5">
                {actions!.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                    <span className="text-sm font-semibold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              {actions!.cta && (
                <Link
                  to={actions!.cta.to}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {actions!.cta.label} <ArrowLeft size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

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
      <PremiumCategoryHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        ctas={hero.ctas ?? [
          { to: "/start", label: "התחל אבחון", variant: "primary" },
          { to: "/calculators", label: "פתח מחשבון", variant: "ghost" },
        ]}
        actions={hero.actions}
      />

      {/* 3 value cards — the "why act" strip */}
      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          {valueCards.map((v, i) => (
            <div
              key={i}
              className="group relative overflow-hidden p-7 rounded-3xl border border-primary/10 bg-white hover:-translate-y-1 hover:border-primary/25 transition-all duration-500"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: i % 2 === 0 ? "oklch(0.62 0.13 240 / 0.35)" : "oklch(0.7 0.14 165 / 0.35)" }}
              />
              <div className="relative">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-accent-foreground transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {v.icon ? <v.icon size={22} /> : <ShieldCheck size={22} />}
                </span>
                <h3 className="mt-5 text-lg font-black text-primary">{v.t}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{v.d}</p>
              </div>
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
