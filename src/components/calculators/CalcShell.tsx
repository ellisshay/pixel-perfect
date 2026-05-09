import { ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, RefreshCw } from "lucide-react";
import { Disclaimer } from "@/components/layout/Section";

export function CalcShell({ title, desc, inputs, results, footer, chart }: {
  title: string; desc?: string; inputs: ReactNode; results: ReactNode; footer?: ReactNode; chart?: ReactNode;
}) {
  const [ack, setAck] = useState(false);
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
      <div role="note" className="lg:col-span-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs leading-relaxed text-foreground/80">
        <strong className="text-foreground">לתשומת לבך:</strong> המחשבון הוא <strong>סימולציה להמחשה בלבד</strong>. אינו ייעוץ פיננסי, אינו המלצה ואינו מבטיח תשואה או תוצאה כלכלית כלשהי. לפני כל החלטה — היוועצו באיש מקצוע מוסמך.
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
        <h2 className="text-xl font-bold">{title}</h2>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">{inputs}</div>
      </div>
      <div
        className="rounded-2xl p-6 md:p-8 text-primary-foreground relative overflow-hidden"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
        role="region"
        aria-label="תוצאות הסימולציה"
        aria-live="polite"
      >
        <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-mesh)" }} />
        <div className="relative">
          <div className="text-xs font-bold tracking-widest text-accent uppercase">תוצאות הסימולציה</div>
          <div className="mt-4 space-y-4">{results}</div>
          {footer && <div className="mt-6 text-xs text-primary-foreground/70 border-t border-white/15 pt-4">{footer}</div>}
          <button
            type="button"
            onClick={() => setAck(true)}
            aria-pressed={ack}
            className={`mt-6 w-full h-10 rounded-full text-xs font-bold transition ${ack ? "bg-white/15 text-primary-foreground/70 cursor-default" : "bg-white/20 hover:bg-white/30 text-primary-foreground"}`}
            disabled={ack}
          >
            {ack ? "אישרת — אלו תוצאות סימולציה בלבד ✓" : "הבנתי שהתוצאה היא סימולציה בלבד"}
          </button>
        </div>
      </div>
      {chart && (
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 md:p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">המחשה גרפית</div>
          <div className="w-full h-64 md:h-72">{chart}</div>
        </div>
      )}
      <div
        className="lg:col-span-2 rounded-2xl border border-primary/15 bg-gradient-to-l from-secondary/60 to-white p-6 md:p-8"
        style={{ boxShadow: "var(--shadow-soft)" }}
        aria-label="מה עושים עם הנתון הזה"
      >
        <h3 className="text-xl md:text-2xl font-black text-primary">מה עושים עם הנתון הזה?</h3>
        <p className="mt-2 text-sm md:text-base text-foreground/75 leading-relaxed max-w-2xl">
          התוצאה היא סימולציה ראשונית בלבד ואינה ייעוץ אישי. כדי להבין אם הנתון מתאים למצב שלך, אפשר להמשיך לבדיקה מסודרת או להשאיר פרטים לחיבור עם בעל מקצוע מתאים.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/start"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-sm text-accent-foreground hover:scale-[1.02] transition"
            style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
          >
            קבל כיוון ראשוני <ArrowLeft size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-sm text-primary-foreground hover:scale-[1.02] transition"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Phone size={14} /> דבר עם בעל מקצוע
          </Link>
          <Link
            to="/calculators"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-sm text-primary border border-primary/20 bg-white hover:bg-primary/5 transition"
          >
            <RefreshCw size={14} /> חזור למחשבונים
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2"><Disclaimer /></div>
    </div>
  );
}

export function ResultRow({ label, value, accent = false, warn = false }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
      <span className="text-sm text-primary-foreground/80">{label}</span>
      <span className={`font-bold ${accent ? "text-2xl" : "text-lg"} ${warn ? "text-destructive-foreground bg-destructive/40 px-3 py-0.5 rounded-md" : ""}`}
        style={accent && !warn ? { backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", color: "transparent" } : undefined}>
        {value}
      </span>
    </div>
  );
}
