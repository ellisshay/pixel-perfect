import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/mashkantaot")({
  head: () => ({ meta: [{ title: "משכנתאות והלוואות | המפה הפיננסית" }, { name: "description", content: "משכנתא חדשה, מיחזור, הלוואות גישור ואשראי חכם – מחשבונים ומדריכים." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{ eyebrow: "מימון", title: "מימון נכון מתחיל בהבנה, לא בהצעה הראשונה", sub: "תמהיל חכם, יחס החזר בריא וריבית מותאמת – ההבדלים שווים מאות אלפי שקלים." }}
        subtopics={["משכנתא חדשה", "מיחזור משכנתא", "הלוואה לכל מטרה", "הלוואת גישור", "מימון נדל״ן", "אשראי חכם"]}
        calculators={[{ to: "/calculators/mortgage", t: "מחשבון משכנתא" }, { to: "/calculators/family", t: "מצב פיננסי משפחתי" }]}
        guides={guides.filter((g) => g.slug.includes("mashkanta") || g.title.includes("משכנתא") || g.title.includes("מינוף"))}
        mistakes={mistakes.filter((m) => m.category === "משכנתאות").map(({ slug, title }) => ({ slug, title }))}
        referrals={[...referrals["משכנתאות"], ...referrals["הלוואות"]]}
        area="משכנתאות"
      />
    </PageLayout>
  ),
});
