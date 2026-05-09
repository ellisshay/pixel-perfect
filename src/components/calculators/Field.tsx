import { ReactNode, useId } from "react";

export function Field({ label, children, hint, error, required }: {
  label: string; children: ReactNode; hint?: string; error?: string; required?: boolean;
}) {
  const hintId = useId();
  const errorId = useId();
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span aria-hidden="true" className="text-destructive ms-1">*</span>}
        {required && <span className="sr-only"> (שדה חובה)</span>}
      </span>
      {children}
      {hint && <span id={hintId} className="block text-xs text-muted-foreground mt-1">{hint}</span>}
      {error && <span id={errorId} role="alert" className="block text-xs text-destructive mt-1">{error}</span>}
    </label>
  );
}

export function NumberInput({ value, onChange, min = 0, max, step = 1, suffix, "aria-label": ariaLabel, "aria-invalid": ariaInvalid }: {
  value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string;
  "aria-label"?: string; "aria-invalid"?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="number" inputMode="decimal" aria-label={ariaLabel} aria-invalid={ariaInvalid}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => {
          const raw = parseFloat(e.target.value);
          if (!Number.isFinite(raw)) { onChange(min ?? 0); return; }
          const clamped = min !== undefined && raw < min ? min : max !== undefined && raw > max ? max : raw;
          onChange(clamped);
        }}
        min={min} max={max} step={step}
        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-all"
      />
      {suffix && <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">{suffix}</span>}
    </div>
  );
}

export function fmtILS(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
}

export function fmtNum(n: number, d = 0): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("he-IL", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
}

export function calcMonthlyPayment(P: number, annualRatePct: number, years: number): number {
  const n = Math.max(1, Math.round(years)) * 12;
  const r = annualRatePct / 100 / 12;
  if (!Number.isFinite(P) || P <= 0) return 0;
  if (r === 0) return P / n;
  const payment = (P * r) / (1 - Math.pow(1 + r, -n));
  return Number.isFinite(payment) ? payment : 0;
}

export function calcFV(PV: number, pmt: number, annualRatePct: number, years: number): number {
  const n = Math.max(0, Math.round(years)) * 12;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return PV + pmt * n;
  const fv = PV * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
  return Number.isFinite(fv) ? fv : 0;
}
