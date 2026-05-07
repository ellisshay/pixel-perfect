import { useId, useRef, useState } from "react";
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
  consent: z.literal(true, { errorMap: () => ({ message: "נדרש אישור להעברת הפרטים" }) }),
  marketing: z.boolean().optional(),
});

const areas = ["פיננסי אישי", "משכנתאות", "הלוואות", "שוק ההון", "נדל״ן בארץ", "נדל״ן בחו״ל", "עסקים"];
const stages = ["טרם התחלתי", "אוסף מידע", "מוכן לפעולה", "בעיצומו של תהליך"];

export function ReferralForm({ defaultArea }: { defaultArea?: string }) {
  const [data, setData] = useState({ name: "", phone: "", email: "", area: defaultArea ?? "", budget: 0, stage: "", notes: "", consent: false, marketing: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const consentErrId = useId();
  const consentDescId = useId();
  const marketingDescId = useId();
  const formTitleId = useId();
  const firstErrorRef = useRef<HTMLElement | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const ee: Record<string, string> = {};
      r.error.issues.forEach((i) => { ee[i.path[0] as string] = i.message; });
      setErrors(ee);
      // Focus first invalid field
      requestAnimationFrame(() => {
        const first = document.querySelector<HTMLElement>("[data-form-root] [aria-invalid='true']");
        first?.focus();
      });
      return;
    }
    setErrors({});
    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border p-8 text-center"
        style={{ borderColor: "var(--success)", backgroundColor: "color-mix(in oklab, var(--success) 10%, transparent)" }}
      >
        <div className="text-2xl font-bold mb-2">קיבלנו את הפרטים ✓</div>
        <p className="text-muted-foreground">נחזור אליכם עם איש המקצוע המתאים. בינתיים, מומלץ להמשיך לקרוא ולהבין.</p>
      </div>
    );
  }

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring";
  const ai = (k: string) => (errors[k] ? true : undefined);

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 grid sm:grid-cols-2 gap-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
      noValidate
      aria-labelledby={formTitleId}
      data-form-root
    >
      <h2 id={formTitleId} className="sr-only">טופס השארת פרטים להפניה לאיש מקצוע</h2>

      <Field label="שם מלא" required error={errors.name}>
        <input
          className={inp} type="text" autoComplete="name" required
          value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
          maxLength={80} aria-invalid={ai("name")}
        />
      </Field>
      <Field label="טלפון" required error={errors.phone}>
        <input
          className={inp} type="tel" autoComplete="tel" required inputMode="tel"
          value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
          maxLength={20} aria-invalid={ai("phone")}
        />
      </Field>
      <Field label="אימייל" required error={errors.email}>
        <input
          className={inp} type="email" autoComplete="email" required inputMode="email"
          value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
          maxLength={255} aria-invalid={ai("email")}
        />
      </Field>
      <Field label="תחום עניין" required error={errors.area}>
        <select
          className={inp} required
          value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })}
          aria-invalid={ai("area")}
        >
          <option value="">בחרו תחום…</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </Field>
      <Field label="סכום משוער / תקציב (אופציונלי)">
        <NumberInput value={data.budget} onChange={(v) => setData({ ...data, budget: v })} step={10000} suffix="₪" aria-label="סכום משוער בשקלים" />
      </Field>
      <Field label="שלב נוכחי">
        <select className={inp} value={data.stage} onChange={(e) => setData({ ...data, stage: e.target.value })}>
          <option value="">בחרו…</option>
          {stages.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="הערות">
        <textarea
          className="w-full min-h-[80px] p-3 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring"
          value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })}
          maxLength={500}
        />
      </Field>

      <div className="sm:col-span-2 space-y-3">
        <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
          <input
            type="checkbox" className="mt-1 w-4 h-4 accent-primary"
            checked={data.consent}
            required
            aria-required="true"
            aria-invalid={ai("consent")}
            aria-describedby={`${consentDescId}${errors.consent ? ` ${consentErrId}` : ""}`}
            onChange={(e) => setData({ ...data, consent: e.target.checked })}
          />
          <span id={consentDescId}>
            אני מאשר/ת כי הפרטים שמסרתי, לרבות פרטי יצירת קשר, תחום עניין ונתוני רקע, יועברו במידת הצורך לגורמים מקצועיים, ספקים, שותפים עסקיים, שותפי שיווק או נותני שירות רלוונטיים לצורך יצירת קשר, התאמה, טיפול בפנייה והצעת שירותים — בהתאם ל
            <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">מדיניות הפרטיות</a> ול
            <a href="/legal/terms" target="_blank" rel="noreferrer" className="text-primary hover:underline">תנאי השימוש</a>.{" "}
            <span aria-hidden="true" className="text-destructive">*</span>
            <span className="sr-only"> (חובה)</span>
          </span>
        </label>
        {errors.consent && (
          <p id={consentErrId} role="alert" className="text-xs text-destructive">{errors.consent}</p>
        )}

        <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
          <input
            type="checkbox" className="mt-1 w-4 h-4 accent-primary"
            checked={data.marketing}
            aria-describedby={marketingDescId}
            onChange={(e) => setData({ ...data, marketing: e.target.checked })}
          />
          <span id={marketingDescId}>
            אני מאשר/ת קבלת דיוור שיווקי, עדכונים, מדריכים והצעות מהאתר ומשותפיו. ניתן להסיר הסכמה זו בכל עת.
          </span>
        </label>
      </div>

      <p className="sm:col-span-2 text-[11px] text-muted-foreground leading-relaxed bg-muted/50 border border-border rounded-lg p-3">
        <strong className="text-foreground">גילוי נאות:</strong> ייתכן שהאתר מקבל תמורה בגין הפניה זו. ההפניה אינה המלצה, אינה אישור איכות ואינה אחריות. למידע מלא — ראו <a href="/legal/disclosure" target="_blank" rel="noreferrer" className="text-primary hover:underline">גילוי נאות</a>.
      </p>

      <button
        type="submit"
        className="sm:col-span-2 h-12 rounded-full font-bold text-primary-foreground hover:scale-[1.01] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
      >
        שלחו פרטים להפניה
      </button>
    </form>
  );
}
