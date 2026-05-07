import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "מדיניות פרטיות | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="משפטי" title="מדיניות פרטיות" />
      <Section>
        <div className="max-w-3xl prose space-y-4 text-muted-foreground leading-relaxed">
          <p>מסמך זה הוא מדיניות פרטיות של אתר "המפה הפיננסית של ישראל".</p>
          <p>האתר אינו מעניק ייעוץ פיננסי, ייעוץ השקעות או ייעוץ מס. כל החלטה פיננסית הינה באחריות המשתמש בלבד ומומלץ להתייעץ עם איש מקצוע מוסמך.</p>
          <p>פרטים שמסר המשתמש בטפסים עשויים להיות מועברים לשותפים מקצועיים רלוונטיים בכפוף להסכמה מפורשת.</p>
          <p>לפרטים נוספים ובקשות בנושא פרטיות, ניתן לפנות דרך עמוד "צור קשר".</p>
          <p className="text-xs">תאריך עדכון אחרון: 2025</p>
        </div>
      </Section>
    </PageLayout>
  ),
});
