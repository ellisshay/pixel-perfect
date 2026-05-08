import { Link } from "@tanstack/react-router";
import { ArrowLeft, Wallet, ShieldCheck, Compass, Sparkles, LineChart, Building2, Briefcase, CheckCircle2 } from "lucide-react";

const habitRows = [
  { amount: 100, fv: 41_000 },
  { amount: 200, fv: 82_000 },
  { amount: 500, fv: 205_000 },
];

const steps = [
  { n: 1, icon: Wallet, t: "כמה כסף פנוי יש לך בחודש?" },
  { n: 2, icon: ShieldCheck, t: "האם יש לך קרן חירום?" },
  { n: 3, icon: Compass, t: "מה מעניין אותך: שוק ההון, נדל״ן או עסקים?" },
  { n: 4, icon: Sparkles, t: "קבל כיוון ראשוני והפניה מתאימה" },
];

const pillars = [
  {
    to: "/shuk-hahon",
    icon: LineChart,
    t: "שוק ההון",
    d: "לומדים איך כסף קטן יכול להפוך להרגל השקעה קבוע, דרך מדדים, תיק מנוהל, מסחר עצמאי וניהול סיכון.",
    tone: "from-[oklch(0.62_0.13_240/0.12)] to-[oklch(0.62_0.13_240/0.04)]",
  },
  {
    to: "/nadlan",
    icon: Building2,
    t: "נדל״ן",
    d: "מבינים את ההבדלים בין מגורים, מסחרי, קרקע חקלאית, נדל״ן בחו״ל ונדל״ן תיירותי.",
    tone: "from-[oklch(0.61_0.13_165/0.14)] to-[oklch(0.61_0.13_165/0.04)]",
  },
  {
    to: "/tichnun-piansi",
    icon: Briefcase,
    t: "עסקים",
    d: "לומדים איך בוחנים השקעה בעסק, שותפות, זכיינות או הלוואה עסקית בלי להיכנס לעסקה בעיניים עצומות.",
    tone: "from-[oklch(0.78_0.12_85/0.18)] to-[oklch(0.78_0.12_85/0.04)]",
  },
];

export function BrightHero() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* light layered background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.99 0.005 240) 0%, oklch(0.97 0.012 220) 60%, oklch(0.96 0.02 165 / 0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(at 15% 10%, oklch(0.62 0.13 240 / 0.18) 0px, transparent 55%), radial-gradient(at 85% 0%, oklch(0.61 0.13 165 / 0.20) 0px, transparent 55%), radial-gradient(at 50% 100%, oklch(0.78 0.12 85 / 0.10) 0px, transparent 55%)",
          }}
        />
        {/* subtle map-grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V56" fill="none" stroke="oklch(0.24 0.045 252)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>

        <div className="relative container mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          {/* Right column (start in RTL) — copy + CTAs */}
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-primary/15 bg-white/70 backdrop-blur text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              המפה הפיננסית · ידע, כלים והכוונה
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-primary">
              הכסף שלך צריך כיוון,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, oklch(0.24 0.045 252), oklch(0.61 0.13 165))" }}
              >
                לא עוד הבטחות
              </span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed">
              המפה הפיננסית עוזרת לך להבין איך לחסוך, להשקיע, לבדוק סיכונים ולבנות מסלול צמיחה אישי, גם אם אתה מתחיל מ-100 ש״ח בחודש.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 items-center">
              <Link
                to="/start"
                className="inline-flex items-center justify-center h-[3.25rem] px-7 rounded-full font-bold text-accent-foreground hover:scale-[1.02] transition-all"
                style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
              >
                בדוק מאיפה להתחיל
              </Link>
              <Link
                to="/shuk-hahon"
                className="inline-flex items-center justify-center h-[3.25rem] px-6 rounded-full font-bold text-primary border border-primary/20 bg-white hover:bg-primary/5 transition-all"
              >
                למד על מסלולי הצמיחה
              </Link>
              <Link
                to="/calculators"
                className="inline-flex items-center justify-center h-11 px-5 rounded-full text-sm font-semibold text-primary/80 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                פתח מחשבון פיננסי ←
              </Link>
            </div>

            {/* trust strip */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
              {["תוכן חינוכי בלבד", "ללא מכירה ישירה", "ללא הבטחות תשואה", "שקיפות מלאה"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Left column — diagnostic card */}
          <div className="lg:col-span-5 animate-fade-up">
            <div
              className="relative rounded-3xl border border-primary/10 bg-white/85 backdrop-blur-xl p-6 md:p-7"
              style={{ boxShadow: "0 30px 60px -25px oklch(0.24 0.045 252 / 0.25)" }}
            >
              <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-accent-foreground"
                style={{ background: "var(--gradient-gold)" }}>
                <Sparkles size={12} /> אבחון אישי
              </div>
              <h2 className="mt-2 text-xl md:text-2xl font-black text-primary">מפת הצמיחה האישית שלך</h2>
              <p className="mt-1 text-sm text-foreground/70">4 שאלות קצרות. כיוון ראשוני בלי התחייבות.</p>

              <ol className="mt-5 space-y-3">
                {steps.map((s) => (
                  <li
                    key={s.n}
                    className="flex items-start gap-3 p-3 rounded-2xl border border-primary/10 bg-gradient-to-l from-secondary/60 to-white"
                  >
                    <span
                      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground font-black"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                        <s.icon size={12} /> שלב {s.n}
                      </div>
                      <div className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{s.t}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                to="/start"
                className="mt-5 w-full inline-flex items-center justify-center h-12 rounded-full text-sm font-bold text-primary-foreground hover:scale-[1.01] transition"
                style={{ background: "var(--gradient-hero)" }}
              >
                התחל אבחון קצר <ArrowLeft size={14} className="me-1" />
              </Link>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed text-center">
                המידע באתר חינוכי וכללי בלבד. אינו ייעוץ אישי, אינו המלצה, ואינו תחליף לבעל מקצוע מורשה.
              </p>
            </div>

            {/* Habit savings simulation card */}
            <div className="mt-5 rounded-3xl border border-primary/10 bg-white p-5"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-primary">כמה כסף יכול להיבנות מהרגל חודשי קטן?</h3>
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">דוגמה</span>
              </div>
              <div className="mt-3 space-y-2">
                {habitRows.map((r) => (
                  <div key={r.amount} className="flex items-center justify-between text-sm rounded-xl bg-secondary/50 px-3 py-2">
                    <span className="font-semibold text-foreground">{r.amount} ש״ח בחודש</span>
                    <span className="text-xs text-muted-foreground">לאורך 20 שנה ←</span>
                    <span className="font-black tabular-nums text-primary">~{r.fv.toLocaleString("he-IL")} ₪</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                סימולציה חינוכית בלבד, לא המלצה ולא תחזית. ההנחה: תשואה שנתית נטו של 5% להמחשה. תוצאות בפועל תלויות בשוק, מסים, עמלות ועוד.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillar cards */}
      <section className="relative">
        <div className="container mx-auto px-6 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <Link
                key={p.t}
                to={p.to}
                className={`group relative overflow-hidden p-7 rounded-3xl border border-primary/10 bg-gradient-to-br ${p.tone} bg-white hover:-translate-y-1 hover:border-primary/25 transition-all`}
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <p.icon size={22} />
                </span>
                <h2 className="text-xl font-black text-primary">{p.t}</h2>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.d}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-3 transition-all">
                  למד עוד <ArrowLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust block */}
      <section className="container mx-auto px-6 mt-14">
        <div className="rounded-3xl border border-primary/10 bg-white p-7 md:p-9 text-center max-w-4xl mx-auto"
          style={{ boxShadow: "var(--shadow-soft)" }}>
          <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
            לא ייעוץ. לא קסמים. לא הבטחות. קודם כל הבנה.
          </h2>
          <p className="mt-3 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            המידע באתר הוא חינוכי וכללי בלבד. המטרה היא לעזור לך להבין מושגים, לבדוק אפשרויות,
            לשאול שאלות נכונות ולהגיע מוכן יותר לבעל מקצוע מתאים.
          </p>
        </div>
      </section>
    </>
  );
}
