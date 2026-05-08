import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/nadlan")({
  head: () => ({ meta: [{ title: "נדל״ן בארץ ובחו״ל | המפה הפיננסית" }, { name: "description", content: "תשואה, מינוף, נדל״ן בישראל ובחו״ל, בדיקות חובה ומחשבונים." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          eyebrow: "נדל״ן",
          title: "נדל״ן זה לא רק דירה להשקעה",
          sub: "לפני שקונים נכס, חשוב להבין את ההבדל בין מגורים, מסחרי, קרקע חקלאית, נדל״ן בחו״ל ונדל״ן תיירותי. לכל מסלול יש סיכון, מימון, מיסוי ותזרים משלו.",
          ctas: [
            { to: "/start", label: "בדוק עסקת נדל״ן", variant: "primary" },
            { to: "/blog", label: "למד על סוגי נדל״ן", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "ממפים את סוג העסקה: מגורים, מסחרי, קרקע, חו״ל",
              "בודקים מימון ויחס מינוף נכון לעסקה",
              "מחשבים תזרים, תשואה וסיכון אמיתי",
              "מזהים בדיקות חובה לפני חתימה",
            ],
            cta: { to: "/calculators/realestate", label: "פתח מחשבון השקעת נדל״ן" },
          },
        }}
        subtopics={["נדל״ן בישראל", "נדל״ן בחו״ל", "תשואה מול עליית ערך", "מינוף", "משכנתא להשקעה", "בדיקות לפני עסקה", "שותפויות", "ניהול נכסים"]}
        calculators={[{ to: "/calculators/mortgage", t: "מחשבון משכנתא" }, { to: "/calculators/realestate", t: "השקעת נדל״ן" }]}
        guides={guides.filter((g) => g.category === "נדל״ן")}
        mistakes={mistakes.filter((m) => m.category === "נדל״ן").map(({ slug, title }) => ({ slug, title }))}
        referrals={[...referrals["נדל״ן"]]}
        area="נדל״ן בארץ"
      />
    </PageLayout>
  ),
});
