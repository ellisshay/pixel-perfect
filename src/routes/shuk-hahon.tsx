import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { guides, mistakes, referrals } from "@/data/content";

export const Route = createFileRoute("/shuk-hahon")({
  head: () => ({ meta: [{ title: "שוק ההון והכפלת הון | המפה הפיננסית" }, { name: "description", content: "ידע, מחשבונים ומדריכים על שוק ההון, ריבית דריבית, דמי ניהול, IRA ומסחר עצמאי." }] }),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{ eyebrow: "שוק ההון", title: "שוק ההון והכפלת הון, להבין לפני שפועלים", sub: "ריבית דריבית, פיזור, דמי ניהול ומסחר – ככה משתמשים בשוק כדי לבנות הון, לא להפסיד אותו." }}
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
