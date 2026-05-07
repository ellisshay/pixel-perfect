import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS, fmtNum } from "./Field";

export function RealEstateCalc() {
  const [price, setPrice] = useState(1_500_000);
  const [equity, setEquity] = useState(450_000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const [rent, setRent] = useState(5500);
  const [costs, setCosts] = useState(400);
  const [tax, setTax] = useState(300);

  const data = useMemo(() => {
    const loan = Math.max(0, price - equity);
    const r = rate / 100 / 12;
    const n = years * 12;
    const mortgage = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const cashflow = rent - costs - tax - mortgage;
    const grossYield = price > 0 ? (rent * 12) / price * 100 : 0;
    const netYield = price > 0 ? ((rent - costs - tax) * 12) / price * 100 : 0;
    const ltv = price > 0 ? loan / price * 100 : 0;
    return { loan, mortgage, cashflow, grossYield, netYield, ltv };
  }, [price, equity, rate, years, rent, costs, tax]);

  return (
    <CalcShell
      title="השקעת נדל״ן"
      desc="תזרים, תשואה ויחס מימון לעסקה הבאה."
      inputs={<>
        <Field label="מחיר נכס"><NumberInput value={price} onChange={setPrice} step={10000} suffix="₪" /></Field>
        <Field label="הון עצמי"><NumberInput value={equity} onChange={setEquity} step={10000} suffix="₪" /></Field>
        <Field label="ריבית מימון"><NumberInput value={rate} onChange={setRate} step={0.1} suffix="%" /></Field>
        <Field label="שנות מימון"><NumberInput value={years} onChange={setYears} min={1} max={40} /></Field>
        <Field label="שכירות חודשית צפויה"><NumberInput value={rent} onChange={setRent} step={100} suffix="₪" /></Field>
        <Field label="הוצאות חודשיות (תחזוקה/ניהול)"><NumberInput value={costs} onChange={setCosts} step={50} suffix="₪" /></Field>
        <Field label="מסים / ארנונה / ביטוח"><NumberInput value={tax} onChange={setTax} step={50} suffix="₪" /></Field>
      </>}
      results={<>
        <ResultRow label="תזרים חודשי נטו" value={fmtILS(data.cashflow)} accent warn={data.cashflow < 0} />
        <ResultRow label="תשואה ברוטו" value={`${fmtNum(data.grossYield, 2)}%`} />
        <ResultRow label="תשואה נטו" value={`${fmtNum(data.netYield, 2)}%`} />
        <ResultRow label="החזר משכנתא חודשי" value={fmtILS(data.mortgage)} />
        <ResultRow label="יחס מימון (LTV)" value={`${fmtNum(data.ltv, 1)}%`} warn={data.ltv > 75} />
        {data.ltv > 75 && <p className="text-xs text-destructive-foreground bg-destructive/40 rounded-lg p-3">⚠ מינוף גבוה משמעותית מגביר סיכון בעסקאות נדל״ן.</p>}
      </>}
    />
  );
}
