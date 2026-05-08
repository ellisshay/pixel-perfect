import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS } from "./Field";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function CompoundFeesCalc() {
  const [start, setStart] = useState(100_000);
  const [monthly, setMonthly] = useState(1_500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(25);
  const [feeAccum, setFeeAccum] = useState(0.6);
  const [feeDeposit, setFeeDeposit] = useState(1.5);

  const { withFees, noFees, cost, chartData } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const fA = feeAccum / 100 / 12;
    const fD = feeDeposit / 100;
    let withF = start, noF = start;
    const chartData: { year: number; withFees: number; noFees: number }[] = [{ year: 0, withFees: Math.round(start), noFees: Math.round(start) }];
    for (let i = 0; i < n; i++) {
      withF = withF * (1 + r - fA) + monthly * (1 - fD);
      noF = noF * (1 + r) + monthly;
      if ((i + 1) % 12 === 0) chartData.push({ year: (i + 1) / 12, withFees: Math.round(withF), noFees: Math.round(noF) });
    }
    return { withFees: withF, noFees: noF, cost: noF - withF, chartData };
  }, [start, monthly, rate, years, feeAccum, feeDeposit]);

  return (
    <CalcShell
      title="ריבית דריבית עם דמי ניהול"
      desc="ראה כמה דמי ניהול 'קטנים' עולים לאורך עשרות שנים."
      inputs={<>
        <Field label="סכום התחלתי"><NumberInput value={start} onChange={setStart} step={1000} suffix="₪" /></Field>
        <Field label="הפקדה חודשית"><NumberInput value={monthly} onChange={setMonthly} step={100} suffix="₪" /></Field>
        <Field label="תשואה שנתית"><NumberInput value={rate} onChange={setRate} step={0.5} suffix="%" /></Field>
        <Field label="שנים"><NumberInput value={years} onChange={setYears} min={1} max={50} /></Field>
        <Field label="דמי ניהול מצבירה"><NumberInput value={feeAccum} onChange={setFeeAccum} step={0.05} suffix="%/שנה" /></Field>
        <Field label="דמי ניהול מהפקדה"><NumberInput value={feeDeposit} onChange={setFeeDeposit} step={0.1} suffix="%" /></Field>
      </>}
      results={<>
        <ResultRow label="שווי עתידי עם דמי ניהול" value={fmtILS(withFees)} accent />
        <ResultRow label="שווי עתידי ללא דמי ניהול" value={fmtILS(noFees)} />
        <ResultRow label="עלות דמי הניהול המצטברת" value={fmtILS(cost)} warn={cost > 0} />
        <p className="text-xs text-primary-foreground/80 leading-relaxed">תובנה: כל 0.2% דמי ניהול נוספים יכולים "לאכול" עשרות אלפי שקלים על פני 25 שנה.</p>
      </>}
      chart={
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="noFeesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="withFeesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tickFormatter={(v) => `שנה ${v}`} style={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`} style={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number, n: string) => [`₪${Number(v).toLocaleString("he-IL")}`, n === "noFees" ? "ללא דמי ניהול" : "עם דמי ניהול"]}
              labelFormatter={(l) => `שנה ${l}`}
            />
            <Area type="monotone" dataKey="noFees" stroke="hsl(var(--accent))" fill="url(#noFeesGrad)" name="noFees" />
            <Area type="monotone" dataKey="withFees" stroke="hsl(var(--primary))" fill="url(#withFeesGrad)" name="withFees" />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}
