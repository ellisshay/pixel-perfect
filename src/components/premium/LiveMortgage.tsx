import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Counter } from "./Counter";
import { ArrowLeft } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
}

export function LiveMortgage() {
  const [amount, setAmount] = useState(1_200_000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(5);

  const { monthly, totalInterest } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const m = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
    return { monthly: m, totalInterest: m * n - amount };
  }, [amount, years, rate]);

  // Insight: cost of 5 extra years
  const altYears = years + 5;
  const altN = altYears * 12;
  const altR = rate / 100 / 12;
  const altMonthly = altR === 0 ? amount / altN : (amount * altR) / (1 - Math.pow(1 + altR, -altN));
  const extraCost = altMonthly * altN - (monthly * years * 12);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 text-primary-foreground p-6 md:p-8"
      style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
      <div className="relative grid md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs font-bold tracking-widest text-accent uppercase">מחשבון חי · משכנתא</div>
          <h3 className="mt-2 text-2xl md:text-3xl font-black">תזיזו את הסליידרים — והמספרים זזים בזמן אמת</h3>

          <Slider label="סכום הלוואה" value={amount} min={300_000} max={3_000_000} step={10_000} onChange={setAmount} formatter={fmt} />
          <Slider label="מספר שנים" value={years} min={5} max={35} step={1} onChange={setYears} formatter={(v) => `${v} שנים`} />
          <Slider label="ריבית שנתית" value={rate} min={1} max={9} step={0.1} onChange={setRate} formatter={(v) => `${v.toFixed(1)}%`} />
        </div>
        <div>
          <Stat label="החזר חודשי" value={<Counter value={monthly} prefix="₪" decimals={0} />} accent />
          <Stat label="סך הריבית שתשלמו" value={<Counter value={totalInterest} prefix="₪" decimals={0} />} />
          <div className="mt-5 rounded-2xl bg-amber-500/15 border border-amber-300/30 p-4">
            <div className="text-xs font-bold tracking-widest text-amber-200 uppercase">תובנה</div>
            <p className="mt-1 text-sm leading-relaxed">
              עוד <strong>5 שנים</strong> של פריסה יעלו לך עוד{" "}
              <strong className="text-accent">
                <Counter value={Math.max(0, extraCost)} prefix="₪" decimals={0} />
              </strong>{" "}בריבית.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/calculators/mortgage" className="inline-flex items-center gap-1 h-11 px-5 rounded-full text-sm font-bold text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
              פתח מחשבון מלא <ArrowLeft size={14} />
            </Link>
            <Link to="/mashkantaot" className="inline-flex items-center h-11 px-4 rounded-full text-sm font-bold border border-white/30 bg-white/10 hover:bg-white/20 transition">
              5 טעויות בתכנון משכנתא
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, formatter }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; formatter: (v: number) => string;
}) {
  return (
    <label className="block mt-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-bold text-primary-foreground/80">{label}</span>
        <span className="text-sm font-bold tabular-nums">{formatter(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-white/15 accent-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={label}
      />
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 mb-3 last:border-0 last:mb-0">
      <span className="text-sm text-primary-foreground/80">{label}</span>
      <span className={`font-black tabular-nums ${accent ? "text-3xl" : "text-xl"}`}
        style={accent ? { backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", color: "transparent" } : undefined}>
        {value}
      </span>
    </div>
  );
}
