import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS, fmtNum } from "./Field";

const ANNUAL_RETURN = 0.055;
const RETIREMENT_AGE = 67;
const WITHDRAW_MONTHS = 240;

export function PensionCalc() {
  const [age, setAge] = useState(40);
  const [existing, setExisting] = useState(250_000);
  const [monthly, setMonthly] = useState(2_500);
  const [salary, setSalary] = useState(15_000);

  const { atRetirement, monthlyPension, gapPct, neededExtra } = useMemo(() => {
    const years = Math.max(0, RETIREMENT_AGE - age);
    const n = years * 12;
    const r = ANNUAL_RETURN / 12;
    const fvLump = existing * Math.pow(1 + r, n);
    const fvStream = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
    const total = fvLump + fvStream;
    const pension = total / WITHDRAW_MONTHS;
    const gap = salary > 0 ? (1 - pension / salary) * 100 : 0;

    // Solve for additional monthly to close the gap (target = salary)
    const targetTotal = salary * WITHDRAW_MONTHS;
    const need = Math.max(0, targetTotal - total);
    const addMonthly = n > 0 && need > 0
      ? need / ((Math.pow(1 + r, n) - 1) / r)
      : 0;

    return { atRetirement: total, monthlyPension: pension, gapPct: gap, neededExtra: addMonthly };
  }, [age, existing, monthly, salary]);

  const big = gapPct > 30;

  return (
    <CalcShell
      title="מחשבון פנסיה"
      desc="הערכת צבירה בגיל 67, קצבה חודשית והפער מהמשכורת — בהנחת תשואה שנתית 5.5% ומשיכה ל-20 שנים."
      inputs={<>
        <Field label="גיל נוכחי"><NumberInput value={age} onChange={setAge} min={25} max={64} /></Field>
        <Field label="חיסכון פנסיוני קיים"><NumberInput value={existing} onChange={setExisting} step={10_000} suffix="₪" /></Field>
        <Field label="הפרשה חודשית נטו"><NumberInput value={monthly} onChange={setMonthly} step={500} suffix="₪" /></Field>
        <Field label="משכורת נוכחית"><NumberInput value={salary} onChange={setSalary} step={1000} suffix="₪" /></Field>
      </>}
      results={<>
        <ResultRow label={`צבירה צפויה בגיל ${RETIREMENT_AGE}`} value={fmtILS(atRetirement)} accent />
        <ResultRow label="קצבה חודשית משוערת" value={fmtILS(monthlyPension)} />
        <ResultRow label="פער מהמשכורת הנוכחית" value={`${fmtNum(Math.max(0, gapPct), 1)}%`} warn={big} />
        {neededExtra > 0 && (
          <p className="text-xs text-primary-foreground/80 leading-relaxed">
            כדי לסגור את הפער מומלץ להגדיל הפרשה חודשית בכ-<strong>{fmtILS(neededExtra)}</strong>.
          </p>
        )}
      </>}
      footer="הנחות: תשואה שנתית 5.5%, גיל פרישה 67, משיכה ל-20 שנה. תוצאה אינה התחייבות, אינה ייעוץ ואינה מבטיחה תשואה."
    />
  );
}