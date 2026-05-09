import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { X, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const phoneRegex = /^0(5[0-9]|2|3|4|7[2-9]|8|9)[-\s]?\d{7}$/;
const BLOCKED = /^\/(legal|thank-you|start|contact|login|admin)/;

type Copy = { headline: string; sub: string };
const COPY_MAP: { match: RegExp; copy: Copy }[] = [
  { match: /mashkantaot|calculators\/mortgage/, copy: { headline: "רגע לפני שאתה הולך — בדקת כמה אפשר לחסוך על המשכנתא?", sub: "השאר טלפון. נחזור תוך 24 שעות עם בדיקת מיחזור ראשונית — חינם." } },
  { match: /shuk-hahon|calculators\/(invest|fees|compound)/, copy: { headline: "עוד שנייה — ראית כמה דמי ניהול קטנים שוחקים לך את הפנסיה?", sub: "השאר טלפון ונבדוק יחד את ההשפעה על המצב שלך — ללא עלות." } },
  { match: /nadlan|calculators\/realestate/, copy: { headline: "לא בטוח שהעסקה משתלמת? בדוק לפני שחותם.", sub: "השאר טלפון ומומחה נדל״ן יבדוק איתך את התזרים — חינם, ללא התחייבות." } },
];
const DEFAULT_COPY: Copy = { headline: "רגע לפני שאתה הולך — השאר טלפון.", sub: "נחזור אליך תוך 24 שעות עם כיוון ראשוני. ללא עלות, ללא התחייבות." };

function getCopy(pathname: string): Copy {
  return COPY_MAP.find(({ match }) => match.test(pathname))?.copy ?? DEFAULT_COPY;
}

function MiniForm({ sourcePage, onSuccess }: { sourcePage: string; onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const trimmed = phone.trim();
    if (!phoneRegex.test(trimmed)) { setError("מספר לא תקין (למשל 050-1234567)"); return; }
    setError(null); setLoading(true);
    const { error: sbErr } = await supabase.from("leads").insert({
      name: "מבקר אתר", phone: trimmed,
      email: `${trimmed.replace(/\D/g, "")}@noemail.placeholder`,
      domain: "general", source_page: sourcePage, source_cta: "exit_intent", privacy_consent: true,
    });
    setLoading(false);
    if (sbErr) { setError("שגיאה — נסה שוב"); return; }
    onSuccess();
  };

  return (
    <div className="mt-5">
      <div className="flex gap-2">
        <input
          type="tel"
          inputMode="tel"
          placeholder="050-1234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          dir="ltr"
          autoFocus
        />
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="h-11 px-5 rounded-xl text-sm font-bold text-primary-foreground hover:scale-[1.02] transition disabled:opacity-60"
          style={{ background: "var(--gradient-hero)" }}
        >
          {loading ? "שולח…" : "שלח ←"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive font-medium">{error}</p>}
      <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
        ללא התחייבות. לא מוכרים את הפרטים.
      </p>
    </div>
  );
}

export function ExitIntent() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => { firedRef.current = false; }, [pathname]);

  useEffect(() => {
    if (BLOCKED.test(pathname)) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit_intent_shown")) return;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 20 || firedRef.current) return;
      firedRef.current = true;
      sessionStorage.setItem("exit_intent_shown", "1");
      setOpen(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [pathname]);

  if (!open) return null;
  const copy = getCopy(pathname);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-border bg-card text-foreground p-7 md:p-9 animate-fade-up"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="סגור"
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition"
        >
          <X size={16} />
        </button>

        <div className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full bg-accent/10 text-primary border border-accent/30">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          מומחה פנוי עכשיו
        </div>

        {done ? (
          <div className="mt-5 text-center py-4">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground text-2xl font-black"
              style={{ background: "var(--gradient-hero)" }}>✓</div>
            <h3 className="mt-4 text-xl font-extrabold">קיבלנו — תודה!</h3>
            <p className="mt-2 text-sm text-muted-foreground">נחזור אליך תוך 24 שעות עם כיוון ראשוני.</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
            >
              המשך לגלוש <ArrowLeft size={14} />
            </button>
          </div>
        ) : (
          <>
            <h3 className="mt-4 text-xl md:text-2xl font-extrabold leading-tight">{copy.headline}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{copy.sub}</p>
            <MiniForm sourcePage={pathname} onSuccess={() => setDone(true)} />
          </>
        )}
      </div>
    </div>
  );
}