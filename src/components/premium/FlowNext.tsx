import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calculator, AlertTriangle, BookOpen, Compass } from "lucide-react";

type Item = { to: string; kind: "calc" | "mistake" | "guide" | "path"; title: string; desc?: string };

const ICONS = { calc: Calculator, mistake: AlertTriangle, guide: BookOpen, path: Compass };
const LABEL = { calc: "מחשבון", mistake: "טעות נפוצה", guide: "מדריך", path: "מסלול" };

export function FlowNext({ items, title = "מה רוב האנשים בודקים אחרי זה?" }: { items: Item[]; title?: string }) {
  return (
    <section className="py-14 md:py-16 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Compass size={16} />
          </span>
          <h2 className="text-xl md:text-2xl font-black">{title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => {
            const Icon = ICONS[it.kind];
            return (
              <Link key={it.to} to={it.to}
                className="group relative p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all"
                style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-muted text-foreground/70 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <Icon size={14} />
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{LABEL[it.kind]}</span>
                </div>
                <h3 className="mt-3 font-bold text-sm leading-snug">{it.title}</h3>
                {it.desc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{it.desc}</p>}
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">המשך <ArrowLeft size={12} /></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
