import { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <span className="text-xs font-bold tracking-widest text-primary uppercase">{eyebrow}</span>}
      <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`text-xs text-muted-foreground bg-muted/60 border border-border rounded-xl p-4 leading-relaxed space-y-2 ${className}`}>
      <p>
        <strong className="text-foreground">דיסקליימר משפטי:</strong> המחשבון הוא כלי המחשה בלבד. התוצאות מבוססות על הנתונים שהוזנו ועל הנחות כלליות, אינן תחזית, אינן התחייבות, אינן המלצה ואינן תחליף לבדיקה מקצועית פרטנית.
      </p>
      <p>
        האתר ובעליו אינם אחראים לטעות בחישוב, אי-דיוק, שינויי ריבית, מדד, מס, רגולציה, תשואה, תנאי שוק, עמלות, דמי ניהול או כל פרמטר שלא נלקח בחשבון. הסתמכות על התוצאות נעשית באחריות המשתמש בלבד.
      </p>
    </div>
  );
}
