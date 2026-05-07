import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Disclaimer } from "@/components/layout/Section";
import { mistakes } from "@/data/content";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/taoyot/$slug")({
  component: () => {
    const { slug } = Route.useParams();
    const m = mistakes.find((x) => x.slug === slug);
    if (!m) throw notFound();
    return (
      <PageLayout>
        <PageHero eyebrow={m.category} title={m.title} sub={m.intro} />
        <Section>
          <div className="max-w-3xl space-y-5">
            {m.items.map((it, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}><AlertTriangle size={20} /></div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground tracking-widest">טעות {i + 1}</div>
                  <h3 className="mt-1 text-lg font-bold">{it.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
                </div>
              </div>
            ))}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/taoyot" className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={16} /> כל הטעויות</Link>
              <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-bold text-primary">מחשבון רלוונטי</Link>
            </div>
            <Disclaimer />
          </div>
        </Section>
      </PageLayout>
    );
  },
});
