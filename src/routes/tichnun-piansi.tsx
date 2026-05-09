import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { FamilyHealthCalc } from "@/components/calculators/FamilyHealthCalc";
import { guides, mistakes } from "@/data/content";
import { Wallet, HeartPulse, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/tichnun-piansi")({
  head: () => ({ meta: [
    { title: "תכנון פיננסי | אבחון מצב כלכלי משפחתי - המפה הפיננסית" },
    { name: "description", content: "אבחון פיננסי קצר: תזרים, חובות, חיסכון, ביטוחים ופנסיה. תמונת מצב מדויקת לפני שמקבלים החלטות." },
  ]}),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          theme: "planning", eyebrow: "תכנון פיננסי",
          title: "לפני שמשקיעים, עושים סדר",
          sub: "צמיחה פיננסית מתחילה בהבנה של הכנסות, הוצאות, חובות, חסכונות, קרן חירום ויעדים. בלי סדר, גם השקעה טובה יכולה להפוך ללחץ.",
          ctas: [
            { to: "/calculators/family", label: "התחל אבחון פיננסי", variant: "primary" },
            { to: "/start", label: "שאלון התאמה של 5 שאלות", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "ממלאים אבחון מצב משפחתי קצר",
              "מזהים עודף או חוסר תזרימי",
              "ממפים נכסים מול חובות",
              "מקבלים שלב ראשון במפה הפיננסית",
            ],
            cta: { to: "/calculators/family", label: "פתח אבחון" },
          },
        }}
        valueCards={[
          { icon: HeartPulse, t: "תמונת מצב ב-2 דקות", d: "מזינים הכנסות, הוצאות ונכסים — ומקבלים תמונה ברורה של עודף/חוסר ושלב במפה." },
          { icon: Wallet, t: "סדר לפני השקעות", d: "השקעה לפני סדר זה מתכון ללחץ. כאן בונים בסיס: קרן חירום, חובות וביטוחים." },
          { icon: ShieldCheck, t: "יעדים ברורים", d: "מגדירים מטרות לטווח קצר וארוך — חיסכון לילדים, פרישה, רכישת נכס." },
        ]}
        converter={{
          eyebrow: "אבחון פיננסי",
          title: "מה המצב הפיננסי האמיתי של המשפחה שלך?",
          sub: "אבחון מקיף שמחשב עודף תזרימי, יחס נכסים-חובות והשלב במפה — בלי הרשמה.",
          element: <FamilyHealthCalc />,
        }}
        mistakes={mistakes.filter((m) => ["תכנון פיננסי", "חיסכון לילדים", "משכנתאות"].includes(m.category)).map(({ slug, title }) => ({ slug, title }))}
        guides={guides.filter((g) => g.category === "תכנון פיננסי")}
        leadDomain="planning"
        bottomCta={{
          title: "רוצה ליווי בבניית התוכנית הפיננסית שלך?",
          sub: "השאר פרטים ונחזור אליך עם כיוון ראשוני. במידת הצורך נחבר אותך למתכנן פיננסי מאומת. ללא מכירה ישירה.",
        }}
      />
    </PageLayout>
  ),
});
