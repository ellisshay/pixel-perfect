import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS } from "./Field";

export function ChildSavingsCalc() {
  const [start, setStart] = useState(5_000);
  const [monthly, setMonthly] = useState(250);
  const [age, setAge] = useState(3);
  const [target, setTarget] = useState(21);
  const [rate, setRate] = useState(5);
  const [fee, setFee] = useState(0.7);

  const data = useMemo(() => {
    const years = Math.max(0, target - age);
    const n = years * 12;
    const r = (rate - fee) / 100 / 12;
    let bal = start;
    for (let i = 0; i < n; i++) bal = bal * (1 + r) + monthly;
    const contributions = start + monthly * n;
    return { years, future: bal, contributions, profit: bal - contributions };
  }, [start, monthly, age, target, rate, fee]);

  return (
    <CalcShell
      title="חיסכון לכל ילד"
      desc="כמה צפוי להיות לילד בגיל היעד, אחרי דמי ניהול."
      inputs={<>
        <Field label="סכום התחלתי"><NumberInput value={start} onChange={setStart} step={500} suffix="₪" /></Field>
        <Field label="הפקדה חודשית"><NumberInput value={monthly} onChange={setMonthly} step={50} suffix="₪" /></Field>
        <Field label="גיל הילד"><NumberInput value={age} onChange={setAge} min={0} max={20} suffix="שנים" /></Field>
        <Field label="גיל יעד"><NumberInput value={target} onChange={setTarget} min={1} max={30} suffix="שנים" /></Field>
        <Field label="תשואה שנתית משוערת"><NumberInput value={rate} onChange={setRate} step={0.25} suffix="%" /></Field>
        <Field label="דמי ניהול שנתיים"><NumberInput value={fee} onChange={setFee} step={0.1} suffix="%" /></Field>
      </>}
      results={<>
        <ResultRow label={`סכום צפוי בגיל ${target}`} value={fmtILS(data.future)} accent />
        <ResultRow label="סך הפקדות" value={fmtILS(data.contributions)} />
        <ResultRow label="רווח משוער" value={fmtILS(data.profit)} />
        <ResultRow label="תקופת חיסכון" value={`${data.years} שנים`} />
      </>}
    />
  );
}
