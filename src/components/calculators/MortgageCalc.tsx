import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS, fmtNum } from "./Field";

export function MortgageCalc() {
  const [amount, setAmount] = useState(1_200_000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(5);
  const [income, setIncome] = useState(22_000);

  const { monthly, totalPaid, totalInterest, ratio } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const monthly = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
    const totalPaid = monthly * n;
    return { monthly, totalPaid, totalInterest: totalPaid - amount, ratio: income > 0 ? (monthly / income) * 100 : 0 };
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
    />
  );
}
