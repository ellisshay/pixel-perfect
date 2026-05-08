import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { ReferralForm } from "./ReferralForm";

type TopicProps = {
  hero: {
    eyebrow?: string;
    title: string;
    sub?: string;
    ctas?: { to: any; label: string; variant?: "primary" | "ghost" }[];
    actions?: { title?: string; items: string[]; cta?: { to: any; label: string; variant?: "primary" | "ghost" } };
  };
  subtopics: string[];
  calculators: { to: any; t: string }[];
  guides: { slug: string; title: string; excerpt: string; readTime: string }[];
  mistakes: { slug: string; title: string }[];
  referrals: string[];
  area: string;
};

export function TopicPage({ hero, subtopics, calculators, guides, mistakes, referrals, area }: TopicProps) {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        ctas={
          hero.ctas ?? [
            { to: "/start", label: "התחל כאן", variant: "primary" },
            { to: "/calculators", label: "מחשבונים", variant: "ghost" },
          ]
        }
        actions={hero.actions}
      />
      <Section>
        <SectionHeader eyebrow="תתי תחומים" title="מה תמצאו כאן" center={false} />
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {subtopics.map((s) => (
            <div key={s} className="px-5 py-4 rounded-xl border border-border bg-card text-sm font-semibold" style={{ boxShadow: "var(--shadow-soft)" }}>{s}</div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="כלים" title="מחשבונים רלוונטיים" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculators.map((c) => (
            <Link key={c.to} to={c.to} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all group" style={{ boxShadow: "var(--shadow-soft)" }}>
              <h3 className="font-bold">{c.t}</h3>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">פתח מחשבון <ArrowLeft size={14} /></div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="מדריכים" title="ידע, סדר ופירוק" />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <Link key={g.slug} to="/blog/$slug" params={{ slug: g.slug }} className="p-6 rounded-2xl border border-border bg-card hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="text-xs text-muted-foreground">{g.readTime}</div>
              <h3 className="mt-1.5 font-bold leading-snug">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="טעויות" title="מה לא לעשות בתחום הזה" />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mistakes.map((m) => (
            <Link key={m.slug} to="/taoyot/$slug" params={{ slug: m.slug }} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
              <h3 className="font-bold text-sm leading-snug">{m.title}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader eyebrow="הפניות" title="כשצריך איש מקצוע" center={false} sub="המפה תעזור לכם להבין מי הגורם המתאים – ותחבר רק לאנשי מקצוע מאומתים." />
            <ul className="mt-6 space-y-2 text-sm">
              {referrals.map((r) => (
                <li key={r} className="flex items-start gap-2 p-3 rounded-lg bg-card border border-border"><span className="text-primary">●</span>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <ReferralForm defaultArea={area} />
          </div>
        </div>
        <div className="mt-12"><Disclaimer /></div>
      </Section>
    </>
  );
}
