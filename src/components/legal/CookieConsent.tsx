import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

export type CookiePrefs = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "hamapa_cookie_prefs_v1";

export function loadPrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePrefs;
  } catch {
    return null;
  }
}

export function savePrefs(p: Omit<CookiePrefs, "necessary" | "updatedAt">) {
  const full: CookiePrefs = {
    necessary: true,
    preferences: p.preferences,
    analytics: p.analytics,
    marketing: p.marketing,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  window.dispatchEvent(new CustomEvent("cookie-prefs-changed", { detail: full }));
  return full;
}

export function clearPrefs() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("cookie-prefs-changed", { detail: null }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [prefs, setPrefs] = useState({ preferences: false, analytics: false, marketing: false });
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const existing = loadPrefs();
    if (!existing) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
    setPrefs({ preferences: existing.preferences, analytics: existing.analytics, marketing: existing.marketing });
  }, []);

  useEffect(() => {
    const onOpen = () => { setAdvanced(true); setOpen(true); };
    window.addEventListener("open-cookie-settings", onOpen);
    return () => window.removeEventListener("open-cookie-settings", onOpen);
  }, []);

  // Focus management & ESC handling
  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>("button, [href], input");
      first?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "Tab") {
        // Simple focus trap
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"])'
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const acceptAll = () => { savePrefs({ preferences: true, analytics: true, marketing: true }); setOpen(false); };
  const rejectAll = () => { savePrefs({ preferences: false, analytics: false, marketing: false }); setOpen(false); };
  const saveCustom = () => { savePrefs(prefs); setOpen(false); };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 md:p-5"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card text-foreground shadow-2xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-elegant)" }}>
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
              style={{ background: "var(--gradient-hero)" }}>🍪</span>
            <div className="flex-1">
              <h2 id={titleId} className="font-bold text-base md:text-lg">אנו משתמשים בעוגיות (Cookies)</h2>
              <p id={descId} className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">
                האתר עושה שימוש בעוגיות הכרחיות לתפעול, ובעוגיות אופציונליות להעדפות, אנליטיקה ושיווק.
                עוגיות שאינן הכרחיות יופעלו רק לאחר הסכמתך המפורשת. ניתן לשנות את הבחירה בכל עת.
                למידע מלא — <Link to="/legal/cookies" className="text-primary hover:underline">מדיניות העוגיות</Link>.
              </p>
            </div>
          </div>

          {advanced && (
            <fieldset className="mt-5 space-y-2 border-t border-border pt-4 border-0 border-t">
              <legend className="sr-only">בחירת קטגוריות עוגיות</legend>
              <Row label="הכרחיות" desc="חיוניות לפעולת האתר. לא ניתן לכבות." checked locked />
              <Row label="העדפות" desc="שמירת בחירות (שפה, תצוגה, הסכמות קודמות)."
                checked={prefs.preferences} onChange={(v) => setPrefs({ ...prefs, preferences: v })} />
              <Row label="אנליטיקה ומדידה" desc="Google Analytics וכלים דומים — סטטיסטיקות שימוש מצטברות."
                checked={prefs.analytics} onChange={(v) => setPrefs({ ...prefs, analytics: v })} />
              <Row label="שיווק ורימרקטינג" desc="Meta Pixel, Google Ads, רשתות שותפים — פרסום מותאם ומדידת קמפיינים."
                checked={prefs.marketing} onChange={(v) => setPrefs({ ...prefs, marketing: v })} />
            </fieldset>
          )}

          <div className="mt-5 flex flex-wrap gap-2 justify-end">
            {!advanced && (
              <button type="button" onClick={() => setAdvanced(true)}
                className="h-10 px-4 rounded-full text-sm font-bold border border-border hover:bg-muted transition">
                התאמה אישית
              </button>
            )}
            <button type="button" onClick={rejectAll}
              className="h-10 px-4 rounded-full text-sm font-bold border border-border hover:bg-muted transition">
              דחה הכל
            </button>
            {advanced && (
              <button type="button" onClick={saveCustom}
                className="h-10 px-4 rounded-full text-sm font-bold border border-primary text-primary hover:bg-primary/10 transition">
                שמירת בחירה
              </button>
            )}
            <button type="button" onClick={acceptAll}
              className="h-10 px-5 rounded-full text-sm font-bold text-primary-foreground hover:scale-[1.02] transition"
              style={{ background: "var(--gradient-hero)" }}>
              אשר הכל
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, desc, checked, onChange, locked }: { label: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; locked?: boolean }) {
  const id = useId();
  const descId = useId();
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border border-border ${locked ? "bg-muted/40" : "bg-background hover:bg-muted/40"} transition`}>
      <input
        id={id}
        type="checkbox"
        className="mt-1 w-4 h-4 accent-primary"
        checked={checked}
        disabled={locked}
        aria-describedby={descId}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className="flex-1 cursor-pointer">
        <div className="text-sm font-bold">
          {label}
          {locked && <span className="mr-2 text-[10px] font-medium text-muted-foreground">(תמיד פעיל)</span>}
        </div>
        <div id={descId} className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
      </label>
    </div>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("open-cookie-settings"));
}
