import { Link } from "@tanstack/react-router";
import { DISCLAIMER } from "@/data/nav";

export function Footer() {
  const cols = [
    { t: "תחומים", l: [
      { to: "/shuk-hahon", label: "שוק ההון" },
      { to: "/nadlan", label: "נדל״ן" },
      { to: "/tichnun-piansi", label: "תכנון פיננסי" },
      { to: "/mashkantaot", label: "משכנתאות" },
    ]},
    { t: "כלים", l: [
      { to: "/calculators", label: "מחשבונים" },
      { to: "/taoyot", label: "טעויות נפוצות" },
      { to: "/blog", label: "בלוג ומדריכים" },
      { to: "/start", label: "שאלון התחל כאן" },
    ]},
    { t: "החברה", l: [
      { to: "/shitufim", label: "שיתופי פעולה" },
      { to: "/shkifut", label: "שקיפות ואתיקה" },
      { to: "/contact", label: "צור קשר" },
    ]},
    { t: "משפטי", l: [
      { to: "/legal/privacy", label: "מדיניות פרטיות" },
      { to: "/legal/terms", label: "תנאי שימוש" },
      { to: "/legal/accessibility", label: "הצהרת נגישות" },
      { to: "/legal/cookies", label: "מדיניות עוגיות" },
      { to: "/legal/disclosure", label: "גילוי נאות" },
    ]},
  ];
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-5 gap-10">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-base">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>₪</span>
              המפה הפיננסית
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              לא פועלים בלי מפה. קודם מבינים, אחר כך בונים הון.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <h4 className="font-bold text-sm mb-4">{c.t}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.l.map((i) => <li key={i.to}><Link to={i.to} className="hover:text-foreground transition-colors">{i.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">{DISCLAIMER}</p>
          <p className="text-xs text-muted-foreground">© 2025 המפה הפיננסית של ישראל · כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}
