import { Search, ShieldCheck, Users } from "lucide-react";
const steps = [
  { icon: Search, n: "01", t: "אבחון חכם", d: "ענו על אבחון קצר ומקבלו תמונת מצב פיננסית מדויקת ומותאמת אישית." },
  { icon: ShieldCheck, n: "02", t: "התאמה מסוננת", d: "המערכת מנתבת אתכם רק לאנשי מקצוע מאומתים, רלוונטיים ומדורגים." },
  { icon: Users, n: "03", t: "פגישה ופעולה", d: "מתחברים בלי עמלות נסתרות. אתם מקבלים ערך, אנחנו שומרים על אובייקטיביות." },
];
export function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">איך זה עובד</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-tight">
              לא יועץ. לא ברוקר. <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                סמכות אובייקטיבית.
              </span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              אנחנו ה-Gatekeeper הפיננסי של ישראל. תפקידנו להנגיש, לסנן ולנתב — לא למכור לכם מוצר.
            </p>
          </div>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="relative p-8 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                    <s.icon size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground tracking-widest">שלב {s.n}</div>
                    <h3 className="mt-1 text-2xl font-bold">{s.t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
