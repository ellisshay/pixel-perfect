import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section, SectionHeader, Disclaimer } from "@/components/layout/Section";
import { BrightHero } from "@/components/sections/BrightHero";
import { Counter } from "@/components/premium/Counter";
import { WidgetsRow } from "@/components/premium/Widgets";
import { Carousel, CarouselCard } from "@/components/premium/Carousel";
import { WarningBlock } from "@/components/premium/WarningBlock";
import { FlowNext } from "@/components/premium/FlowNext";
import { LiveMortgage } from "@/components/premium/LiveMortgage";
import { mistakes } from "@/data/content";
import { ArrowLeft, Calculator, TrendingUp, AlertTriangle, Building2, PiggyBank, LineChart, Wallet, HeartPulse, Sparkles, Compass, Users, Briefcase, Crown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "המפה הפיננסית | מתחילים לבנות חיסכון וצמיחה פיננסית" },
    { name: "description", content: "המפה הפיננסית עוזרת לך להבין איך להתחיל לחסוך, להשקיע ולבנות צמיחה פיננסית גם מסכומים קטנים, דרך שוק ההון, נדל״ן, עסקים וכלים פיננסיים פשוטים." },
    { property: "og:title", content: "המפה הפיננסית | מתחילים לבנות חיסכון וצמיחה פיננסית" },
    { property: "og:description", content: "ידע, כלים והכוונה פיננסית — לבנות הרגל חיסכון ומסלול צמיחה גם מ-100 ש״ח בחודש." },
  ] }),
  component: Index,
});

const costCards = [
  { icon: PiggyBank, t: "0.5% דמי ניהול", v: 300_000, sub: "פחות בפנסיה לאורך הקריירה" },
  { icon: Calculator, t: "5 שנים נוספות במשכנתא", v: 184_000, sub: "תוספת ריבית מצטברת" },
  { icon: TrendingUp, t: "אינפלציה 3% על עו״ש", v: 27_000, sub: "שחיקה של ₪150K ב-7 שנים" },
  { icon: LineChart, t: "מסלול שמרני בילד קטן", v: 65_000, sub: "ההפרש מול מסלול מנייתי" },
  { icon: Building2, t: "בדיקת נכס לקויה", v: 90_000, sub: "תיקונים ועלויות סמויות" },
];

const lifePaths = [
  { icon: Users, t: "זוג צעיר", d: "לבנות בסיס: כרית ביטחון, פנסיה נכונה, התחלת השקעות.", to: "/start" },
  { icon: HeartPulse, t: "משפחה", d: "תזרים, ביטוחים, חיסכון לילדים, משכנתא חכמה.", to: "/calculators/family" },
  { icon: Briefcase, t: "עצמאי", d: "סדר כספי, הפרשות פנסיה, תכנון מס וצמיחה.", to: "/tichnun-piansi" },
  { icon: TrendingUp, t: "משקיע מתחיל", d: "ריבית דריבית, פיזור, דמי ניהול, IRA.", to: "/shuk-hahon" },
  { icon: Crown, t: "לקראת פרישה", d: "אופק, נזילות, משיכה אופטימלית, מסים.", to: "/tichnun-piansi" },
];

const trending = [
  { t: "IRA — ניהול עצמי של פנסיה", to: "/blog" },
  { t: "מיחזור משכנתא ב-2026", to: "/mashkantaot" },
  { t: "דמי ניהול בקופ״ג", to: "/shuk-hahon" },
  { t: "תזרים השקעת נדל״ן", to: "/nadlan" },
  { t: "ריבית דריבית — הכוח האמיתי", to: "/calculators/compound" },
];

function Index() {
  return (
    <PageLayout>
      <BrightHero />

      {/* WIDGETS */}
      <Section className="-mt-10 relative z-10">
        <WidgetsRow />
      </Section>

      {/* CAROUSEL 1 — מה זה עולה לך */}
      <Section>
        <Carousel eyebrow="כמה זה עולה לך" title="הטעויות הכי יקרות בכסף שלכם" sub="מספרים להמחשה — להבין את גודל ההשפעה. בודקים תמיד את המקרה האישי.">
          {costCards.map((c) => (
            <CarouselCard key={c.t}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                  <c.icon size={20} />
                </span>
                <div className="mt-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">{c.t}</div>
                <div className="mt-1 text-3xl font-black tabular-nums bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                  <Counter value={c.v} prefix="₪" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.sub}</p>
                <Link to="/calculators" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all">
                  חשב את הנזק שלך <ArrowLeft size={14} />
                </Link>
              </div>
            </CarouselCard>
          ))}
        </Carousel>
      </Section>

      {/* LIVE CALC */}
      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="חוויה אינטראקטיבית" title="המספרים מתעדכנים תוך כדי הקלדה" sub="בלי הרשמה, בלי התחייבות. מחשבון מלא בעמוד המחשבונים." />
        <div className="mt-10"><LiveMortgage /></div>
      </Section>

      {/* WARNINGS */}
      <Section>
        <SectionHeader eyebrow="לפני שמתקדמים" title="מה שלא מספרים לכם" />
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <WarningBlock title="העלות השקטה של דמי ניהול" ctaTo="/calculators/compound" ctaLabel="חשב כמה זה אוכל לך">
            הפרש קטן בדמי ניהול נראה זניח — ולאורך 30 שנה הוא שווה דירה. רוב האנשים לא בודקים את זה אף פעם.
          </WarningBlock>
          <WarningBlock title="המשכנתא לא מסתיימת בהחזר החודשי" ctaTo="/mashkantaot" ctaLabel="קרא 5 טעויות משכנתא">
            תמהיל לקוי, פריסה ארוכה מדי או יחס החזר על הסף — כל אחד מהם יכול לעלות מאות אלפי שקלים.
          </WarningBlock>
          <WarningBlock title="כסף בעו״ש = הפסד יומי" ctaTo="/calculators/invest" ctaLabel="חשב מה אתה מפסיד">
            האינפלציה שוחקת מזומן בכל חודש. אם הכסף לא עובד — הוא הולך אחורה.
          </WarningBlock>
          <WarningBlock title="תשואת נדל״ן גבוהה לרוב מסתירה סיכון" ctaTo="/nadlan" ctaLabel="קרא את הטעויות בנדל״ן">
            10% תשואה באזור בעייתי = דייר חסר, תקופות ריקות והוצאות סמויות. לפני קונים — בודקים לעומק.
          </WarningBlock>
        </div>
      </Section>

      {/* CAROUSEL 2 — מסלולי חיים */}
      <Section className="bg-secondary/40">
        <Carousel eyebrow="מסלולי חיים" title="איפה אתם נמצאים — שם נתחיל" sub="כל שלב בחיים דורש החלטות פיננסיות אחרות. בחרו מסלול ובואו נבנה מפת דרך.">
          {lifePaths.map((p) => (
            <CarouselCard key={p.t}>
              <Link to={p.to} className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                  <p.icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-bold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">פתח מפת דרך <ArrowLeft size={14} /></div>
              </Link>
            </CarouselCard>
          ))}
        </Carousel>
      </Section>

      {/* CAROUSEL 3 — מה אנשים בודקים השבוע */}
      <Section>
        <Carousel eyebrow="מה אנשים חכמים בודקים השבוע" title="הנושאים החמים על המפה" sub="טרנדים בקרב משתמשים שעושים עכשיו סדר פיננסי.">
          {trending.map((t, i) => (
            <CarouselCard key={t.t} width="w-[260px]">
              <Link to={t.to} className="group block h-full rounded-2xl p-6 text-primary-foreground hover:-translate-y-1 transition-all relative overflow-hidden"
                style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
                <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
                <div className="relative">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-accent uppercase">
                    <Sparkles size={12} /> #{i + 1} השבוע
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{t.t}</h3>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-3 transition-all">
                    בדוק עכשיו <ArrowLeft size={14} />
                  </div>
                </div>
              </Link>
            </CarouselCard>
          ))}
        </Carousel>
      </Section>

      {/* CAROUSEL 4 — טעויות יקרות */}
      <Section className="bg-secondary/40">
        <Carousel eyebrow="טעויות נפוצות" title="טעות אחת — שנים של נזק" sub="קרא, זהה את עצמך, ותקן לפני שזה עולה לך כסף.">
          {mistakes.map((m) => (
            <CarouselCard key={m.slug}>
              <Link to="/taoyot/$slug" params={{ slug: m.slug }}
                className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-destructive/40 hover:-translate-y-1 transition-all"
                style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                    <AlertTriangle size={16} />
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{m.category}</span>
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug line-clamp-2">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{m.intro}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  בדוק אם גם אתה עושה את זה <ArrowLeft size={14} />
                </div>
              </Link>
            </CarouselCard>
          ))}
        </Carousel>
      </Section>

      {/* DOMAINS */}
      <Section>
        <SectionHeader eyebrow="שלושת המסלולים המרכזיים" title="לאן רוצים להתקדם?" />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { to: "/shuk-hahon", icon: LineChart, t: "שוק ההון והכפלת הון", d: "ריבית דריבית, דמי ניהול, מסחר עצמאי, IRA, קרנות סל." },
            { to: "/nadlan", icon: Building2, t: "נדל״ן בארץ ובחו״ל", d: "מינוף, תשואה, תזרים, בדיקות חובה וסיכונים אמיתיים." },
            { to: "/tichnun-piansi", icon: Wallet, t: "תכנון פיננסי משפחתי", d: "תזרים, חובות, חיסכון לילדים, פנסיה וחופש פיננסי." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group relative overflow-hidden p-7 rounded-3xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all"
              style={{ boxShadow: "var(--shadow-soft)" }}>
              <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-hero)" }}>
                <c.icon size={26} />
              </span>
              <h3 className="text-xl font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                כניסה לתחום <ArrowLeft size={16} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FLOW */}
      <FlowNext items={[
        { kind: "calc", to: "/calculators/family", title: "מחשבון מצב פיננסי משפחתי", desc: "תמונת מצב מלאה ב-2 דקות." },
        { kind: "mistake", to: "/taoyot/mashkanta", title: "5 טעויות בתכנון משכנתא", desc: "הטעויות שעולות הכי הרבה." },
        { kind: "guide", to: "/blog", title: "מדריך ריבית דריבית", desc: "הכוח האמיתי של זמן." },
        { kind: "path", to: "/start", title: "איפה אתם על המפה?", desc: "אבחון אישי בן 5 שאלות." },
      ]} />

      <Section className="pt-10">
        <Disclaimer />
      </Section>
    </PageLayout>
  );
}
