/** Animated financial grid background with glowing dots. Pure CSS / SVG, no deps. */
export function GridBg({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="m"><rect width="100%" height="100%" fill="url(#fade)" /></mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#m)" />
      </svg>
      {/* Glow blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--gradient-gold)" }} />
      <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, var(--primary-glow), transparent 70%)" }} />
      {/* Floating data points */}
      <div className="absolute inset-0">
        {[
          { l: "12%", t: "18%", d: "0s" },
          { l: "78%", t: "30%", d: "1.2s" },
          { l: "24%", t: "72%", d: "0.6s" },
          { l: "62%", t: "78%", d: "1.8s" },
          { l: "88%", t: "60%", d: "2.4s" },
        ].map((p, i) => (
          <span key={i} className="absolute w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)] animate-float"
            style={{ left: p.l, top: p.t, animationDelay: p.d } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
