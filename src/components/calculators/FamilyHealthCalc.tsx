import { useMemo, useState } from "react";
import { CalcShell, ResultRow } from "./CalcShell";
import { Field, NumberInput, fmtILS } from "./Field";

const incomeFields = ["שכר נטו 1", "שכר נטו 2", "הכנסות נוספות"];
const expenseFields = ["דיור", "מזון", "רכב", "חינוך", "חשבונות", "תקשורת", "בילויים", "הלוואות", "אחר"];

export function FamilyHealthCalc() {
  const [income, setIncome] = useState<number[]>([15000, 12000, 0]);
  const [expense, setExpense] = useState<number[]>([6000, 4000, 2500, 2000, 1500, 800, 1500, 1500, 500]);
  const [liquid, setLiquid] = useState(80_000);
  const [pension, setPension] = useState(250_000);
  const [property, setProperty] = useState(1_800_000);
  const [loans, setLoans] = useState(60_000);
  const [mortgage, setMortgage] = useState(900_000);

  const totals = useMemo(() => {
    const inc = income.reduce((a, b) => a + b, 0);
    const exp = expense.reduce((a, b) => a + b, 0);
    const surplus = inc - exp;
    const assets = liquid + pension + property;
    const debts = loans + mortgage;
    const net = assets - debts;
    const buffer = exp > 0 ? liquid / exp : 0;
    let stage = "יציבות";
    let score = 50;
    if (surplus < 0) { stage = "יציבות (גירעון)"; score = 25; }
    else if (buffer < 3) { stage = "יציבות"; score = 50; }
    else if (buffer >= 3 && surplus > 0) { stage = "צמיחה סולידית"; score = 70; }
    if (net > assets * 0.6 && surplus > exp * 0.2) { stage = "מינוף זהיר"; score = 85; }
    return { inc, exp, surplus, assets, debts, net, buffer, stage, score };
  }, [income, expense, liquid, pension, property, loans, mortgage]);

  const upd = (arr: number[], setter: (a: number[]) => void, idx: number, v: number) => {
    const c = [...arr]; c[idx] = v; setter(c);
  };

  return (
    <CalcShell
      title="מצב פיננסי משפחתי"
      desc="קבל תמונת מצב מלאה: עודף/גירעון, נטו פיננסי, שלב במפה ומסלולי פעולה."
      inputs={<>
        <div className="sm:col-span-2"><h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">הכנסות</h3></div>
        {incomeFields.map((l, i) => (
          <Field key={l} label={l}><NumberInput value={income[i]} onChange={(v) => upd(income, setIncome, i, v)} step={500} suffix="₪" /></Field>
        ))}
        <div className="sm:col-span-2"><h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 mt-2">הוצאות חודשיות</h3></div>
        {expenseFields.map((l, i) => (
          <Field key={l} label={l}><NumberInput value={expense[i]} onChange={(v) => upd(expense, setExpense, i, v)} step={100} suffix="₪" /></Field>
        ))}
        <div className="sm:col-span-2"><h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 mt-2">נכסים והתחייבויות</h3></div>
        <Field label="חסכונות נזילים"><NumberInput value={liquid} onChange={setLiquid} step={1000} suffix="₪" /></Field>
        <Field label="פנסיה / גמל / השתלמות"><NumberInput value={pension} onChange={setPension} step={1000} suffix="₪" /></Field>
        <Field label="נכסי נדל״ן"><NumberInput value={property} onChange={setProperty} step={10000} suffix="₪" /></Field>
        <Field label="הלוואות"><NumberInput value={loans} onChange={setLoans} step={1000} suffix="₪" /></Field>
        <Field label="משכנתא"><NumberInput value={mortgage} onChange={setMortgage} step={10000} suffix="₪" /></Field>
      </>}
      results={<>
        <ResultRow label="עודף / גירעון חודשי" value={fmtILS(totals.surplus)} accent warn={totals.surplus < 0} />
        <ResultRow label="נטו פיננסי (נכסים-חובות)" value={fmtILS(totals.net)} />
        <ResultRow label="כרית ביטחון (חודשי הוצאה)" value={`${totals.buffer.toFixed(1)} חודשים`} warn={totals.buffer < 3} />
        <ResultRow label="שלב במפה" value={totals.stage} />
        <div>
          <div className="text-xs text-primary-foreground/80 mb-2">מדד יציבות</div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full" style={{ width: `${totals.score}%`, background: "var(--gradient-gold)" }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-white/10 border border-white/15"><div className="font-bold mb-1">יציבות</div><div className="text-primary-foreground/75">סדר, חובות, כרית ביטחון</div></div>
          <div className="p-3 rounded-lg bg-white/10 border border-white/15"><div className="font-bold mb-1">צמיחה</div><div className="text-primary-foreground/75">חיסכון והשקעה סולידית</div></div>
          <div className="p-3 rounded-lg bg-white/10 border border-white/15"><div className="font-bold mb-1">מינוף</div><div className="text-primary-foreground/75">נדל״ן, צמיחה מואצת</div></div>
        </div>
      </>}
    />
  );
}
