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
      {error && (
        <span id={errorId} role="alert" className="block text-xs text-destructive mt-1">{error}</span>
      )}
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
        type="number"
        inputMode="decimal"
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        min={min} max={max} step={step}
        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-all"
      />
      {suffix && <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">{suffix}</span>}
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
