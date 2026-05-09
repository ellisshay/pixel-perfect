import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Sparkles, Activity } from "lucide-react";

type Cta = { to: any; label: string; variant?: "primary" | "ghost" };
export type HeroTheme = "growth" | "mortgage" | "realestate" | "investing" | "planning" | "calc" | "legal" | "partners";

export function PageHero({
  eyebrow,
  title,
  sub,
  ctas,
  actions,
  theme = "growth",
  variant = "dark",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  ctas?: Cta[];
  actions?: { title?: string; items: string[]; cta?: Cta };
  theme?: HeroTheme;
  variant?: "dark" | "light";
}) {
  const hasSide = !!actions && actions.items.length > 0;
  if (variant === "light") return <LightHero eyebrow={eyebrow} title={title} sub={sub} ctas={ctas} actions={actions} hasSide={hasSide} />;

  return (
    <section className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-70" style={{ background: "var(--gradient-mesh)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="ph-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid)" />
      </svg>

      <ThemeArt theme={theme} />

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
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>{title}</span>
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
            <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7" style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.45)" }}>
              <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                <Activity size={12} /> {actions!.title ?? "מה עושים עכשיו"}
              </div>
              <ul className="mt-3 space-y-2.5">
                {actions!.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                    <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                    <span className="text-sm font-semibold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              {actions!.cta && (
                <Link to={actions!.cta.to} className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
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

function ThemeArt({ theme }: { theme: HeroTheme }) {
  // Common gradient defs
  const defs = (
    <defs>
      <linearGradient id="th-ln" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
        <stop offset="50%" stopColor="oklch(0.7 0.14 165)" stopOpacity="1" />
        <stop offset="100%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="th-ar" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.7 0.14 165)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="oklch(0.7 0.14 165)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="th-gold" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="oklch(0.78 0.14 80)" stopOpacity="0" />
        <stop offset="50%" stopColor="oklch(0.82 0.16 80)" stopOpacity="1" />
        <stop offset="100%" stopColor="oklch(0.78 0.14 80)" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  if (theme === "mortgage" || theme === "realestate") {
    return (
      <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-50" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        {defs}
        {/* skyline */}
        <g fill="oklch(0.62 0.13 240)" opacity="0.35">
          {[
            [40,160,80], [140,120,70], [230,180,60], [310,90,90], [420,140,75], [520,110,85], [620,170,60], [710,130,80], [810,80,95], [920,150,70], [1020,100,90], [1130,160,75], [1230,120,80], [1340,140,70],
          ].map(([x,y,w], i) => (
            <rect key={i} x={x} y={y} width={w} height={240-y} rx="3" />
          ))}
        </g>
        {/* glowing rising line over skyline */}
        <path d="M0,200 C160,180 280,150 420,140 C560,130 700,110 840,95 C980,80 1120,70 1260,55 C1340,46 1400,40 1440,38" fill="none" stroke="url(#th-gold)" strokeWidth="2.5" />
      </svg>
    );
  }

  if (theme === "investing") {
    // candlesticks + uptrend
    return (
      <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-55" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        {defs}
        <g>
          {Array.from({ length: 28 }).map((_, i) => {
            const x = 30 + i * 50;
            const baseY = 200 - i * 4 - Math.sin(i * 0.7) * 18;
            const open = baseY + (i % 2 === 0 ? -8 : 10);
            const close = baseY + (i % 2 === 0 ? 8 : -10);
            const high = Math.min(open, close) - 12;
            const low = Math.max(open, close) + 12;
            const up = close < open;
            const color = up ? "oklch(0.7 0.14 165)" : "oklch(0.62 0.21 25)";
            return (
              <g key={i} stroke={color} fill={color} opacity="0.85">
                <line x1={x} x2={x} y1={high} y2={low} strokeWidth="1.4" />
                <rect x={x - 6} y={Math.min(open, close)} width="12" height={Math.abs(close - open) || 2} />
              </g>
            );
          })}
        </g>
        <path d="M0,210 C160,190 320,170 480,150 C640,130 800,115 960,95 C1120,75 1280,60 1440,40" fill="none" stroke="url(#th-gold)" strokeWidth="2.5" />
      </svg>
    );
  }

  if (theme === "planning") {
    // milestone path with growing dots
    return (
      <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-55" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        {defs}
        <path d="M0,200 C200,180 320,200 520,160 C720,120 880,150 1080,100 C1240,60 1360,70 1440,40" fill="none" stroke="url(#th-ln)" strokeWidth="2" strokeDasharray="6 8" />
        {[
          [120, 192, 4], [380, 175, 6], [620, 150, 8], [880, 130, 10], [1140, 95, 12], [1380, 50, 14],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r as number} fill="oklch(0.7 0.14 165)" opacity="0.9" />
            <circle cx={cx} cy={cy} r={(r as number) + 6} fill="none" stroke="oklch(0.7 0.14 165)" strokeOpacity="0.4" />
          </g>
        ))}
      </svg>
    );
  }

  if (theme === "calc") {
    // soft area with grid-of-bars
    return (
      <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-50" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        {defs}
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const x = 20 + i * 40;
            const h = 30 + Math.abs(Math.sin(i * 0.55)) * 90 + i * 1.5;
            return <rect key={i} x={x} y={240 - h} width="14" height={h} rx="2" fill="oklch(0.7 0.14 165)" opacity={0.25 + (i % 3) * 0.1} />;
          })}
        </g>
        <path d="M0,180 C200,140 400,150 600,110 C800,70 1000,90 1200,55 C1320,35 1400,30 1440,25" fill="none" stroke="url(#th-gold)" strokeWidth="2.5" />
      </svg>
    );
  }

  if (theme === "partners") {
    // network nodes
    return (
      <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-50" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        {defs}
        {[
          [180, 180], [380, 90], [580, 170], [780, 70], [980, 160], [1180, 80], [1340, 150],
        ].map((p, i, arr) => {
          const next = arr[i + 1];
          return next ? <line key={i} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} stroke="oklch(0.7 0.14 165 / 0.4)" strokeWidth="1.5" /> : null;
        })}
        {[
          [180, 180], [380, 90], [580, 170], [780, 70], [980, 160], [1180, 80], [1340, 150],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="10" fill="oklch(0.82 0.16 80)" />
            <circle cx={cx} cy={cy} r="18" fill="none" stroke="oklch(0.82 0.16 80 / 0.4)" />
          </g>
        ))}
      </svg>
    );
  }

  // default — growth wave
  return (
    <svg className="absolute inset-x-0 bottom-0 w-full h-56 opacity-50" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
      {defs}
      <path d="M0,180 C160,140 280,200 420,150 C560,100 700,170 840,120 C980,70 1120,140 1260,90 C1340,60 1400,80 1440,70 L1440,240 L0,240 Z" fill="url(#th-ar)" />
      <path d="M0,180 C160,140 280,200 420,150 C560,100 700,170 840,120 C980,70 1120,140 1260,90 C1340,60 1400,80 1440,70" fill="none" stroke="url(#th-ln)" strokeWidth="2" />
    </svg>
  );
}

/* Calmer light hero used for legal pages and similar minimal contexts */
function LightHero({ eyebrow, title, sub, ctas, actions, hasSide }: {
  eyebrow?: string; title: string; sub?: string; ctas?: Cta[];
  actions?: { title?: string; items: string[]; cta?: Cta }; hasSide: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.99 0.005 240) 0%, oklch(0.97 0.012 220) 60%, oklch(0.96 0.02 165 / 0.55) 100%)" }} />
      <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(at 15% 10%, oklch(0.62 0.13 240 / 0.16) 0px, transparent 55%), radial-gradient(at 85% 0%, oklch(0.61 0.13 165 / 0.18) 0px, transparent 55%)" }} />
      <div className={`relative container mx-auto px-6 pt-14 pb-16 ${hasSide ? "grid lg:grid-cols-12 gap-10 items-center" : ""}`}>
        <div className={hasSide ? "lg:col-span-7 animate-fade-in" : "max-w-3xl animate-fade-in"}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-primary uppercase border border-primary/15 bg-white/70 backdrop-blur shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-[3rem] font-black tracking-tight text-primary leading-[1.12]">{title}</h1>
          {sub && <p className="mt-4 text-base md:text-lg text-foreground/75 max-w-2xl leading-relaxed">{sub}</p>}
          {ctas && ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={c.variant === "ghost"
                    ? "inline-flex items-center justify-center h-12 px-6 rounded-full font-bold text-sm text-primary border border-primary/20 bg-white hover:bg-primary/5 transition-all"
                    : "inline-flex items-center justify-center h-12 px-7 rounded-full font-bold text-sm text-accent-foreground hover:scale-[1.02] transition-all"}
                  style={c.variant === "ghost" ? undefined : { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {hasSide && actions && (
          <div className="lg:col-span-5 animate-fade-in">
            <div className="relative rounded-3xl border border-primary/10 bg-white/90 backdrop-blur-xl p-6 md:p-7" style={{ boxShadow: "0 30px 60px -25px oklch(0.24 0.045 252 / 0.22)" }}>
              <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                <Sparkles size={12} /> {actions.title ?? "מה עושים עכשיו"}
              </div>
              <ul className="mt-3 space-y-2.5">
                {actions.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl border border-primary/10 bg-gradient-to-l from-secondary/60 to-white">
                    <CheckCircle2 size={18} className="mt-0.5 text-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              {actions.cta && (
                <Link to={actions.cta.to} className="mt-5 w-full inline-flex items-center justify-center h-12 rounded-full text-sm font-bold text-primary-foreground hover:scale-[1.01] transition" style={{ background: "var(--gradient-hero)" }}>
                  {actions.cta.label} <ArrowLeft size={14} className="me-1" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
