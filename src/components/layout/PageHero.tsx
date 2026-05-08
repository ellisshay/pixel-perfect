import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

type Cta = { to: any; label: string; variant?: "primary" | "ghost" };

export function PageHero({
  eyebrow,
  title,
  sub,
  ctas,
  actions,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  ctas?: Cta[];
  actions?: { title?: string; items: string[]; cta?: Cta };
}) {
  const hasSide = !!actions && actions.items.length > 0;
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.99 0.005 240) 0%, oklch(0.97 0.012 220) 60%, oklch(0.96 0.02 165 / 0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(at 15% 10%, oklch(0.62 0.13 240 / 0.16) 0px, transparent 55%), radial-gradient(at 85% 0%, oklch(0.61 0.13 165 / 0.18) 0px, transparent 55%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="ph-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="oklch(0.24 0.045 252)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid)" />
      </svg>

      <div className={`relative container mx-auto px-6 pt-14 pb-16 ${hasSide ? "grid lg:grid-cols-12 gap-10 items-center" : ""}`}>
        <div className={hasSide ? "lg:col-span-7 animate-fade-up" : "max-w-3xl animate-fade-up"}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-primary uppercase border border-primary/15 bg-white/70 backdrop-blur shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-primary leading-[1.12]">
            {title}
          </h1>
          {sub && <p className="mt-4 text-base md:text-lg text-foreground/75 max-w-2xl leading-relaxed">{sub}</p>}
          {ctas && ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={
                    c.variant === "ghost"
                      ? "inline-flex items-center justify-center h-12 px-6 rounded-full font-bold text-sm text-primary border border-primary/20 bg-white hover:bg-primary/5 transition-all"
                      : "inline-flex items-center justify-center h-12 px-7 rounded-full font-bold text-sm text-accent-foreground hover:scale-[1.02] transition-all"
                  }
                  style={c.variant === "ghost" ? undefined : { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasSide && (
          <div className="lg:col-span-5 animate-fade-up">
            <div
              className="relative rounded-3xl border border-primary/10 bg-white/90 backdrop-blur-xl p-6 md:p-7"
              style={{ boxShadow: "0 30px 60px -25px oklch(0.24 0.045 252 / 0.22)" }}
            >
              <div
                className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-accent-foreground"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Sparkles size={12} /> {actions!.title ?? "מה עושים עכשיו"}
              </div>
              <ul className="mt-3 space-y-2.5">
                {actions!.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl border border-primary/10 bg-gradient-to-l from-secondary/60 to-white">
                    <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              {actions!.cta && (
                <Link
                  to={actions!.cta.to}
                  className="mt-5 w-full inline-flex items-center justify-center h-12 rounded-full text-sm font-bold text-primary-foreground hover:scale-[1.01] transition"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  {actions!.cta.label} <ArrowLeft size={14} className="me-1" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
