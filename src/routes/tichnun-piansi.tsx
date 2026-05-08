import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/tichnun-piansi")({
  head: () => ({ meta: [{ title: "תכנון פיננסי אישי ומשפחתי | המפה הפיננסית" }, { name: "description", content: "תזרים, חיסכון, ביטוחים, פנסיה וחיסכון לכל ילד – הכל במפה אחת." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          eyebrow: "תכנון פיננסי",
          title: "לפני שמשקיעים, עושים סדר",
          sub: "צמיחה פיננסית מתחילה בהבנה של הכנסות, הוצאות, חובות, חסכונות, קרן חירום ויעדים. בלי סדר, גם השקעה טובה יכולה להפוך ללחץ.",
          ctas: [
            { to: "/start", label: "התחל אבחון פיננסי", variant: "primary" },
            { to: "/calculators/family", label: "הורד טבלת סדר בכסף", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "ממפים הכנסות, הוצאות והחזרי חובות",
              "בונים קרן חירום של 3-6 חודשי הוצאה",
              "מסדרים פנסיה, ביטוחים וחיסכון לילדים",
              "מגדירים יעדי צמיחה לטווח קצר וארוך",
            ],
            cta: { to: "/calculators/family", label: "פתח מחשבון מצב משפחתי" },
          },
        }}
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
