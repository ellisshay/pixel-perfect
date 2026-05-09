import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS } from "./Field";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MonthlyInvestCalc() {
  const [monthly, setMonthly] = useState(1_000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const { future, contributions, profit, chartData } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = Math.max(0, years) * 12;
    let bal = 0;
    const chart: { year: number; value: number; deposits: number }[] = [{ year: 0, value: 0, deposits: 0 }];
    for (let i = 1; i <= n; i++) {
      bal = bal * (1 + r) + monthly;
      if (i % 12 === 0) chart.push({ year: i / 12, value: Math.round(bal), deposits: Math.round(monthly * i) });
    }
    const contributions = monthly * n;
    return { future: bal, contributions, profit: bal - contributions, chartData: chart };
  }, [monthly, rate, years]);

  return (
    <CalcShell
      title="מחשבון השקעה חודשית"
      desc="ראה כמה הפקדה חודשית קטנה יכולה להפוך לסכום משמעותי לאורך שנים."
      inputs={<>
        <Field label="הפקדה חודשית"><NumberInput value={monthly} onChange={setMonthly} step={50} suffix="₪" /></Field>
        <Field label="תשואה שנתית משוערת"><NumberInput value={rate} onChange={setRate} step={0.5} suffix="%" /></Field>
        <Field label="תקופה"><NumberInput value={years} onChange={setYears} min={1} max={50} suffix="שנים" /></Field>
      </>}
      results={<>
        <ResultRow label="שווי עתידי משוער" value={fmtILS(future)} accent />
        <ResultRow label="סך הפקדות" value={fmtILS(contributions)} />
        <ResultRow label="רווח משוער" value={fmtILS(profit)} />
        <p className="text-xs text-primary-foreground/80 leading-relaxed">
          תובנה: גם 500 ₪ בחודש על פני 25 שנה בתשואה ממוצעת של 7% הופכים לסכום של מאות אלפי שקלים — בזכות ריבית דריבית.
        </p>
      </>}
      footer="הסימולציה מבוססת על תשואה קבועה תיאורטית. בפועל התשואה משתנה משנה לשנה ואינה מובטחת."
      chart={
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="miValueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="miDepGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tickFormatter={(v) => `שנה ${v}`} style={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`} style={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number, n: string) => [`₪${Number(v).toLocaleString("he-IL")}`, n === "value" ? "שווי תיק" : "סך הפקדות"]}
              labelFormatter={(l) => `שנה ${l}`}
            />
            <Area type="monotone" dataKey="deposits" stroke="hsl(var(--accent))" fill="url(#miDepGrad)" name="deposits" />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#miValueGrad)" name="value" />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}