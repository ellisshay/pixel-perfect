import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { stages, mistakes, referrals } from "@/data/content";
import { LineChart, Building2, Wallet, Calculator, TrendingUp, PiggyBank, HeartPulse, ArrowLeft, ShieldCheck, Sprout, Rocket, Crown, Compass } from "lucide-react";
import heroImage from "@/assets/hero-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "המפה הפיננסית של ישראל | ידע, כלים ומפת דרך לבניית הון" },
    { name: "description", content: "ידע ברור, כלים חכמים ומפת דרך לבניית הון לאורך החיים. מחשבונים, מדריכים, טעויות נפוצות והפניות לאנשי מקצוע מוסמכים." },
  ] }),
  component: Index,
});

const cubes = [
  { to: "/shuk-hahon" as const, icon: LineChart, title: "שוק ההון והכפלת הון", desc: "ללמוד השקעות, ריבית דריבית, דמי ניהול, מסחר עצמאי, תיקי השקעות ונכסים פיננסיים." },
  { to: "/nadlan" as const, icon: Building2, title: "נדל״ן בארץ ובחו״ל", desc: "להבין מינוף, תשואה, עליית ערך, נדל״ן להשקעה, בדיקות חובה וסיכונים." },
  { to: "/tichnun-piansi" as const, icon: Wallet, title: "תכנון פיננסי אישי ומשפחתי", desc: "לעשות סדר בהכנסות, הוצאות, חובות, משכנתא, חיסכון לילדים, פנסיה וחופש פיננסי." },
];

const calcs = [
  { to: "/calculators/family" as const, icon: HeartPulse, t: "מחשבון מצב פיננסי משפחתי" },
  { to: "/calculators/mortgage" as const, icon: Calculator, t: "מחשבון משכנתא" },
  { to: "/calculators/invest" as const, icon: TrendingUp, t: "מחשבון השקעות" },
  { to: "/calculators/compound" as const, icon: PiggyBank, t: "ריבית דריבית עם דמי ניהול" },
];

const stageIcons = [Compass, ShieldCheck, Sprout, Rocket, Crown];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-mesh)" }} />
          <img src={heroImage} alt="" aria-hidden width={1536} height={1024}
            className="absolute inset-0 -z-10 w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-primary-foreground animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 bg-white/10 backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                מערכת ניווט פיננסית · ישראל
              </span>
              <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                המפה הפיננסית
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
                  של ישראל
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-xl leading-relaxed">
                ידע ברור, כלים חכמים ומפת דרך לבניית הון לאורך החיים.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/start" className="inline-flex items-center justify-center h-14 px-8 rounded-full font-bold text-base text-accent-foreground hover:scale-[1.02] transition-all" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                  התחל כאן ←
                </Link>
                <Link to="/calculators" className="inline-flex items-center justify-center h-14 px-7 rounded-full font-bold text-base text-primary-foreground border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-all">
                  פתח מחשבון
                </Link>
                <Link to="/taoyot" className="inline-flex items-center justify-center h-14 px-7 rounded-full font-bold text-base text-primary-foreground border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-all">
                  קרא טעויות נפוצות
                </Link>
              </div>
              <p className="mt-8 text-xs text-primary-foreground/70 max-w-lg leading-relaxed">
                המידע באתר הוא כללי וחינוכי בלבד ואינו מהווה ייעוץ השקעות, ייעוץ פיננסי אישי, ייעוץ מס או התחייבות לתשואה.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-5 animate-float">
              <div className="relative aspect-square rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8" style={{ boxShadow: "var(--shadow-glow)" }}>
                <div className="text-primary-foreground/70 text-sm font-medium">המפה שלך</div>
                <div className="mt-2 text-primary-foreground text-2xl font-bold">איפה אתם עומדים?</div>
                <div className="mt-6 space-y-3">
                  {stages.map((s, i) => {
                    const Icon = stageIcons[i];
                    return (
                      <div key={s.n} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                          <Icon size={16} />
                        </div>
                        <div className="text-primary-foreground">
                          <div className="font-bold text-sm">{s.n}. {s.title}</div>
                          <div className="text-xs text-primary-foreground/70 line-clamp-1">{s.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CUBES */}
        <Section>
          <SectionHeader eyebrow="שלושת המסלולים המרכזיים" title="לאן רוצים להתקדם?" sub="המפה מחולקת לשלושה תחומי ליבה. בחרו נקודת מוצא ונבנה ביחד את המסלול." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {cubes.map((c) => (
              <Link key={c.to} to={c.to} className="group relative p-8 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-hero)" }}>
                  <c.icon size={26} />
                </div>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  כניסה לתחום <ArrowLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* CALCULATORS */}
        <Section className="bg-secondary/40">
          <SectionHeader eyebrow="כלים אינטראקטיביים" title="המספרים שלכם, ברורים בדקה" sub="ארבעה מחשבונים שיתנו לכם תמונת מצב מיידית – בלי הרשמה ובלי התחייבות." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {calcs.map((c) => (
              <Link key={c.to} to={c.to} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                  <c.icon size={22} />
                </div>
                <h3 className="mt-4 font-bold">{c.t}</h3>
                <div className="mt-4 text-xs font-bold text-primary inline-flex items-center gap-1">פתח מחשבון <ArrowLeft size={14} /></div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">לכל המחשבונים <ArrowLeft size={16} /></Link>
          </div>
        </Section>

        {/* MISTAKES */}
        <Section>
          <SectionHeader eyebrow="טעויות פיננסיות" title="טעות אחת – שנים של נזק" sub="אנחנו מאמינים ש'מה לא לעשות' חשוב לא פחות מ'מה כן'. אלו הטעויות הנפוצות ביותר." />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mistakes.map((m) => (
              <Link key={m.slug} to="/taoyot/$slug" params={{ slug: m.slug }} className="group p-7 rounded-2xl border border-border bg-card hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <span className="text-[11px] font-bold tracking-widest text-primary uppercase">{m.category}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug">{m.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{m.intro}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">קרא עוד <ArrowLeft size={14} /></div>
              </Link>
            ))}
          </div>
        </Section>

        {/* METHODOLOGY */}
        <Section className="bg-secondary/40" id="methodology">
          <SectionHeader eyebrow="המתודולוגיה" title="5 השלבים של המפה" sub="לא פועלים בלי מפה. קודם מבינים, אחר כך בונים הון." />
          <div className="mt-14 grid md:grid-cols-5 gap-4">
            {stages.map((s, i) => {
              const Icon = stageIcons[i];
              return (
                <div key={s.n} className="relative p-6 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
                  <div className="absolute -top-3 right-6 w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground font-black text-sm" style={{ background: "var(--gradient-hero)" }}>{s.n}</div>
                  <Icon className="text-primary mt-2" size={26} />
                  <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* REFERRALS */}
        <Section>
          <SectionHeader eyebrow="הפניות מקצועיות" title="כשצריך איש מקצוע, המפה עוזרת להבין למי נכון לפנות" />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(referrals).map(([cat, items]) => (
              <div key={cat} className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                <h3 className="font-bold text-base mb-3">{cat}</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {items.map((i) => <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">·</span>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/shitufim" className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-bold text-sm text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>השארת פרטים להפניה ←</Link>
          </div>
          <div className="mt-12"><Disclaimer /></div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
