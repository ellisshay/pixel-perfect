import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

export const Route = createFileRoute("/shkifut")({
  head: () => ({ meta: [{ title: "שקיפות ואתיקה | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="שקיפות" title="שקיפות ואתיקה" sub="אנחנו מאמינים שהאמון נבנה רק כשהכל גלוי." />
      <Section>
        <div className="max-w-3xl space-y-4 text-foreground">
          {[
            "האתר אינו יועץ פיננסי ואינו יועץ השקעות.",
            "אין באתר זה שום התחייבות לתשואה או להמלצת השקעה אישית.",
            "המחשבונים באתר הם סימולציה כללית בלבד.",
            "ייתכנו שיתופי פעולה מסחריים עם חלק מאנשי המקצוע אליהם אנו מפנים.",
            "מידע שמשאירים בטפסים עשוי לעבור לשותפים מקצועיים רלוונטיים, על בסיס הסכמה מפורשת.",
            "המשתמש אחראי לבדוק כל החלטה פיננסית מול איש מקצוע מוסמך.",
          ].map((t) => (
            <div key={t} className="p-5 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>{t}</div>
          ))}
        </div>
      </Section>
    </PageLayout>
  ),
});
