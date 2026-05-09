import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS, fmtNum } from "./Field";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function FeesCalc() {
  const [start, setStart] = useState(100_000);
  const [monthly, setMonthly] = useState(1_000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(25);
  const [feeYour, setFeeYour] = useState(1.0);
  const [feeAlt, setFeeAlt] = useState(0.3);

  const data = useMemo(() => {
    const n = Math.max(0, years) * 12;
    const r = rate / 100 / 12;
    const fY = feeYour / 100 / 12;
    const fA = feeAlt / 100 / 12;
    let bY = start, bA = start;
    const chart: { year: number; yourFee: number; altFee: number }[] = [
      { year: 0, yourFee: Math.round(start), altFee: Math.round(start) },
    ];
    for (let i = 1; i <= n; i++) {
      bY = bY * (1 + r - fY) + monthly;
      bA = bA * (1 + r - fA) + monthly;
      if (i % 12 === 0) chart.push({ year: i / 12, yourFee: Math.round(bY), altFee: Math.round(bA) });
    }
    const cost = bA - bY;
    const contributions = start + monthly * n;
    const costPct = contributions > 0 ? (cost / contributions) * 100 : 0;
    return { yourFinal: bY, altFinal: bA, cost, costPct, chartData: chart };
  }, [start, monthly, rate, years, feeYour, feeAlt]);

  return (
    <CalcShell
      title="מחשבון דמי ניהול"
      desc="כמה ההפרש בדמי הניהול 'אוכל' לך לאורך השנים — בלי שירגיש."
      inputs={<>
        <Field label="סכום התחלתי"><NumberInput value={start} onChange={setStart} step={1_000} suffix="₪" /></Field>
        <Field label="הפקדה חודשית"><NumberInput value={monthly} onChange={setMonthly} step={100} suffix="₪" /></Field>
        <Field label="תשואה שנתית משוערת"><NumberInput value={rate} onChange={setRate} step={0.5} suffix="%" /></Field>
        <Field label="תקופה"><NumberInput value={years} onChange={setYears} min={1} max={50} suffix="שנים" /></Field>
        <Field label="דמי הניהול שלך היום"><NumberInput value={feeYour} onChange={setFeeYour} step={0.05} suffix="%/שנה" /></Field>
        <Field label="דמי ניהול חלופיים"><NumberInput value={feeAlt} onChange={setFeeAlt} step={0.05} suffix="%/שנה" /></Field>
      </>}
      results={<>
        <ResultRow label="שווי עם דמי הניהול שלך" value={fmtILS(data.yourFinal)} />
        <ResultRow label="שווי בדמי ניהול חלופיים" value={fmtILS(data.altFinal)} accent />
        <ResultRow label="ההפרש לאורך התקופה" value={fmtILS(data.cost)} warn={data.cost > 0} />
        <ResultRow label="כאחוז מסך ההפקדות" value={`${fmtNum(data.costPct, 1)}%`} />
        <p className="text-xs text-primary-foreground/80 leading-relaxed">
          תובנה: בדיקה של דמי ניהול בקרן הפנסיה, בקופת הגמל ובמסלול ההשקעות יכולה לשנות עשרות ולעיתים מאות אלפי שקלים בפרישה.
        </p>
      </>}
      footer="הסימולציה אינה כוללת דמי ניהול מהפקדה ופערים תפעוליים בין מוצרים. ההצגה להמחשה בלבד."
      chart={
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fAlt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fYour" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tickFormatter={(v) => `שנה ${v}`} style={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`} style={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number, n: string) => [`₪${Number(v).toLocaleString("he-IL")}`, n === "altFee" ? "דמי ניהול חלופיים" : "דמי הניהול שלך"]}
              labelFormatter={(l) => `שנה ${l}`}
            />
            <Area type="monotone" dataKey="altFee" stroke="hsl(var(--accent))" fill="url(#fAlt)" name="altFee" />
            <Area type="monotone" dataKey="yourFee" stroke="hsl(var(--primary))" fill="url(#fYour)" name="yourFee" />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}