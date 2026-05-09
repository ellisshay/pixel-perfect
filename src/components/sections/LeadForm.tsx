import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const phoneRegex = /^0(5[0-9]|2|3|4|7[2-9]|8|9)[-\s]?\d{7}$/;

const schema = z.object({
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  phone: z.string().trim().regex(phoneRegex, "מספר טלפון ישראלי לא תקין (למשל 050-1234567)"),
  email: z.string().trim().email("אימייל לא תקין").max(255),
  domain: z.string().min(1, "נא לבחור תחום"),
  capital_range: z.string().min(1, "נא לבחור הון עצמי"),
  decision_stage: z.string().optional(),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "חובה לאשר את מדיניות הפרטיות" }) }),
  marketing_consent: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export const DOMAINS = [
  { slug: "mortgages", title: "משכנתאות" },
  { slug: "investments", title: "שוק ההון" },
  { slug: "real-estate", title: "נדל״ן ישראל" },
  { slug: "global-re", title: "נדל״ן חו״ל" },
  { slug: "planning", title: "תכנון פיננסי" },
  { slug: "credit", title: "אשראי והלוואות" },
  { slug: "business", title: "עסקים קטנים" },
  { slug: "retirement", title: "פרישה ופנסיה" },
] as const;

const CAPITAL = ["עד 100,000 ₪", "100,000 – 500,000 ₪", "500,000 – 2,000,000 ₪", "מעל 2,000,000 ₪"];
const STAGES = ["בוחן/ת אפשרויות", "מוכן/ה לפעול", "צריך/ה ייעוץ ראשוני"];

export function LeadForm({ defaultDomain, sourcePage, metadata }: {
  defaultDomain?: string;
  sourcePage?: string;
  metadata?: Record<string, unknown>;
}) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      domain: defaultDomain ?? "",
      capital_range: "",
      decision_stage: "",
      marketing_consent: false,
    } as Partial<FormValues> as FormValues,
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      domain: data.domain,
      capital_range: data.capital_range,
      decision_stage: data.decision_stage || null,
      privacy_consent: data.privacy_consent,
      marketing_consent: !!data.marketing_consent,
      source_page: sourcePage ?? (typeof window !== "undefined" ? window.location.pathname : null),
      metadata: (metadata as never) ?? {},
    });
    setSubmitting(false);
    if (error) {
      console.error("[leads]", error);
      setServerError("אירעה שגיאה בשליחה. נסו שוב בעוד רגע.");
      return;
    }
    navigate({ to: "/thank-you", search: { name: data.name, domain: data.domain } as never });
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const errCls = "text-xs text-destructive mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 grid sm:grid-cols-2 gap-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
      noValidate
      aria-label="טופס השארת פרטים"
    >
      <div>
        <label className="block text-sm font-semibold mb-1.5">שם מלא <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} aria-invalid={!!errors.name} autoComplete="name" {...register("name")} />
        {errors.name && <p role="alert" className={errCls}>{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">טלפון <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} type="tel" inputMode="tel" placeholder="050-1234567" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
        {errors.phone && <p role="alert" className={errCls}>{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold mb-1.5">אימייל <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
        {errors.email && <p role="alert" className={errCls}>{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">תחום עניין <span aria-hidden className="text-destructive">*</span></label>
        <select className={inp} aria-invalid={!!errors.domain} {...register("domain")}>
          <option value="">בחרו תחום…</option>
          {DOMAINS.map((d) => <option key={d.slug} value={d.slug}>{d.title}</option>)}
        </select>
        {errors.domain && <p role="alert" className={errCls}>{errors.domain.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">הון עצמי זמין <span aria-hidden className="text-destructive">*</span></label>
        <select className={inp} aria-invalid={!!errors.capital_range} {...register("capital_range")}>
          <option value="">בחרו…</option>
          {CAPITAL.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.capital_range && <p role="alert" className={errCls}>{errors.capital_range.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold mb-1.5">שלב ההחלטה</label>
        <select className={inp} {...register("decision_stage")}>
          <option value="">בחרו…</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="sm:col-span-2 space-y-3 mt-2">
        <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
          <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" aria-invalid={!!errors.privacy_consent} {...register("privacy_consent")} />
          <span>
            קראתי ואני מסכים/ה ל
            <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-primary underline">מדיניות הפרטיות</a> ול
            <a href="/legal/terms" target="_blank" rel="noreferrer" className="text-primary underline">תנאי השימוש</a>.
            המידע יועבר לאיש המקצוע הרלוונטי בלבד. <span aria-hidden className="text-destructive">*</span>
          </span>
        </label>
        {errors.privacy_consent && <p role="alert" className={errCls}>{errors.privacy_consent.message as string}</p>}

        <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
          <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" {...register("marketing_consent")} />
          <span>אני מסכים/ה לקבל עדכונים ותכנים שיווקיים. ניתן לביטול בכל עת.</span>
        </label>
      </div>

      <p className="sm:col-span-2 text-[11px] text-muted-foreground bg-muted/50 border border-border rounded-lg p-3 text-center">
        🔒 מוגן SSL · חוק הגנת הפרטיות תשמ״א-1981
      </p>

      {serverError && (
        <p role="alert" className="sm:col-span-2 text-sm text-destructive text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 h-12 rounded-full font-bold text-accent-foreground hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
      >
        {submitting ? "שולח…" : "שלח — אחזור אליך תוך 24 שעות ←"}
      </button>
    </form>
  );
}