import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { MortgageCalc } from "@/components/calculators/MortgageCalc";
import { guides, mistakes } from "@/data/content";
import { Calculator, TrendingUp, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/mashkantaot")({
  head: () => ({ meta: [
    { title: "משכנתאות והלוואות | מחשבון ובדיקת מצב - המפה הפיננסית" },
    { name: "description", content: "מחשבון משכנתא חי + בדיקת מסלולים, מיחזור ואיחוד הלוואות. מספרים אמיתיים לפני חתימה." },
  ]}),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          theme: "mortgage", eyebrow: "משכנתאות והלוואות",
          title: "המשכנתא שלך יכולה להיות ההחלטה הכי יקרה בחיים",
          sub: "בדוק החזר חודשי, מסלולים, ריבית, מחזור משכנתא, איחוד הלוואות והאם יש דרך לשפר את המצב לפני שאתה חותם או ממשיך לשלם בלי לבדוק.",
          ctas: [
            { to: "/calculators/mortgage", label: "פתח מחשבון החזר", variant: "primary" },
            { to: "/start", label: "בדוק אם כדאי למחזר", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "מחשבים החזר חודשי וריבית כוללת לאורך התקופה",
              "בודקים יחס החזר להכנסה",
              "בוחנים אם כדאי מיחזור או איחוד הלוואות",
              "מאתרים טעויות יקרות לפני חתימה",
            ],
            cta: { to: "/calculators/mortgage", label: "פתח מחשבון" },
          },
        }}
        valueCards={[
          { icon: Calculator, t: "ההחזר האמיתי שלך", d: "סכום, ריבית, תקופה — ומה זה אומר על תזרים החודשי, סך הריבית ויחס ההחזר." },
          { icon: TrendingUp, t: "מיחזור = חיסכון", d: "כל 0.3% פחות בריבית משמעותו עשרות אלפי שקלים לאורך החיים. בודקים לפני שמחליטים." },
          { icon: ShieldCheck, t: "חתימה מודעת", d: "להבין את המסלולים, את הסיכון ואת ההשפעה של שינויי ריבית — לפני הבנק, לא אחריו." },
        ]}
        converter={{
          eyebrow: "מחשבון משכנתא",
          title: "כמה באמת תשלם על המשכנתא שלך?",
          sub: "מחשבון חי שמראה החזר חודשי, סך ריבית ויחס החזר להכנסה — בלי הרשמה.",
          element: <MortgageCalc />,
        }}
        mistakes={mistakes.filter((m) => m.category === "משכנתאות").map(({ slug, title }) => ({ slug, title }))}
        guides={guides.filter((g) => g.slug.includes("mashkanta") || g.title.includes("משכנתא") || g.title.includes("מינוף"))}
        leadDomain="mortgages"
        bottomCta={{
          title: "רוצה בדיקת משכנתא או מיחזור מול יועץ?",
          sub: "השאר פרטים עם פרטי המשכנתא הקיימת או המבוקשת. נחזור אליך עם בדיקה ראשונית, ובמידת הצורך נחבר ליועץ משכנתאות מאומת.",
        }}
      />
    </PageLayout>
  ),
});
