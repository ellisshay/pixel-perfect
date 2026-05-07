import { useEffect, useState } from "react";

const DEFAULTS = [
  "₪412,000 אובדים בממוצע בגלל דמי ניהול לאורך הקריירה",
  "78% מהמשפחות לא יודעות כמה המשכנתא באמת עולה להן",
  "רוב האנשים מתחילים לחשוב על פנסיה מאוחר מדי",
  "כסף שיושב בעו״ש נשחק כל יום מאינפלציה",
  "0.5% דמי ניהול = ₪300,000 פחות בפנסיה",
  "מיחזור משכנתא נכון יכול לחסוך מאות אלפי שקלים",
];

export function Ticker({ items = DEFAULTS, intervalMs = 3500 }: { items?: string[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), intervalMs);
    return () => clearInterval(t);
  }, [items.length, intervalMs]);
  return (
    <div className="relative overflow-hidden h-7" role="status" aria-live="polite">
      {items.map((t, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex items-center gap-2 transition-all duration-500"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-pulse" />
          <span className="truncate">{t}</span>
        </div>
      ))}
    </div>
  );
}
