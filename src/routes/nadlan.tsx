import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/nadlan")({
  head: () => ({ meta: [{ title: "נדל״ן בארץ ובחו״ל | המפה הפיננסית" }, { name: "description", content: "תשואה, מינוף, נדל״ן בישראל ובחו״ל, בדיקות חובה ומחשבונים." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{ eyebrow: "נדל״ן", title: "נדל״ן ככלי לבניית הון, לא כחלום בלי מספרים", sub: "מינוף נכון, בדיקות נכונות ובחירה מדויקת – זה ההבדל בין השקעה טובה לעשור של חרטה." }}
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
