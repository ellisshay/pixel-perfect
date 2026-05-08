import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border/60">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-base shrink-0">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground text-lg" style={{ background: "var(--gradient-hero)" }}>₪</span>
          <span className="hidden sm:inline">המפה הפיננסית</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
          {navItems.map((l) => (
            l.to === "/yoetz" ? (
              <Link key={l.to} to={l.to} className="relative px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors font-bold text-primary" activeProps={{ className: "text-foreground bg-secondary" }}>
                {l.label}
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
              </Link>
            ) : (
              <Link key={l.to} to={l.to} className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors" activeProps={{ className: "text-foreground bg-secondary" }} activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/start" className="inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-bold text-primary-foreground shadow-md hover:shadow-lg transition-all" style={{ background: "var(--gradient-hero)" }}>
            התחל כאן
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="תפריט" className="lg:hidden p-2 rounded-lg hover:bg-secondary">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-5 py-4 grid grid-cols-2 gap-1 text-sm">
            {navItems.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-secondary" activeProps={{ className: "bg-secondary font-bold" }} activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
