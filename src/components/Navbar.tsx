import { Link } from "@tanstack/react-router";

export function Navbar() {
  const links = [
    { href: "#domains", label: "תחומים" },
    { href: "#how", label: "איך זה עובד" },
    { href: "#professionals", label: "אנשי מקצוע" },
    { href: "#community", label: "קהילה" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>₪</span>
          <span>המפה הפיננסית</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#quiz" className="inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg transition-all" style={{ background: "var(--gradient-hero)" }}>
          התחילו אבחון חינם
        </a>
      </div>
    </header>
  );
}
