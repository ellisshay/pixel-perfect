import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { LeadForm } from "@/components/sections/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "צור קשר | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="growth"
        eyebrow="צור קשר"
        title="לא בטוח מאיפה להתחיל?"
        sub="השאר פרטים ונעזור להבין מה התחום הנכון עבורך, האם כדאי להתחיל מסדר פיננסי, משכנתא, השקעות, נדל״ן, פנסיה או בדיקה מקצועית."
        ctas={[
          { to: "/contact", label: "דברו איתנו", variant: "primary" },
          { to: "/start", label: "בחר תחום עניין", variant: "ghost" },
        ]}
        actions={{
          title: "מה עושים עכשיו",
          items: [
            "ממלאים טופס קצר עם הצורך הפיננסי המרכזי",
            "מקבלים כיוון ראשוני בלי התחייבות",
            "במקרה הצורך — מתחברים לבעל מקצוע מאומת",
            "ממשיכים בקצב שלך, בשקיפות מלאה",
          ],
          cta: { to: "/start", label: "התחל אבחון של 5 שאלות" },
        }}
      />
      <Section><div className="max-w-2xl mx-auto"><LeadForm /></div></Section>
    </PageLayout>
  ),
});
