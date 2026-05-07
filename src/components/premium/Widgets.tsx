import { Counter } from "./Counter";
import { TrendingUp, TrendingDown, Activity, Percent, Clock } from "lucide-react";

/** Visual finance widgets — illustrative, not live market data. */
export function Widget({ title, value, hint, icon: Icon, trend = "up", accent = false }: {
  title: string; value: string | React.ReactNode; hint?: string; icon: React.ComponentType<{ size?: number }>;
  trend?: "up" | "down" | "neutral"; accent?: boolean;
}) {
  const Trend = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="flex items-start justify-between">
        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground"
          style={{ background: accent ? "var(--gradient-gold)" : "var(--gradient-hero)" }}>
          <Icon size={16} />
        </span>
        <Trend size={16} className={trendColor} aria-hidden="true" />
      </div>
      <div className="mt-4 text-xs font-semibold text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-black tabular-nums">{value}</div>
      {hint && <div className="mt-2 text-[11px] text-muted-foreground leading-relaxed">{hint}</div>}
    </div>
  );
}

export function WidgetsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Widget icon={Percent} title="ריבית במשק" value={<><Counter value={4.5} decimals={2} suffix="%" /></>} hint="ריבית בנק ישראל להמחשה" />
      <Widget icon={TrendingUp} title="אינפלציה שנתית" value={<><Counter value={3.1} decimals={1} suffix="%" /></>} hint="שוחק כסף שיושב בעו״ש" trend="down" />
      <Widget icon={Activity} title="דמי ניהול ממוצעים" value={<><Counter value={0.92} decimals={2} suffix="%" /></>} hint="קופ״ג להמחשה" trend="down" />
      <Widget icon={Clock} title="כוח ריבית דריבית" value={<>×<Counter value={7.6} decimals={1} /></>} hint="פי כמה גדל כסף ב-30 שנה ב-7%" accent />
    </div>
  );
}
