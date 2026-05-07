import { Wallet, Home, CreditCard, LineChart, Building2, Globe2, Briefcase, Rocket } from "lucide-react";

const domains = [
  { icon: Wallet, title: "פיננסי אישי", desc: "תכנון, פנסיה, ביטוח ומיסוי" },
  { icon: Home, title: "משכנתאות", desc: "חדשה, מיחזור וייעוץ אישי" },
  { icon: CreditCard, title: "אשראי", desc: "הלוואות, גישור ומימון" },
  { icon: LineChart, title: "שוק ההון", desc: "מסחר, IRA וניהול תיקים" },
  { icon: Building2, title: "נדל\"ן ישראל", desc: "ליווי משקיעים ושמאות" },
  { icon: Globe2, title: "נדל\"ן חו\"ל", desc: "ניתוח מדינות ומיסוי" },
  { icon: Briefcase, title: "עסקים קטנים", desc: "מימון, רו\"ח וייעוץ תזרים" },
  { icon: Rocket, title: "יזמות", desc: "מנטורינג ומימון הקמה" },
];

export function Domains() {
  return (
    <section id="domains" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold tracking-widest text-primary uppercase">8 מסלולים · מפה אחת</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">בחרו את התחום שלכם</h2>
          <p className="mt-4 text-lg text-muted-foreground">כל תחום מוביל לאנשי מקצוע מאומתים, כלים אינטראקטיביים ומדריכים מקצועיים.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((d, i) => (
            <a
              key={d.title}
              href="#"
              className="group relative p-7 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-soft)", animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" style={{ background: "var(--gradient-card)" }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-hero)" }}>
                <d.icon size={22} strokeWidth={2.2} />
              </div>
              <h3 className="font-bold text-lg">{d.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                כניסה לתחום <span>←</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
