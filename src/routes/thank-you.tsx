import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CheckCircle2, ArrowLeft } from "lucide-react";

type Search = { name?: string; domain?: string };

export const Route = createFileRoute("/thank-you")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    name: typeof s.name === "string" ? s.name : undefined,
    domain: typeof s.domain === "string" ? s.domain : undefined,
  }),
  head: () => ({ meta: [
    { title: "תודה | המפה הפיננסית" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ThankYou,
});

function ThankYou() {
  const { name } = Route.useSearch();
  return (
    <PageLayout>
      <Section>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div
            className="inline-flex w-20 h-20 rounded-full items-center justify-center text-accent-foreground mb-6"
            style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
          >
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {name ? `תודה, ${name}!` : "תודה — קיבלנו את הפרטים"}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            איש מקצוע מתאים יחזור אליך תוך 24 שעות עם תמונת מצב ראשונית.
            בינתיים — שווה להמשיך ללמוד ולעבור על הכלים.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-accent-foreground"
              style={{ background: "var(--gradient-gold)" }}
            >
              לעמוד המחשבונים <ArrowLeft size={16} />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-bold text-primary border border-border hover:bg-secondary transition"
            >
              לבלוג והמדריכים
            </Link>
          </div>
          <p className="mt-10 text-xs text-muted-foreground leading-relaxed">
            <strong>גילוי נאות:</strong> הפלטפורמה אינה מהווה ייעוץ השקעות כהגדרתו בחוק הסדרת העיסוק בייעוץ השקעות, תשנ״ה-1995.
            הפניה לאיש מקצוע אינה המלצה ואינה מבטיחה תוצאה.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}