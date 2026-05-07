import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";

type CtaMap = { match: RegExp; label: string; to: string }[];

const MAP: CtaMap = [
  { match: /^\/mashkantaot|^\/calculators\/mortgage/, label: "בדוק כמה באמת תשלם על המשכנתא", to: "/calculators/mortgage" },
  { match: /^\/tichnun-piansi|^\/calculators\/family/, label: "בדוק יציבות פיננסית משפחתית", to: "/calculators/family" },
  { match: /^\/shuk-hahon|^\/calculators\/(invest|compound)/, label: "בדוק כמה דמי ניהול אוכלים לך", to: "/calculators/compound" },
  { match: /^\/nadlan|^\/calculators\/realestate/, label: "בדוק תזרים עסקת נדל״ן", to: "/calculators/realestate" },
  { match: /^\/taoyot/, label: "בדוק אם גם אתה עושה את הטעויות", to: "/start" },
  { match: /^\/blog/, label: "המשך לשאלון: איפה אתם על המפה?", to: "/start" },
];

const DEFAULT = { label: "התחל את האבחון הפיננסי", to: "/start" };

export function StickyCta() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => { setClosed(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on certain routes
  if (/^\/(legal|contact|start)/.test(pathname)) return null;
  if (closed || !show) return null;

  const cta = MAP.find((m) => m.match.test(pathname)) ?? DEFAULT;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
      <div className="mx-auto max-w-2xl pointer-events-auto rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-3 p-2 pl-4 animate-fade-up"
        style={{ background: "color-mix(in oklab, var(--primary) 92%, transparent)", boxShadow: "var(--shadow-elegant)" }}>
        <span className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-accent-foreground shrink-0" style={{ background: "var(--gradient-gold)" }}>
          ₪
        </span>
        <div className="flex-1 min-w-0 text-primary-foreground text-sm font-bold truncate">
          {cta.label}
        </div>
        <Link to={cta.to} className="inline-flex items-center gap-1 h-10 px-4 rounded-full text-sm font-bold text-accent-foreground hover:scale-[1.02] transition shrink-0"
          style={{ background: "var(--gradient-gold)" }}>
          המשך <ArrowLeft size={14} />
        </Link>
        <button onClick={() => setClosed(true)} aria-label="סגור" className="w-9 h-9 rounded-full text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 flex items-center justify-center transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
