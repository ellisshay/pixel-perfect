import { ReactNode } from "react";

export function LegalDoc({ children, updated = "מאי 2026" }: { children: ReactNode; updated?: string }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-10 leading-relaxed text-foreground/90 space-y-6" style={{ boxShadow: "var(--shadow-soft)" }}>
        {children}
        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          תאריך עדכון אחרון: {updated}. נוסח מסמך זה הוא כללי ואינו מהווה תחליף לבדיקה משפטית פרטנית של עורך/ת דין מוסמך/ת.
        </p>
      </div>
    </div>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-bold text-foreground mt-2">{children}</h2>;
}
export function LegalH3({ children }: { children: ReactNode }) {
  return <h3 className="text-base md:text-lg font-bold text-foreground mt-4">{children}</h3>;
}
export function LegalP({ children }: { children: ReactNode }) {
  return <p className="text-sm md:text-base text-muted-foreground leading-7">{children}</p>;
}
export function LegalUL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pr-5 space-y-2 text-sm md:text-base text-muted-foreground leading-7 marker:text-primary">{children}</ul>;
}