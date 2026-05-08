import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/layout/Section";
import { PartnersForm } from "@/components/sections/PartnersForm";
import {
  Home, LineChart, ShieldCheck, PiggyBank, Calculator, Scale,
  TrendingUp, Building2, Briefcase, CreditCard, CheckCircle2, Sparkles,
} from "lucide-react";

const AUDIENCE = [
  { icon: Home, title: "יועצי משכנתאות", desc: "ליווי לקוחות מול הבנקים, מחזור והתאמה." },
  { icon: Calculator, title: "מתכננים פיננסיים", desc: "תכנון הוליסטי, תקציב, חיסכון והשקעות." },
  { icon: ShieldCheck, title: "סוכני ביטוח", desc: "חיים, בריאות, אובדן כושר עבודה ועוד." },
  { icon: PiggyBank, title: "יועצי פנסיה ופרישה", desc: "אופטימיזציית מסלולים והכנה לפרישה." },
  { icon: Scale, title: "רואי חשבון ויועצי מס", desc: "מיסוי יחידים, עצמאים וחברות." },
  { icon: Briefcase, title: "עו״ד צוואות וירושות", desc: "תכנון העברה בין-דורית והגנה משפטית." },
  { icon: TrendingUp, title: "יועצי השקעות", desc: "תיקי השקעות, IRA, גמל להשקעה." },
  { icon: Building2, title: "משווקי נדל״ן", desc: "פרויקטים בארץ ובחו״ל, השקעה ומגורים." },
  { icon: LineChart, title: "יועצים עסקיים", desc: "צמיחה, תזרים, תמחור ומימון לעסקים." },
  { icon: CreditCard, title: "חברות אשראי והלוואות", desc: "פתרונות מימון לצרכנים ולעסקים." },
];

const FLOW = [
  { n: "01", title: "הגולש מגיע", desc: "דרך תוכן, מחשבון או שאלון פיננסי באתר." },
  { n: "02", title: "הגדרת צורך", desc: "ממלא פרטים ומגדיר את הצורך הפיננסי שלו." },
  { n: "03", title: "סיווג חכם", desc: "המערכת מסווגת לפי תחום, אזור ורמת דחיפות." },
  { n: "04", title: "ניתוב לשותף", desc: "ההפניה עוברת לאיש המקצוע המתאים ביותר." },
  { n: "05", title: "טיפול ודיווח", desc: "השותף מטפל בלקוח ומדווח סטטוס." },
  { n: "06", title: "תמורה הוגנת", desc: "האתר מתוגמל לפי המודל שנקבע מראש." },
];

const MODELS = [
  { title: "תשלום לפי ליד", price: "Pay-per-Lead", desc: "תמחור פר-פנייה איכותית, ללא התחייבות חודשית.", points: ["שקיפות מלאה", "פילוח לפי תחום ואזור", "ביטול בכל עת"] },
  { title: "עמלת הצלחה", price: "Success Fee", desc: "תשלום רק כאשר נסגרת עסקה אמיתית.", points: ["סיכון נמוך לשותף", "תמריץ הדדי", "מתאים לעסקאות גדולות"], featured: true },
  { title: "חבילת חשיפה חודשית", price: "Brand Package", desc: "נוכחות מודגשת באתר, תוכן ייעודי וקמפיינים.", points: ["מיתוג מקצועי", "פרסום בכתבות ומדריכים", "מוניטין ארוך טווח"] },
];

const REASONS = [
  "פניות ממוקדות מאנשים עם צורך פיננסי אמיתי.",
  "נוכחות מקצועית באתר תוכן פיננסי איכותי.",
  "לידים מסוננים לפי תחום ואזור גיאוגרפי.",
  "מערכת צומחת — מחשבונים, מדריכים ושאלונים.",
  "שיתופי פעולה בתוכן, וובינרים וקמפיינים.",
  "שקיפות מלאה ומדידה ברורה של ביצועים.",
];

export const Route = createFileRoute("/shitufim")({
  head: () => ({
    meta: [
      { title: "שיתופי פעולה — הצטרפות שותפים | המפה הפיננסית של ישראל" },
      { name: "description", content: "הצטרפו לרשת השותפים של המפה הפיננסית: יועצי משכנתאות, מתכננים פיננסיים, סוכני ביטוח, יועצי פנסיה, רואי חשבון, עו״ד צוואות, יועצי השקעות, משווקי נדל״ן ועוד." },
      { property: "og:title", content: "שיתופי פעולה — הצטרפות שותפים | המפה הפיננסית" },
      { property: "og:description", content: "רשת מומחים פיננסיים בישראל. לידים איכותיים, שלושה מודלים מסחריים ונוכחות מקצועית באתר תוכן צומח." },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="שיתופי פעולה"
        title="הצטרפו לרשת המומחים של המפה הפיננסית"
        sub="אנחנו מחברים בין גולשים שמחפשים פתרונות פיננסיים לבין אנשי מקצוע איכותיים בתחומי משכנתאות, פנסיה, ביטוח, נדל״ן, מיסוי, השקעות וייעוץ עסקי."
        ctas={[
          { to: "/shitufim", label: "הצטרפו כשותפים" },
          { to: "/shitufim", label: "ראו איך זה עובד", variant: "ghost" },
        ]}
        actions={{
          title: "מה עושים עכשיו",
          items: [
            "ממלאים טופס שותף קצר עם פרטי ההתמחות",
            "אנחנו בוחנים התאמה לרשת ולקהל",
            "מגדירים יחד מודל עבודה ותגמול",
            "מתחילים לקבל פניות ממוקדות מהאתר",
          ],
          cta: { to: "/shitufim", label: "אני רוצה להצטרף כשותף" },
        }}
      />

      {/* AUDIENCE */}
      <Section>
        <SectionHeader eyebrow="למי זה מתאים" title="עשרה תחומים, פלטפורמה אחת" sub="כל איש מקצוע פיננסי שרוצה לידים איכותיים ונוכחות מקצועית מוצא כאן בית." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {AUDIENCE.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 rounded-2xl border border-border bg-card hover:-translate-y-0.5 transition-all" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="w-5 h-5" aria-hidden />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FLOW */}
      <Section className="bg-muted/40">
        <SectionHeader eyebrow="איך עובד שיתוף הפעולה" title="מהגולש ועד הסגירה — תהליך אחד שקוף" />
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {FLOW.map((s) => (
            <li key={s.n} className="relative p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
              <span className="absolute -top-3 -right-3 h-9 min-w-9 px-2 rounded-full text-sm font-black text-primary-foreground inline-flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>{s.n}</span>
              <h3 className="font-bold text-lg mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* MODELS */}
      <Section>
        <SectionHeader eyebrow="מודלים מסחריים" title="שלוש דרכים לעבוד איתנו" sub="בוחרים מה שמתאים לעסק שלכם — ניתן לשלב יותר ממודל אחד." />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {MODELS.map((m) => (
            <div
              key={m.title}
              className={`relative p-7 rounded-2xl border bg-card flex flex-col ${m.featured ? "border-accent" : "border-border"}`}
              style={{ boxShadow: m.featured ? "var(--shadow-gold)" : "var(--shadow-soft)" }}
            >
              {m.featured && (
                <span className="absolute -top-3 right-6 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                  פופולרי
                </span>
              )}
              <div className="text-xs font-bold tracking-widest text-primary uppercase">{m.price}</div>
              <h3 className="text-2xl font-black mt-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a href="#join" className="mt-6 inline-flex items-center justify-center h-11 rounded-full font-bold text-sm border border-border hover:bg-muted transition-all">
                בחרו במודל הזה
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* REASONS */}
      <Section className="bg-muted/40">
        <SectionHeader eyebrow="למה להצטרף אלינו" title="היתרונות המרכזיים לשותפים" />
        <div className="grid md:grid-cols-2 gap-4 mt-10 max-w-4xl mx-auto">
          {REASONS.map((r) => (
            <div key={r} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
              <Sparkles className="w-5 h-5 text-accent mt-0.5 shrink-0" aria-hidden />
              <p className="text-sm leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRUST */}
      <Section>
        <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
          <ShieldCheck className="w-10 h-10 mx-auto text-primary" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-black mt-3">אנחנו בוחרים שותפים בקפידה</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            לא כל איש מקצוע מאושר אוטומטית. המטרה היא לשמור על איכות השירות, אמינות הפלטפורמה והגנה על הגולשים. כל בקשה נבחנת ידנית לפני אישור.
          </p>
        </div>
      </Section>

      {/* JOIN FORM */}
      <Section id="join" className="bg-muted/40">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">הצטרפות שותפים</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 leading-tight">רוצים להיות חלק מהמפה הפיננסית?</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">השאירו פרטים — ניצור איתכם קשר תוך 1–2 ימי עסקים לבחינת התאמה ושיתוף פעולה.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5" aria-hidden /> אין עלות הגשת בקשה.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5" aria-hidden /> בדיקת התאמה מקצועית ואיכותית.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5" aria-hidden /> חוזה ברור עם תנאים מסחריים שקופים.</li>
            </ul>
          </div>
          <PartnersForm />
        </div>
      </Section>
    </PageLayout>
  );
}
