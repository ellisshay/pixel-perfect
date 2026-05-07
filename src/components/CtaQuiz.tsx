export function CtaQuiz() {
  return (
    <section id="quiz" className="py-24">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">5 שאלות · 2 דקות</span>
        <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tight leading-tight">
          איפה אתם עומדים פיננסית?
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          אבחון קצר וחכם שמייצר עבורכם תמונת מצב מדויקת והמלצות מותאמות אישית.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href="#" className="inline-flex items-center justify-center h-14 px-10 rounded-full font-bold text-base text-primary-foreground shadow-xl hover:scale-[1.02] transition-all" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
            התחילו את האבחון ←
          </a>
          <a href="#community" className="inline-flex items-center justify-center h-14 px-10 rounded-full font-bold text-base border border-border bg-card hover:bg-secondary transition-all">
            הצטרפו לקהילה
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">חינמי לחלוטין · ללא התחייבות · מאובטח לפי חוק הגנת הפרטיות</p>
      </div>
    </section>
  );
}
