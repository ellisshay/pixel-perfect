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
    <p className={`text-xs text-muted-foreground bg-muted/60 border border-border rounded-xl p-4 leading-relaxed ${className}`}>
      <strong className="text-foreground">דיסקליימר:</strong> המידע באתר הוא כללי וחינוכי בלבד ואינו מהווה ייעוץ השקעות, ייעוץ פיננסי אישי, ייעוץ מס או התחייבות לתשואה.
    </p>
  );
}
