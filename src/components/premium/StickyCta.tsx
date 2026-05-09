import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, X, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type CtaConfig = { match: RegExp; label: string; to: string; domain: string };
const MAP: CtaConfig[] = [
  { match: /^\/mashkantaot|^\/calculators\/mortgage/, label: "בדוק כמה תחסוך על המשכנתא", to: "/calculators/mortgage", domain: "mortgages" },
  { match: /^\/tichnun-piansi|^\/calculators\/family/, label: "בדוק יציבות פיננסית משפחתית", to: "/calculators/family", domain: "planning" },
  { match: /^\/shuk-hahon|^\/calculators\/(invest|compound|fees)/, label: "כמה דמי ניהול אוכלים לך?", to: "/calculators/fees", domain: "investments" },
  { match: /^\/nadlan|^\/calculators\/realestate/, label: "בדוק תזרים עסקת הנדל״ן", to: "/calculators/realestate", domain: "real-estate" },
  { match: /^\/taoyot/, label: "בדוק אם גם אתה עושה את הטעויות", to: "/start", domain: "general" },
];
const DEFAULT: CtaConfig = { match: /.*/, label: "התחל אבחון פיננסי חינמי", to: "/start", domain: "general" };
const BLOCKED = /^\/(legal|thank-you|start|contact|login|admin)/;
const phoneRegex = /^0(5[0-9]|2|3|4|7[2-9]|8|9)[-\s]?\d{7}$/;

export function StickyCta() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { setClosed(false); setCapturing(false); setSent(false); setPhone(""); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (BLOCKED.test(pathname) || closed || !show) return null;
  const cta = MAP.find((m) => m.match.test(pathname)) ?? DEFAULT;

  const sendPhone = async () => {
    if (!phoneRegex.test(phone.trim())) return;
    setSending(true);
    await supabase.from("leads").insert({
      name: "מבקר אתר", phone: phone.trim(),
      email: `${phone.trim().replace(/\D/g, "")}@noemail.placeholder`,
      domain: cta.domain, source_page: pathname, source_cta: "sticky_cta", privacy_consent: true,
    });
    setSending(false); setSent(true);
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
      <div
        className="mx-auto max-w-2xl pointer-events-auto rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-3 p-2 pl-4 animate-fade-up"
        style={{ background: "color-mix(in oklab, var(--primary) 92%, transparent)", boxShadow: "var(--shadow-elegant)" }}
      >
        {sent ? (
          <div className="flex items-center gap-3 flex-1 min-w-0 text-primary-foreground">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-accent-foreground font-black"
              style={{ background: "var(--gradient-gold)" }}>✓</span>
            <p className="flex-1 text-sm font-bold truncate">קיבלנו! נחזור אליך תוך 24 שעות.</p>
            <button onClick={() => setClosed(true)} aria-label="סגור"
              className="w-8 h-8 rounded-full text-primary-foreground/70 hover:bg-white/10 flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
        ) : capturing ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Phone size={16} className="text-primary-foreground/80 shrink-0" />
            <input
              type="tel"
              inputMode="tel"
              placeholder="050-1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendPhone()}
              autoFocus
              dir="ltr"
              className="flex-1 h-9 px-3 rounded-xl bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:bg-white/15"
            />
            <button
              onClick={sendPhone}
              disabled={sending}
              className="inline-flex items-center gap-1 h-9 px-4 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition shrink-0 disabled:opacity-60"
              style={{ background: "var(--gradient-gold)" }}
            >
              {sending ? "…" : "שלח ←"}
            </button>
            <button onClick={() => setCapturing(false)} aria-label="חזור"
              className="w-8 h-8 rounded-full text-primary-foreground/60 hover:bg-white/10 flex items-center justify-center">
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <span className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-accent-foreground shrink-0 font-bold"
              style={{ background: "var(--gradient-gold)" }}>₪</span>
            <div className="flex-1 min-w-0 text-primary-foreground text-sm font-bold truncate">{cta.label}</div>
            <Link
              to={cta.to}
              className="hidden sm:inline-flex items-center gap-1 h-10 px-4 rounded-full text-sm font-bold bg-white/10 hover:bg-white/15 text-primary-foreground transition shrink-0 border border-white/15"
            >
              בדוק <ArrowLeft size={14} />
            </Link>
            <button
              onClick={() => setCapturing(true)}
              className="inline-flex items-center gap-1 h-10 px-4 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition shrink-0"
              style={{ background: "var(--gradient-gold)" }}
            >
              השאר פרטים
            </button>
            <button onClick={() => setClosed(true)} aria-label="סגור"
              className="w-9 h-9 rounded-full text-primary-foreground/70 hover:bg-white/10 flex items-center justify-center transition">
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}