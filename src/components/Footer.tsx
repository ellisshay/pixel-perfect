export function Footer() {
  const cols = [
    { t: "תחומים", l: ["פיננסי אישי", "משכנתאות", "שוק ההון", "נדל\"ן"] },
    { t: "כלים", l: ["מחשבון משכנתא", "ריבית דריבית", "ציון פיננסי", "אבחון"] },
    { t: "החברה", l: ["אודות", "אנשי מקצוע", "קהילה", "צרו קשר"] },
    { t: "משפטי", l: ["מדיניות פרטיות", "תנאי שימוש", "Cookie", "הגנת הפרטיות"] },
  ];
  return (
    <footer className="border-t border-border bg-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>₪</span>
              המפה הפיננסית
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              הסמכות האובייקטיבית הפיננסית של ישראל.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <h4 className="font-bold text-sm mb-4">{c.t}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground transition-colors">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          © 2025 המפה הפיננסית של ישראל · רשום כדין ברשם מאגרי המידע
        </div>
      </div>
    </footer>
  );
}
