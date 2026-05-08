import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS, fmtNum } from "./Field";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MortgageCalc() {
  const [amount, setAmount] = useState(1_200_000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(5);
  const [income, setIncome] = useState(22_000);

  const { monthly, totalPaid, totalInterest, ratio, chartData } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const monthly = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
    const totalPaid = monthly * n;
    const chartData = Array.from({ length: years + 1 }, (_, yr) => {
      const m = yr * 12;
      const bal = r === 0 ? Math.max(0, amount - monthly * m) : Math.max(0, amount * Math.pow(1 + r, m) - monthly * (Math.pow(1 + r, m) - 1) / r);
      const paid = monthly * m;
      const principalPaid = amount - bal;
      const interest = Math.max(0, paid - principalPaid);
      return { year: yr, balance: Math.round(bal), interest: Math.round(interest) };
    });
    return { monthly, totalPaid, totalInterest: totalPaid - amount, ratio: income > 0 ? (monthly / income) * 100 : 0, chartData };
  }, [amount, years, rate, income]);

  return (
    <CalcShell
      title="מחשבון משכנתא"
      desc="חשב החזר חודשי, סך ריבית ויחס החזר להכנסה."
      inputs={<>
        <Field label="סכום הלוואה"><NumberInput value={amount} onChange={setAmount} step={10000} suffix="₪" /></Field>
        <Field label="מספר שנים"><NumberInput value={years} onChange={setYears} min={1} max={40} suffix="שנים" /></Field>
        <Field label="ריבית שנתית"><NumberInput value={rate} onChange={setRate} step={0.1} suffix="%" /></Field>
        <Field label="הכנסה נטו משפחתית"><NumberInput value={income} onChange={setIncome} step={500} suffix="₪/חודש" /></Field>
      </>}
      results={<>
        <ResultRow label="החזר חודשי" value={fmtILS(monthly)} accent />
        <ResultRow label="סך ריבית" value={fmtILS(totalInterest)} />
        <ResultRow label="סך תשלום כולל" value={fmtILS(totalPaid)} />
        <ResultRow label="יחס החזר להכנסה" value={`${fmtNum(ratio, 1)}%`} warn={ratio > 30} />
        {ratio > 30 && <p className="text-xs text-destructive-foreground bg-destructive/40 rounded-lg p-3">⚠ יחס החזר מעל 30% נחשב סיכון מימוני גבוה. שווה לבחון תמהיל אחר או הון עצמי גדול יותר.</p>}
      </>}
      footer="ההצגה היא סימולציה כללית, לא ייעוץ. ריבית בפועל תלויה בבנק, מסלול וביטחונות."
      chart={
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tickFormatter={(v) => `שנה ${v}`} style={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`} style={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number, n: string) => [`₪${Number(v).toLocaleString("he-IL")}`, n === "balance" ? "יתרת קרן" : "ריבית שולמה"]}
              labelFormatter={(l) => `שנה ${l}`}
            />
            <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fill="url(#balGrad)" name="balance" />
            <Area type="monotone" dataKey="interest" stroke="hsl(var(--destructive))" fill="url(#intGrad)" name="interest" />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}
