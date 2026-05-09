import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { X, Sparkles, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "hamapa_exit_intent_v1";

export function ExitIntent() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (/^\/(legal|contact|start|thank-you|login|admin)/.test(pathname)) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let armed = false;
    const armTimer = window.setTimeout(() => { armed = true; }, 8000);

    const trigger = () => {
      if (!armed || open) return;
      setOpen(true);
      try { window.sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 0) trigger();
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname, open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 p-8 md:p-10 text-primary-foreground overflow-hidden animate-fade-up"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
      >
        <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }} />
        <button
          onClick={() => setOpen(false)}
          aria-label="סגור"
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <X size={16} />
        </button>

        <div className="relative">
          <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
            <Sparkles size={12} /> רגע לפני שאתה עוזב
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold leading-tight">
            גלה איפה אתה באמת על המפה הפיננסית
          </h2>
          <p className="mt-3 text-sm md:text-base text-primary-foreground/80 leading-relaxed">
            אבחון של 90 שניות. בלי הרשמה, בלי שיחות מכירה. רק תמונת מצב מדויקת ומה הצעד הבא שלך.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/start"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition"
              style={{ background: "var(--gradient-gold)" }}
            >
              התחל אבחון <ArrowLeft size={14} />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="h-12 px-5 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 transition border border-white/15"
            >
              לא עכשיו
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "90 שניות", v: "אבחון מהיר" },
              { k: "0 ₪", v: "ללא עלות" },
              { k: "100%", v: "אנונימי" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <div className="text-base font-extrabold">{s.k}</div>
                <div className="text-[11px] text-primary-foreground/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}