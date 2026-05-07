import heroImage from "@/assets/hero-map.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-mesh)" }} />
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        width={1536}
        height={1024}
        className="absolute inset-0 -z-10 w-full h-full object-cover opacity-40 mix-blend-screen"
      />
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 text-primary-foreground animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 bg-white/10 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            המפה הפיננסית של ישראל · גרסה 1.0
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            ידע זה כסף.
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>
              סדר פיננסי זה חופש.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
            מקום אחד שמנגיש ידע, השקעות ואנשי מקצוע מאומתים — כדי לעזור לכם להגדיל הון בצורה חכמה ובטוחה.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#quiz" className="inline-flex items-center justify-center h-14 px-8 rounded-full font-bold text-base text-accent-foreground shadow-xl hover:scale-[1.02] transition-all" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
              התחילו אבחון פיננסי חינם ←
            </a>
            <a href="#professionals" className="inline-flex items-center justify-center h-14 px-8 rounded-full font-bold text-base text-primary-foreground border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-all">
              עיינו באנשי מקצוע
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { k: "8", v: "תחומים פיננסיים" },
              { k: "+50", v: "מומחים מאומתים" },
              { k: "100%", v: "ניטרליות מלאה" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-3xl font-black bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-gold)" }}>{s.k}</dt>
                <dd className="mt-1 text-sm text-primary-foreground/70">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hidden lg:block lg:col-span-5 animate-float">
          <div className="relative aspect-square rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8" style={{ boxShadow: "var(--shadow-glow)" }}>
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-xs font-bold text-accent-foreground" style={{ background: "var(--gradient-gold)" }}>
              חי · עכשיו
            </div>
            <div className="text-primary-foreground/70 text-sm font-medium">סטטוס פיננסי</div>
            <div className="mt-2 text-primary-foreground text-2xl font-bold">בריא ויציב 78/100</div>
            <div className="mt-6 space-y-4">
              {[
                { k: "חיסכון פנסיוני", v: 82 },
                { k: "ניהול הוצאות", v: 71 },
                { k: "פיזור השקעות", v: 64 },
                { k: "כרית ביטחון", v: 90 },
              ].map((m) => (
                <div key={m.k}>
                  <div className="flex justify-between text-sm text-primary-foreground/80 mb-1.5">
                    <span>{m.k}</span><span className="font-semibold">{m.v}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.v}%`, background: "var(--gradient-gold)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
