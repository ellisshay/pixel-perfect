import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Disclaimer } from "@/components/layout/Section";
import { guides } from "@/data/content";

export const Route = createFileRoute("/blog/$slug")({
  component: () => {
    const { slug } = Route.useParams();
    const g = guides.find((x) => x.slug === slug);
    if (!g) throw notFound();
    return (
      <PageLayout>
        <PageHero eyebrow={`${g.category} · ${g.readTime}`} title={g.title} sub={g.excerpt} />
        <Section>
          <article className="max-w-3xl prose-base space-y-6 text-foreground">
            <h2 className="text-xl font-bold">למה זה חשוב</h2>
            <p className="text-muted-foreground leading-relaxed">{g.excerpt} זהו אחד הנושאים שהבנה שלו לעומק חוסכת מאות אלפי שקלים לאורך החיים, ומונעת החלטות שמתקבלות מתוך לחץ או חוסר ידע.</p>
            <h2 className="text-xl font-bold">3 נקודות מפתח</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>● מבינים את המנגנון לפני שפועלים – לא לפי כותרת או טיפ.</li>
              <li>● סופרים עלויות אמיתיות, לא רק תשואה תיאורטית.</li>
              <li>● מתאימים את ההחלטה לאופק הזמן ולסיכון האמיתי שלכם.</li>
            </ul>
            <h2 className="text-xl font-bold">צ׳ק ליסט מהיר</h2>
            <ol className="list-decimal pr-5 space-y-1.5 text-muted-foreground">
              <li>הגדרת מטרה ותקופה</li>
              <li>הבנת עלויות ודמי ניהול</li>
              <li>בדיקת חלופות והשוואה</li>
              <li>תכנון מראש לתרחיש שלילי</li>
              <li>סקירה תקופתית</li>
            </ol>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold">המשך מומלץ</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link to="/calculators" className="text-sm font-bold text-primary">פתחו מחשבון מתאים →</Link>
                <Link to="/taoyot" className="text-sm font-bold text-primary">קראו טעויות בתחום →</Link>
              </div>
            </div>
            <Disclaimer />
          </article>
        </Section>
      </PageLayout>
    );
  },
});
