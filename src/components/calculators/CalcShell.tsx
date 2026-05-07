import { ReactNode } from "react";
import { Disclaimer } from "@/components/layout/Section";

export function CalcShell({ title, desc, inputs, results, footer }: {
  title: string; desc?: string; inputs: ReactNode; results: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
        <h2 className="text-xl font-bold">{title}</h2>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">{inputs}</div>
      </div>
      <div className="rounded-2xl p-6 md:p-8 text-primary-foreground relative overflow-hidden" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
        <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-mesh)" }} />
        <div className="relative">
          <div className="text-xs font-bold tracking-widest text-accent uppercase">תוצאות הסימולציה</div>
          <div className="mt-4 space-y-4">{results}</div>
          {footer && <div className="mt-6 text-xs text-primary-foreground/70 border-t border-white/15 pt-4">{footer}</div>}
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
