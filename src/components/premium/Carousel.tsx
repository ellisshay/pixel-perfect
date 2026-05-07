import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ title, eyebrow, children, sub }: { title: string; eyebrow?: string; sub?: string; children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current; if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: "smooth" });
  };
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          {eyebrow && <span className="text-xs font-bold tracking-widest text-primary uppercase">{eyebrow}</span>}
          <h2 className="mt-1 text-2xl md:text-3xl font-black tracking-tight">{title}</h2>
          {sub && <p className="mt-2 text-sm text-muted-foreground max-w-xl">{sub}</p>}
        </div>
        <div className="hidden md:flex gap-2">
          <button onClick={() => scroll(1)} aria-label="הקודם"
            className="w-11 h-11 rounded-full border border-border bg-card hover:bg-muted transition flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
          <button onClick={() => scroll(-1)} aria-label="הבא"
            className="w-11 h-11 rounded-full border border-border bg-card hover:bg-muted transition flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-6 px-6 [scrollbar-width:thin]"
        dir="rtl"
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselCard({ children, className = "", width = "w-[300px] md:w-[340px]" }: { children: ReactNode; className?: string; width?: string }) {
  return (
    <div className={`shrink-0 ${width} snap-start ${className}`}>{children}</div>
  );
}
