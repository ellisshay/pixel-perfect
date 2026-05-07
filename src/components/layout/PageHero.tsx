import { Link } from "@tanstack/react-router";

export function PageHero({ eyebrow, title, sub, ctas }: {
  eyebrow?: string; title: string; sub?: string;
  ctas?: { to: any; label: string; variant?: "primary" | "ghost" }[];
}) {
  return (
    <section className="relative pt-16 pb-14 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-mesh)" }} />
      <div className="container mx-auto px-6 relative">
        {eyebrow && <span className="text-xs font-bold tracking-widest text-accent uppercase">{eyebrow}</span>}
        <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-primary-foreground max-w-3xl leading-tight">
          {title}
        </h1>
        {sub && <p className="mt-4 text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">{sub}</p>}
        {ctas && ctas.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {ctas.map((c) => (
              <Link key={c.label} to={c.to}
                className={c.variant === "ghost"
                  ? "inline-flex items-center justify-center h-12 px-6 rounded-full font-bold text-sm text-primary-foreground border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-all"
                  : "inline-flex items-center justify-center h-12 px-7 rounded-full font-bold text-sm text-accent-foreground hover:scale-[1.02] transition-all"}
                style={c.variant === "ghost" ? undefined : { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
