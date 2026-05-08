import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/shuk-hahon")({
  head: () => ({ meta: [{ title: "שוק ההון והכפלת הון | המפה הפיננסית" }, { name: "description", content: "ידע, מחשבונים ומדריכים על שוק ההון, ריבית דריבית, דמי ניהול, IRA ומסחר עצמאי." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          eyebrow: "שוק ההון",
          title: "שוק ההון לא חייב להיות מפחיד",
          sub: "למד את הבסיס, הבן את ההבדל בין השקעה למסחר, גלה מה זה מדדים, תיק מנוהל, קרנות סל וניהול סיכון, ובחר אם מתאים לך להתחיל לבד או עם ליווי.",
          ctas: [
            { to: "/blog", label: "למד איך מתחילים", variant: "primary" },
            { to: "/start", label: "בדוק התאמה למסלול השקעה", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "מבינים את ההבדל בין השקעה למסחר",
              "בודקים דמי ניהול והשפעת ריבית דריבית",
              "בוחנים פיזור: מדדים, אג״ח וקרנות סל",
              "מקבלים כיוון אם להתחיל לבד או עם ליווי",
            ],
            cta: { to: "/calculators/compound", label: "פתח מחשבון ריבית דריבית" },
          },
        }}
        subtopics={["יסודות שוק ההון", "השקעה מול מסחר", "מניות, אג״ח ומדדים", "קרנות סל", "ריבית דריבית", "דמי ניהול", "מסחר עצמאי", "תיק מנוהל", "IRA", "טעויות נפוצות"]}
        calculators={[{ to: "/calculators/invest", t: "מחשבון השקעות" }, { to: "/calculators/compound", t: "ריבית דריבית עם דמי ניהול" }]}
        guides={guides.filter((g) => g.category === "שוק ההון")}
        mistakes={mistakes.filter((m) => m.category === "שוק ההון").map(({ slug, title }) => ({ slug, title }))}
        referrals={[...referrals["שוק ההון"]]}
        area="שוק ההון"
      />
    </PageLayout>
  ),
});
