import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS } from "./Field";

export function InvestCalc() {
  const [start, setStart] = useState(50_000);
  const [monthly, setMonthly] = useState(2_000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [inflation, setInflation] = useState(2.5);

  const { future, contributions, profit, real } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    let bal = start;
    for (let i = 0; i < n; i++) bal = bal * (1 + r) + monthly;
    const contributions = start + monthly * n;
    const realRate = (1 + rate / 100) / (1 + inflation / 100) - 1;
    const rr = realRate / 12;
    let realBal = start;
    for (let i = 0; i < n; i++) realBal = realBal * (1 + rr) + monthly;
    return { future: bal, contributions, profit: bal - contributions, real: realBal };
  }, [start, monthly, rate, years, inflation]);

  return (
    <CalcShell
      title="מחשבון השקעות"
      desc="צמיחת הון לאורך זמן עם הפקדה חודשית."
      inputs={<>
        <Field label="סכום התחלתי"><NumberInput value={start} onChange={setStart} step={1000} suffix="₪" /></Field>
        <Field label="הפקדה חודשית"><NumberInput value={monthly} onChange={setMonthly} step={100} suffix="₪" /></Field>
        <Field label="תשואה שנתית משוערת"><NumberInput value={rate} onChange={setRate} step={0.5} suffix="%" /></Field>
        <Field label="תקופה"><NumberInput value={years} onChange={setYears} min={1} max={50} suffix="שנים" /></Field>
        <Field label="אינפלציה (אופציונלי)"><NumberInput value={inflation} onChange={setInflation} step={0.1} suffix="%" /></Field>
      </>}
      results={<>
        <ResultRow label="שווי עתידי משוער" value={fmtILS(future)} accent />
        <ResultRow label="ערך ריאלי (אחרי אינפלציה)" value={fmtILS(real)} />
        <ResultRow label="סך הפקדות" value={fmtILS(contributions)} />
        <ResultRow label="רווח משוער" value={fmtILS(profit)} />
      </>}
      footer="תשואה אינה מובטחת. עבר אינו מנבא את העתיד."
    />
  );
}
