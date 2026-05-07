import { ReactNode } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

type To = string;

export function WarningBlock({ title, children, ctaTo, ctaLabel }: {
  title: string; children: ReactNode; ctaTo?: To; ctaLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 md:p-6"
      style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} />
        </span>
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-lg">{title}</h3>
          <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{children}</div>
          {ctaTo && ctaLabel && (
            // @ts-expect-error - generic Link path
            <Link to={ctaTo} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all">
              {ctaLabel} <ArrowLeft size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
