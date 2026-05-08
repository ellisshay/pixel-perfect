import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/mashkantaot")({
  head: () => ({ meta: [{ title: "משכנתאות והלוואות | המפה הפיננסית" }, { name: "description", content: "משכנתא חדשה, מיחזור, הלוואות גישור ואשראי חכם – מחשבונים ומדריכים." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          eyebrow: "משכנתאות והלוואות",
          title: "המשכנתא שלך יכולה להיות ההחלטה הכי יקרה בחיים",
          sub: "בדוק החזר חודשי, מסלולים, ריבית, מחזור משכנתא, איחוד הלוואות והאם יש דרך לשפר את המצב לפני שאתה חותם או ממשיך לשלם בלי לבדוק.",
          ctas: [
            { to: "/start", label: "בדוק משכנתא", variant: "primary" },
            { to: "/calculators/mortgage", label: "פתח מחשבון החזר", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "מחשבים החזר חודשי וריבית כוללת לאורך התקופה",
              "בודקים תמהיל מסלולים ויחס החזר להכנסה",
              "בוחנים אם כדאי מיחזור או איחוד הלוואות",
              "מאתרים טעויות יקרות לפני חתימה",
            ],
            cta: { to: "/calculators/mortgage", label: "פתח מחשבון משכנתא" },
          },
        }}
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
