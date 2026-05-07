import { ReactNode } from "react";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground mt-1">{hint}</span>}
    </label>
  );
}

export function NumberInput({ value, onChange, min = 0, max, step = 1, suffix }: {
  value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        min={min} max={max} step={step}
        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-base font-medium focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all"
      />
      {suffix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">{suffix}</span>}
    </div>
  );
}

export function fmtILS(n: number) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
}
export function fmtNum(n: number, d = 0) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("he-IL", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
}
