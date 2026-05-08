import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const phoneRegex = /^0(5[0-9]|2|3|4|7[2-9]|8|9)[-\s]?\d{7}$/;

const SPECIALTIES = [
  "יועצ/ת משכנתאות",
  "מתכנן/ת פיננסי/ת",
  "סוכנ/ת ביטוח",
  "יועצ/ת פנסיה ופרישה",
  "רואה חשבון / יועצ/ת מס",
  "עו״ד צוואות וירושות",
  "יועצ/ת השקעות",
  "משווק/ת נדל״ן",
  "יועצ/ת עסקי/ת",
  "חברת אשראי / הלוואות",
  "אחר",
] as const;

const COOP_TYPES = ["תשלום לפי ליד", "עמלת הצלחה", "חבילת חשיפה חודשית", "שילוב / לדבר"];
const CAPACITY = ["1–5 לקוחות", "6–15 לקוחות", "16–40 לקוחות", "מעל 40"];

const schema = z.object({
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  business_name: z.string().trim().min(2, "נא למלא שם עסק").max(120),
  specialty: z.string().min(1, "נא לבחור תחום התמחות"),
  phone: z.string().trim().regex(phoneRegex, "מספר טלפון ישראלי לא תקין"),
  email: z.string().trim().email("אימייל לא תקין").max(255),
  region: z.string().trim().min(2, "נא למלא אזור פעילות").max(120),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  license: z.string().trim().max(120).optional().or(z.literal("")),
  capacity: z.string().min(1, "נא לבחור"),
  coop_type: z.string().min(1, "נא לבחור סוג שיתוף פעולה"),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "חובה לאשר את מדיניות הפרטיות" }) }),
});

type FormValues = z.infer<typeof schema>;

export function PartnersForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      domain: "partner",
      sub_domain: data.specialty,
      privacy_consent: data.privacy_consent,
      marketing_consent: false,
      source_page: typeof window !== "undefined" ? window.location.pathname : "/shitufim",
      metadata: {
        kind: "partner_application",
        business_name: data.business_name,
        region: data.region,
        website: data.website || null,
        license: data.license || null,
        capacity: data.capacity,
        coop_type: data.coop_type,
        notes: data.notes || null,
      } as never,
    });
    setSubmitting(false);
    if (error) {
      console.error("[partners]", error);
      setServerError("אירעה שגיאה בשליחה. נסו שוב בעוד רגע.");
      return;
    }
    navigate({ to: "/thank-you", search: { name: data.name, domain: "partner" } as never });
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const errCls = "text-xs text-destructive mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 grid sm:grid-cols-2 gap-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
      noValidate
      aria-label="טופס הצטרפות שותפים"
    >
      <div>
        <label className="block text-sm font-semibold mb-1.5">שם מלא <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        {errors.name && <p role="alert" className={errCls}>{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">שם העסק <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} autoComplete="organization" aria-invalid={!!errors.business_name} {...register("business_name")} />
        {errors.business_name && <p role="alert" className={errCls}>{errors.business_name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">תחום התמחות <span aria-hidden className="text-destructive">*</span></label>
        <select className={inp} aria-invalid={!!errors.specialty} {...register("specialty")}>
          <option value="">בחרו תחום…</option>
          {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.specialty && <p role="alert" className={errCls}>{errors.specialty.message}</p>}
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
        <label className="block text-sm font-semibold mb-1.5">אזור פעילות <span aria-hidden className="text-destructive">*</span></label>
        <input className={inp} placeholder="למשל: מרכז, שרון, ארצי" aria-invalid={!!errors.region} {...register("region")} />
        {errors.region && <p role="alert" className={errCls}>{errors.region.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">אתר אינטרנט</label>
        <input className={inp} type="url" placeholder="https://" {...register("website")} />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">מספר רישיון / הסמכה</label>
        <input className={inp} placeholder="אם רלוונטי" {...register("license")} />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5">קיבולת לידים בחודש <span aria-hidden className="text-destructive">*</span></label>
        <select className={inp} aria-invalid={!!errors.capacity} {...register("capacity")}>
          <option value="">בחרו…</option>
          {CAPACITY.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.capacity && <p role="alert" className={errCls}>{errors.capacity.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold mb-1.5">סוג שיתוף פעולה מועדף <span aria-hidden className="text-destructive">*</span></label>
        <select className={inp} aria-invalid={!!errors.coop_type} {...register("coop_type")}>
          <option value="">בחרו…</option>
          {COOP_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.coop_type && <p role="alert" className={errCls}>{errors.coop_type.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold mb-1.5">הערות נוספות</label>
        <textarea className="w-full px-4 py-3 rounded-xl border border-input bg-background min-h-[96px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("notes")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
          <input type="checkbox" className="mt-1 w-4 h-4 accent-primary" aria-invalid={!!errors.privacy_consent} {...register("privacy_consent")} />
          <span>
            אני מאשר/ת את <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-primary underline">מדיניות הפרטיות</a> ומסכים/ה שייצרו עמי קשר לבחינת שיתוף פעולה. <span aria-hidden className="text-destructive">*</span>
          </span>
        </label>
        {errors.privacy_consent && <p role="alert" className={errCls}>{errors.privacy_consent.message as string}</p>}
      </div>

      {serverError && <p role="alert" className="sm:col-span-2 text-sm text-destructive text-center">{serverError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 h-12 rounded-full font-bold text-accent-foreground hover:scale-[1.01] transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
      >
        {submitting ? "שולח…" : "שליחת בקשת הצטרפות ←"}
      </button>
    </form>
  );
}
