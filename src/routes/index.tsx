import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Counter } from "@/components/premium/Counter";
import {
  ArrowLeft, Sparkles, TrendingDown, Wallet, Building2, Percent, Brain,
  Calculator, LineChart, PiggyBank, HeartPulse, ArrowUpRight, Flame,
  Target, Compass, Users, Briefcase, Crown, Baby, AlertTriangle, ChevronLeft, ChevronRight,
  Zap, ShieldCheck, Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "המפה הפיננסית | המערכת שמראה איך הכסף שלך באמת עובד" },
      { name: "description", content: "פלטפורמת אבחון, מחשבונים וכלים פיננסיים. בדוק כמה אתה באמת מפסיד בעו״ש, בדמי ניהול ובמשכנתא — ובחר את המסלול הבא שלך." },
      { property: "og:title", content: "המפה הפיננסית | איך הכסף שלך באמת עובד" },
      { property: "og:description", content: "אבחון אישי, מחשבונים חיים ומסלולי צמיחה — בלי מילים גדולות, בלי הבטחות ריקות." },
    ],
  }),
  component: HomePage,
});

/* ============================================================
   1. HERO
   ============================================================ */
function Hero() {
  const tickerItems = [
    { icon: TrendingDown, t: "רוב המשפחות לא יודעות כמה הכסף שלהן באמת עובד" },
    { icon: Percent, t: "דמי ניהול קטנים יכולים למחוק מאות אלפי שקלים" },
    { icon: Building2, t: "משכנתא לא נכונה יכולה לעלות הון" },
    { icon: Wallet, t: "₪150K שיושבים בעו״ש מאבדים 27,000₪ ב-7 שנים לאינפלציה" },
    { icon: LineChart, t: "0.5% דמי ניהול שווים 300,000₪ פחות בפרישה" },
  ];

  return (
    <section className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
      {/* mesh + glow */}
      <div className="absolute inset-0 opacity-70" style={{ background: "var(--gradient-mesh)" }} />
      {/* animated grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      {/* glowing graph line */}
      <svg className="absolute inset-x-0 bottom-0 w-full h-64 opacity-50" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="ln" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.7 0.14 165)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 240)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.7 0.14 165)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.7 0.14 165)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,180 C160,140 280,200 420,150 C560,100 700,170 840,120 C980,70 1120,140 1260,90 C1340,60 1400,80 1440,70 L1440,240 L0,240 Z" fill="url(#ar)" />
        <path d="M0,180 C160,140 280,200 420,150 C560,100 700,170 840,120 C980,70 1120,140 1260,90 C1340,60 1400,80 1440,70" fill="none" stroke="url(#ln)" strokeWidth="2" />
      </svg>
      {/* floating glow orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.62 0.13 240) 0%, transparent 70%)" }} />

      <div className="relative container mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-xl border border-white/15 bg-white/5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            המפה הפיננסית · גרסה 2026
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            כמה כסף אתם
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
              מפסידים בלי לשים לב?
            </span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed">
            המערכת הפיננסית שמראה איך כסף באמת עובד — אבחון, מחשבונים חיים ומסלולי החלטה ברורים, בלי בלבול ובלי הבטחות ריקות.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/start" className="group inline-flex items-center gap-2 h-14 px-8 rounded-full font-bold text-base text-accent-foreground hover:scale-[1.03] transition-all"
              style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
              <Brain size={18} /> בדוק את מצבך <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link to="/calculators" className="inline-flex items-center gap-2 h-14 px-7 rounded-full font-bold text-sm border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all">
              <Calculator size={16} /> פתח מחשבון
            </Link>
            <Link to="/taoyot" className="inline-flex items-center gap-2 h-14 px-7 rounded-full font-bold text-sm text-primary-foreground/85 hover:text-primary-foreground transition">
              <Flame size={16} className="text-accent" /> הטעויות היקרות ביותר <ArrowLeft size={14} />
            </Link>
          </div>

          {/* live stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { k: "₪", v: 300_000, l: "פוטנציאל אובדן בפנסיה", suffix: "" },
              { k: "%", v: 72, l: "מהמשפחות בלי קרן חירום", suffix: "%" },
              { k: "₪", v: 184_000, l: "עלות 5 שנות משכנתא", suffix: "" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                <div className="text-xl md:text-2xl font-black bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
                  {s.k === "₪" && "₪"}<Counter value={s.v} suffix={s.suffix} />
                </div>
                <div className="text-[11px] text-primary-foreground/70 mt-1 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="relative border-y border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
        <div className="flex whitespace-nowrap py-4 animate-[ticker_45s_linear_infinite]">
          {[...tickerItems, ...tickerItems].map((it, i) => (
            <div key={i} className="flex items-center gap-3 px-8 text-sm text-primary-foreground/85">
              <it.icon size={16} className="text-accent shrink-0" />
              <span>{it.t}</span>
              <span className="text-primary-foreground/30">·</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

/* ============================================================
   2. SELF-DIAGNOSIS
   ============================================================ */
function SelfDiagnosis() {
  const cards = [
    { icon: HeartPulse, t: "אני רוצה סדר כלכלי", d: "תזרים, חובות, קרן חירום, יעדים", to: "/tichnun-piansi", glow: "240" },
    { icon: Building2, t: "אני חושב על משכנתא", d: "החזר, מסלולים, מיחזור", to: "/mashkantaot", glow: "165" },
    { icon: TrendingDown, t: "אני רוצה להשקיע", d: "מדדים, קרנות סל, תיק מנוהל", to: "/shuk-hahon", glow: "240" },
    { icon: Compass, t: "אני בודק נדל״ן", d: "תזרים, תשואה, מימון, מיסוי", to: "/nadlan", glow: "165" },
    { icon: Crown, t: "אני רוצה לפרוש חכם", d: "פנסיה, גמל, חיסכון לטווח ארוך", to: "/calculators/pension", glow: "240" },
    { icon: Target, t: "אני רוצה לבנות הון", d: "ריבית דריבית, הרגלי חיסכון", to: "/calculators/monthly", glow: "165" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Self diagnosis</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">איפה אתם נמצאים היום?</h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">בחר את הצומת שמתאר אותך עכשיו — נבנה לך מסלול ממוקד.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Link key={i} to={c.to} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: `oklch(0.62 0.13 ${c.glow} / 0.4)` }} />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-accent-foreground transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                  <c.icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-black text-foreground">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  המשך מסלול <ArrowLeft size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. VALUE SHOCK
   ============================================================ */
function ValueShock() {
  const items = [
    { icon: Wallet, t: "כסף שיושב בעו״ש", v: 27_000, sub: "שחיקה של ₪150K ב-7 שנים בגלל אינפלציה", to: "/calculators/family" },
    { icon: Percent, t: "דמי ניהול", v: 300_000, sub: "0.5% נוספים ימחקו לכם רבע מהפנסיה", to: "/calculators/fees" },
    { icon: Building2, t: "משכנתא יקרה", v: 184_000, sub: "5 שנים מיותרות = ריבית מצטברת ענקית", to: "/calculators/mortgage" },
    { icon: Activity, t: "אינפלציה שקטה", v: 65_000, sub: "מסלול שמרני בילד קטן מול מנייתי", to: "/calculators/child" },
    { icon: AlertTriangle, t: "החלטות רגשיות", v: 90_000, sub: "מכירה בפאניקה אחרי ירידות חדות", to: "/taoyot" },
  ];
  return (
    <section className="relative py-20 md:py-28 overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Hidden leaks</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
            הכסף בורח גם בלי שמרגישים
          </h2>
          <p className="mt-3 text-base md:text-lg text-primary-foreground/75">
            חמש דליפות שגונבות לכם הון בשקט — בלי שום אזהרה ובלי שמישהו יגיד לכם.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Link key={i} to={it.to} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
              <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: "oklch(0.7 0.14 165 / 0.3)" }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-accent">
                    <it.icon size={22} />
                  </div>
                  <ArrowUpRight size={18} className="text-primary-foreground/50 group-hover:text-accent group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-all" />
                </div>
                <div className="mt-6 text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
                  ₪<Counter value={it.v} />
                </div>
                <h3 className="mt-3 text-lg font-bold">{it.t}</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/65 leading-relaxed">{it.sub}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                  בדוק את שלך <ArrowLeft size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. SMART CALCULATORS — live preview cards
   ============================================================ */
function MiniSparkline({ rising = true }: { rising?: boolean }) {
  const path = rising
    ? "M0,40 C20,38 30,20 50,18 C70,16 85,28 110,18 C140,8 160,12 180,4"
    : "M0,10 C25,12 45,30 70,28 C95,26 115,38 140,40 C160,42 175,38 180,36";
  return (
    <svg viewBox="0 0 180 50" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={rising ? "oklch(0.7 0.14 165)" : "oklch(0.62 0.21 25)"} stopOpacity="0.4" />
          <stop offset="100%" stopColor={rising ? "oklch(0.7 0.14 165)" : "oklch(0.62 0.21 25)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L180,50 L0,50 Z`} fill="url(#spk)" />
      <path d={path} fill="none" stroke={rising ? "oklch(0.61 0.13 165)" : "oklch(0.62 0.21 25)"} strokeWidth="2" />
    </svg>
  );
}

function LiveValue({ from, to, prefix = "₪", duration = 2200 }: { from: number; to: number; prefix?: string; duration?: number }) {
  const [v, setV] = useState(from);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);
  return <span className="tabular-nums">{prefix}{Math.round(v).toLocaleString("he-IL")}</span>;
}

function SmartCalculators() {
  const cards = [
    { to: "/calculators/mortgage", icon: Calculator, t: "מחשבון משכנתא", v: 6_780, label: "החזר חודשי משוער", from: 5400, rising: false, hint: "1.2M ₪ · 25 שנה · 5%" },
    { to: "/calculators/monthly", icon: TrendingDown, t: "השקעה חודשית", v: 526_000, label: "שווי עתידי ב-25 שנה", from: 200_000, rising: true, hint: "1,000₪ לחודש · 7%" },
    { to: "/calculators/compound", icon: PiggyBank, t: "ריבית דריבית", v: 174_000, label: "פער דמי ניהול 0.6% מול 1%", from: 50_000, rising: true, hint: "100K ₪ · 25 שנה" },
    { to: "/calculators/family", icon: HeartPulse, t: "מצב משפחתי", v: 4_200, label: "עודף חודשי לדוגמה", from: -1500, rising: true, hint: "הכנסות, הוצאות, נטו" },
    { to: "/calculators/realestate", icon: Building2, t: "תזרים נדל״ן", v: 320, label: "תזרים חודשי נטו", from: -800, rising: true, hint: "1.5M · 30% הון · שכ״ד 5,500" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Smart calculators</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">דשבורד פיננסי במקום טופס משעמם</h2>
            <p className="mt-3 text-muted-foreground">מחשבונים חיים שמראים מספרים אמיתיים על המצב שלך — בלחיצה אחת.</p>
          </div>
          <Link to="/calculators" className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-sm font-bold border border-border bg-white hover:bg-secondary transition">
            לכל המחשבונים <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Link key={i} to={c.to} className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              {/* preview top */}
              <div className="relative h-32 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
                <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
                <div className="relative h-full flex items-end">
                  <MiniSparkline rising={c.rising} />
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-accent">
                  <c.icon size={18} />
                </div>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-accent/90 text-accent-foreground">
                  <Zap size={10} /> Live
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black">{c.t}</h3>
                <div className="mt-4 text-3xl font-black tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                  <LiveValue from={c.from} to={c.v} prefix={c.t.includes("השקעה") || c.t.includes("ריבית") || c.t.includes("משפחתי") ? "₪" : "₪"} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{c.label}</div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{c.hint}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:gap-2 transition-all">
                    הפעל <ArrowLeft size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. MISTAKES CAROUSEL
   ============================================================ */
function MistakesCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = [
    { tag: "מסחר", t: "טעויות במסחר עצמאי", d: "כניסות בפאניקה, יציאות בשיא, חוסר תיק מאוזן.", to: "/taoyot" },
    { tag: "משכנתא", t: "טעויות במשכנתא", d: "תמהיל לא מתאים, בחירת ריבית לא נכונה, חוסר השוואה.", to: "/taoyot" },
    { tag: "דמי ניהול", t: "טעויות בדמי ניהול", d: "0.5% נוספים = רבע מהפנסיה. לרוב לא בודקים.", to: "/calculators/fees" },
    { tag: "נדל״ן", t: "טעויות בנדל״ן", d: "תזרים שלילי שלא נראה, מינוף יתר, מס שבח.", to: "/nadlan" },
    { tag: "משפחה", t: "טעויות למשפחות", d: "אין קרן חירום, יתרת אוברדראפט קבועה, ביטוחים כפולים.", to: "/tichnun-piansi" },
    { tag: "פנסיה", t: "טעויות בפנסיה", d: "מסלול לא תואם גיל, דמי ניהול גבוהים, חוסר התאמה.", to: "/calculators/pension" },
  ];
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };
  return (
    <section className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Costly mistakes</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">מה שאף אחד לא מסביר לכם</h2>
            <p className="mt-3 text-muted-foreground">הטעויות שעולות הכי הרבה — ואיך לזהות אותן בזמן.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(1)} className="w-12 h-12 rounded-full border border-border bg-white hover:bg-secondary transition flex items-center justify-center" aria-label="הקודם">
              <ChevronRight size={18} />
            </button>
            <button onClick={() => scroll(-1)} className="w-12 h-12 rounded-full border border-border bg-white hover:bg-secondary transition flex items-center justify-center" aria-label="הבא">
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
        <div ref={ref} className="mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
          {items.map((it, i) => (
            <Link key={i} to={it.to} className="snap-start shrink-0 w-[300px] md:w-[360px] group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-2"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: "var(--gradient-gold)" }} />
              <div className="relative">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-destructive/20 text-destructive bg-destructive/5">
                  <AlertTriangle size={10} /> {it.tag}
                </span>
                <h3 className="mt-5 text-2xl font-black leading-tight">{it.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  למד את הסיבה <ArrowLeft size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. LIFE PATHS
   ============================================================ */
function LifePaths() {
  const paths = [
    { icon: Users, t: "זוג צעיר", d: "לפני משכנתא, אחרי חתונה, איך מתחילים נכון.", to: "/start" },
    { icon: HeartPulse, t: "משפחה", d: "תזרים, קרן חירום, חינוך וביטוחים.", to: "/tichnun-piansi" },
    { icon: Briefcase, t: "עצמאי", d: "פנסיה לעצמאים, מע״מ, הוצאות מוכרות.", to: "/start" },
    { icon: TrendingDown, t: "משקיע מתחיל", d: "מדדים, קרנות סל, ניהול סיכון בסיסי.", to: "/shuk-hahon" },
    { icon: Crown, t: "לקראת פרישה", d: "צבירה, פערים, החלטות ב-10 שנים האחרונות.", to: "/calculators/pension" },
    { icon: Baby, t: "הורים לילדים", d: "חיסכון לכל ילד, מסלול נכון, פטור ממס.", to: "/calculators/child" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">Life paths</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">בחר את המסלול שלך</h2>
          <p className="mt-3 text-muted-foreground">לכל שלב בחיים יש מפה אחרת. בוחרים — ומקבלים את הצעדים הבאים.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paths.map((p, i) => (
            <Link key={i} to={p.to} className="group relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, oklch(0.92 0.005 240), oklch(0.92 0.005 240))" }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, oklch(0.62 0.13 240), oklch(0.61 0.13 165))" }} />
              <div className="relative rounded-3xl bg-card p-7 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-foreground"
                    style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-soft)" }}>
                    <p.icon size={22} />
                  </div>
                  <h3 className="text-xl font-black">{p.t}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  פתח מסלול <ArrowLeft size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. AUTHORITY / SOCIAL PROOF
   ============================================================ */
function Authority() {
  const blocks = [
    {
      title: "מה אנשים חכמים בודקים השבוע",
      icon: Brain,
      items: ["דמי ניהול בקרן הפנסיה", "מסלול השקעה לילד", "תמהיל משכנתא בעת ריבית גבוהה", "פיזור תיק לטווח ארוך"],
    },
    {
      title: "מחשבון השבוע",
      icon: Sparkles,
      items: ["דמי ניהול: ההפרש האמיתי", "השקעה חודשית: גם 500₪ עובדים", "ריבית דריבית: לאן זה הולך", "תזרים נדל״ן: האם משתלם"],
      cta: { to: "/calculators/fees", label: "פתח עכשיו" },
    },
    {
      title: "נושאים חמים",
      icon: Flame,
      items: ["איחוד הלוואות", "מיחזור משכנתא 2026", "פנסיה לעצמאים", "תיק השקעות פסיבי"],
    },
    {
      title: "החלטות נפוצות",
      icon: ShieldCheck,
      items: ["להעביר לקרן זולה יותר", "לפזר על מספר אפיקים", "לסגור אוברדראפט לפני להשקיע", "קרן חירום של 3-6 חודשים"],
    },
  ];
  return (
    <section className="relative py-20 md:py-28 overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Authority</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">מה קורה השבוע במפה</h2>
          <p className="mt-3 text-primary-foreground/70">תמיד יש מה לבדוק. תמיד יש מה לשפר.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((b, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 text-accent flex items-center justify-center">
                  <b.icon size={18} />
                </div>
                <h3 className="font-bold text-base">{b.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-primary-foreground/85">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {b.cta && (
                <Link to={b.cta.to} className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:gap-3 transition-all">
                  {b.cta.label} <ArrowLeft size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="relative mt-16 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
          <div className="relative">
            <h3 className="text-2xl md:text-4xl font-black">מוכנים לראות איפה אתם על המפה?</h3>
            <p className="mt-3 text-primary-foreground/75 max-w-xl mx-auto">6 שאלות. תוצאה מותאמת. בלי הרשמה. בלי התחייבות.</p>
            <Link to="/start" className="mt-7 inline-flex items-center gap-2 h-14 px-8 rounded-full font-bold text-base text-accent-foreground hover:scale-[1.03] transition-all"
              style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
              <Sparkles size={18} /> התחל אבחון <ArrowLeft size={16} />
            </Link>
            <p className="mt-4 text-[11px] text-primary-foreground/50">המידע באתר הוא כללי וחינוכי בלבד ואינו מהווה ייעוץ אישי.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <SelfDiagnosis />
      <ValueShock />
      <SmartCalculators />
      <MistakesCarousel />
      <LifePaths />
      <Authority />
    </PageLayout>
  );
}
