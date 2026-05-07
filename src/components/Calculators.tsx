import { Calculator, TrendingUp, PiggyBank, HeartPulse } from "lucide-react";
const calcs = [
  { icon: Calculator, t: "מחשבון משכנתא", d: "תשלום חודשי וריבית כוללת" },
  { icon: TrendingUp, t: "ריבית דריבית", d: "צמיחת הון לאורך שנים" },
  { icon: HeartPulse, t: "ציון בריאות פיננסית", d: "אבחון מצבכם הכספי" },
  { icon: PiggyBank, t: "פערי פנסיה", d: "כמה חסר לכם לפרישה" },
];
export function Calculators() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative grid lg:grid-cols-2 gap-12">
            <div className="text-primary-foreground">
              <span className="text-sm font-bold tracking-widest text-accent uppercase">כלים אינטראקטיביים</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">מספרים שמדברים אליכם</h2>
              <p className="mt-5 text-lg text-primary-foreground/80 leading-relaxed">
                ארבעה מחשבונים פשוטים ומהירים שיהפכו את התמונה הפיננסית שלכם לברורה — בלי הרשמה, בלי התחייבות.
              </p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full font-bold text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
                לכל המחשבונים ←
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {calcs.map((c) => (
                <div key={c.t} className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-primary-foreground hover:bg-white/15 transition-colors">
                  <c.icon className="text-accent" size={26} />
                  <h3 className="mt-3 font-bold">{c.t}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
