import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import mortgageHero from "@/assets/hero-mortgage-premium.jpg";
import realestateHero from "@/assets/hero-realestate-premium.jpg";
import investingHero from "@/assets/hero-investing-premium.jpg";
import planningHero from "@/assets/hero-planning-premium.jpg";

type Cta = { to: any; label: string; variant?: "primary" | "ghost" };
export type HeroTheme = "growth" | "mortgage" | "realestate" | "investing" | "planning" | "calc" | "legal" | "partners";

const heroImages: Partial<Record<HeroTheme, string>> = {
  mortgage: mortgageHero,
  realestate: realestateHero,
  investing: investingHero,
  planning: planningHero,
};

const heroSignals: Record<string, string[]> = {
  mortgage: ["שליטה בהחזר", "מסלולים ברורים", "פחות לחץ חודשי"],
  realestate: ["תזרים נקי", "תשואה נטו", "סיכון לפני חתימה"],
  investing: ["צמיחה ארוכה", "דמי ניהול", "רמת סיכון"],
  planning: ["סדר בתזרים", "יעדים קדימה", "שקט משפחתי"],
};

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
  const image = heroImages[theme];
  const signals = heroSignals[theme] ?? ["מיפוי מצב", "בדיקת מספרים", "צעד הבא"];

  return (
    <section className="relative min-h-[640px] overflow-hidden text-primary-foreground isolate" style={{ background: "var(--gradient-hero)" }}>
      {image ? (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} />
      ) : (
        <ThemeArt theme={theme} />
      )}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/72 to-primary/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-primary/90" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      <div className="relative container mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="grid min-h-[520px] lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.62fr)] gap-10 items-center">
        <div className="animate-fade-in max-w-3xl lg:justify-self-end text-right">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.08] px-4 py-2 text-[11px] font-black tracking-[0.18em] backdrop-blur-2xl">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-[1.02] text-primary-foreground max-w-4xl">
            {title}
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-accent shadow-[0_0_32px_var(--accent)] ms-auto" />
          {sub && <p className="mt-6 text-base md:text-xl text-primary-foreground/78 max-w-2xl leading-relaxed ms-auto">{sub}</p>}
          <div className="mt-7 flex flex-wrap justify-start lg:justify-end gap-2.5">
            {signals.map((signal) => (
              <span key={signal} className="rounded-full border border-primary-foreground/12 bg-primary-foreground/[0.07] px-4 py-2 text-xs font-bold backdrop-blur-xl">
                {signal}
              </span>
            ))}
          </div>
          {ctas && ctas.length > 0 && (
            <div className="mt-9 flex flex-wrap justify-start lg:justify-end gap-3">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={
                    c.variant === "ghost"
                      ? "inline-flex h-[3.25rem] items-center gap-2 rounded-full border border-primary-foreground/18 bg-primary-foreground/[0.08] px-6 text-sm font-black backdrop-blur-2xl transition-all hover:bg-primary-foreground/[0.13]"
                      : "group inline-flex h-[3.25rem] items-center gap-2 rounded-full px-8 text-sm font-black text-accent-foreground transition-all hover:-translate-y-0.5"
                  }
                  style={c.variant === "ghost" ? undefined : { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  {c.label} <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasSide && actions && (
          <div className="animate-fade-in lg:justify-self-start w-full max-w-md">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary-foreground/14 bg-primary/[0.32] p-5 backdrop-blur-2xl" style={{ boxShadow: "0 34px 90px -42px oklch(0 0 0 / 0.82)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/[0.10] via-transparent to-accent/[0.10]" />
              <div className="relative flex items-center justify-between gap-4 border-b border-primary-foreground/10 pb-4">
                <div className="text-xs font-black tracking-[0.18em] text-primary-foreground/58">{actions.title ?? "מה עושים עכשיו"}</div>
                <Sparkles size={16} className="text-accent" />
              </div>
              <ol className="relative mt-4 space-y-3">
                {actions!.items.map((item, idx) => (
                  <li key={idx} className="group grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.055] p-3.5 transition-all hover:bg-primary-foreground/[0.095]">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-xs font-black text-accent ring-1 ring-accent/25">{idx + 1}</span>
                    <span className="self-center text-sm font-bold leading-snug text-primary-foreground/86">{item}</span>
                  </li>
                ))}
              </ol>
              {actions.cta && (
                <Link to={actions.cta.to} className="relative mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-black text-accent-foreground transition hover:-translate-y-0.5" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                  {actions!.cta.label} <ArrowLeft size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
        </div>
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
