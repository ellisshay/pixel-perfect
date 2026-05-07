import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/tichnun-piansi")({
  head: () => ({ meta: [{ title: "תכנון פיננסי אישי ומשפחתי | המפה הפיננסית" }, { name: "description", content: "תזרים, חיסכון, ביטוחים, פנסיה וחיסכון לכל ילד – הכל במפה אחת." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{ eyebrow: "תכנון פיננסי", title: "סדר פיננסי לפני השקעות", sub: "אי אפשר לבנות הון בלי בסיס. אנחנו עוזרים לכם לסדר תזרים, ביטוחים, פנסיה וחיסכון." }}
        subtopics={["הכנסות והוצאות", "תזרים משפחתי", "כרית ביטחון", "חובות", "חיסכון לכל ילד", "פנסיה", "ביטוחים", "פרישה מוקדמת", "צמיחה משפחתית"]}
        calculators={[{ to: "/calculators/family", t: "מצב פיננסי משפחתי" }, { to: "/calculators/mortgage", t: "מחשבון משכנתא" }, { to: "/calculators/child", t: "חיסכון לכל ילד" }, { to: "/calculators/compound", t: "ריבית דריבית עם דמי ניהול" }]}
        guides={guides.filter((g) => g.category === "תכנון פיננסי")}
        mistakes={mistakes.filter((m) => ["תכנון פיננסי", "חיסכון לילדים", "משכנתאות"].includes(m.category)).map(({ slug, title }) => ({ slug, title }))}
        referrals={[...referrals["פיננסי אישי"], ...referrals["משכנתאות"]]}
        area="פיננסי אישי"
      />
    </PageLayout>
  ),
});
