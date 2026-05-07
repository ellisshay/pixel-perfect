import { useState } from "react";
import { z } from "zod";
import { Field, NumberInput } from "@/components/calculators/Field";

const schema = z.object({
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,20}$/, "מספר לא תקין"),
  email: z.string().trim().email("אימייל לא תקין").max(255),
  area: z.string().min(1, "נא לבחור תחום"),
  budget: z.number().min(0).max(1_000_000_000).optional(),
  stage: z.string().max(120).optional(),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "נדרש אישור" }) }),
  marketing: z.boolean().optional(),
});

const areas = ["פיננסי אישי", "משכנתאות", "הלוואות", "שוק ההון", "נדל״ן בארץ", "נדל״ן בחו״ל", "עסקים"];
const stages = ["טרם התחלתי", "אוסף מידע", "מוכן לפעולה", "בעיצומו של תהליך"];

export function ReferralForm({ defaultArea }: { defaultArea?: string }) {
  const [data, setData] = useState({ name: "", phone: "", email: "", area: defaultArea ?? "", budget: 0, stage: "", notes: "", consent: false, marketing: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const ee: Record<string, string> = {};
      r.error.issues.forEach((i) => { ee[i.path[0] as string] = i.message; });
      setErrors(ee);
      return;
    }
    setErrors({});
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center" style={{ borderColor: "var(--success)", backgroundColor: "color-mix(in oklab, var(--success) 10%, transparent)" }}>
        <div className="text-2xl font-bold mb-2">קיבלנו את הפרטים ✓</div>
        <p className="text-muted-foreground">נחזור אליכם עם איש המקצוע המתאים. בינתיים, מומלץ להמשיך לקרוא ולהבין.</p>
      </div>
    );
  }

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/50";
  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 md:p-8 grid sm:grid-cols-2 gap-4" style={{ boxShadow: "var(--shadow-soft)" }} noValidate>
      <Field label="שם מלא"><input className={inp} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} maxLength={80} />{errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name}</span>}</Field>
      <Field label="טלפון"><input type="tel" className={inp} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} maxLength={20} />{errors.phone && <span className="text-xs text-destructive mt-1 block">{errors.phone}</span>}</Field>
      <Field label="אימייל"><input type="email" className={inp} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} maxLength={255} />{errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email}</span>}</Field>
      <Field label="תחום עניין">
        <select className={inp} value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })}>
          <option value="">בחר תחום…</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        {errors.area && <span className="text-xs text-destructive mt-1 block">{errors.area}</span>}
      </Field>
      <Field label="סכום משוער / תקציב (אופציונלי)"><NumberInput value={data.budget} onChange={(v) => setData({ ...data, budget: v })} step={10000} suffix="₪" /></Field>
      <Field label="שלב נוכחי">
        <select className={inp} value={data.stage} onChange={(e) => setData({ ...data, stage: e.target.value })}>
          <option value="">בחרו…</option>
          {stages.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="הערות"><textarea className="w-full min-h-[80px] p-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/50" value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} maxLength={500} /></Field>
      <label className="sm:col-span-2 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
        <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" checked={data.consent} onChange={(e) => setData({ ...data, consent: e.target.checked })} />
        <span>
          אני מאשר/ת כי הפרטים שמסרתי, לרבות פרטי יצירת קשר, תחום עניין ונתוני רקע, יועברו במידת הצורך לגורמים מקצועיים, ספקים, שותפים עסקיים, שותפי שיווק או נותני שירות רלוונטיים לצורך יצירת קשר, התאמה, טיפול בפנייה והצעת שירותים — בהתאם ל
          <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">מדיניות הפרטיות</a> ול
          <a href="/legal/terms" target="_blank" rel="noreferrer" className="text-primary hover:underline">תנאי השימוש</a>. *
        </span>
      </label>
      {errors.consent && <span className="text-xs text-destructive sm:col-span-2 -mt-3">{errors.consent}</span>}
      <label className="sm:col-span-2 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
        <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" checked={data.marketing} onChange={(e) => setData({ ...data, marketing: e.target.checked })} />
        <span>אני מאשר/ת קבלת דיוור שיווקי, עדכונים, מדריכים והצעות מהאתר ומשותפיו. ניתן להסיר הסכמה זו בכל עת.</span>
      </label>
      <p className="sm:col-span-2 text-[11px] text-muted-foreground leading-relaxed bg-muted/50 border border-border rounded-lg p-3">
        <strong className="text-foreground">גילוי נאות:</strong> ייתכן שהאתר מקבל תמורה בגין הפניה זו. ההפניה אינה המלצה, אינה אישור איכות ואינה אחריות. למידע מלא — ראו <a href="/legal/disclosure" target="_blank" rel="noreferrer" className="text-primary hover:underline">גילוי נאות</a>.
      </p>
      <button type="submit" className="sm:col-span-2 h-12 rounded-full font-bold text-primary-foreground hover:scale-[1.01] transition-all" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
        שלחו פרטים להפניה
      </button>
    </form>
  );
}
