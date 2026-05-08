import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { RealEstateCalc } from "@/components/calculators/RealEstateCalc";
import { guides, mistakes } from "@/data/content";
import { Building2, Calculator, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/nadlan")({
  head: () => ({ meta: [
    { title: "נדל״ן | בדיקת עסקה לפני חתימה - המפה הפיננסית" },
    { name: "description", content: "בודקים תזרים, תשואה, מינוף ומיסוי לפני חתימה על עסקת נדל״ן. סימולציה אישית למגורים, מסחרי ונדל״ן בחו״ל." },
  ]}),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          eyebrow: "נדל״ן",
          title: "נדל״ן זה לא רק דירה להשקעה",
          sub: "לפני שקונים נכס, חשוב להבין את ההבדל בין מגורים, מסחרי, קרקע חקלאית, נדל״ן בחו״ל ונדל״ן תיירותי. לכל מסלול יש סיכון, מימון, מיסוי ותזרים משלו.",
          ctas: [
            { to: "/calculators/realestate", label: "בדוק עסקת נדל״ן", variant: "primary" },
            { to: "/calculators/mortgage", label: "מחשבון משכנתא להשקעה", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "ממפים את סוג העסקה: מגורים, מסחרי, חו״ל",
              "מחשבים תזרים חודשי ותשואה נטו",
              "בודקים יחס מימון נכון לעסקה",
              "מזהים סיכונים ועלויות סמויות",
            ],
            cta: { to: "/calculators/realestate", label: "התחל בדיקת עסקה" },
          },
        }}
        valueCards={[
          { icon: Calculator, t: "תזרים אמיתי, לא הבטחות", d: "מזינים מחיר, הון עצמי, שכר דירה והוצאות — ורואים אם העסקה משתלמת מבחינת תזרים חודשי." },
          { icon: Building2, t: "מינוף נכון = הצלחה", d: "יחס LTV גבוה מדי הופך עסקה טובה לסיכון. בודקים לפני שמגישים בקשה למשכנתא." },
          { icon: ShieldCheck, t: "מזהים סיכונים מראש", d: "תקופות ריקות, תיקונים, שינויי ריבית ומיסוי — כל אלה משפיעים על התשואה האמיתית." },
        ]}
        converter={{
          eyebrow: "בדיקת עסקה",
          title: "האם העסקה שאתה שוקל באמת משתלמת?",
          sub: "מחשבון חי שמראה תזרים, תשואה, יחס מימון ועלויות נסתרות — בלי הרשמה.",
          element: <RealEstateCalc />,
        }}
        mistakes={mistakes.filter((m) => m.category === "נדל״ן").map(({ slug, title }) => ({ slug, title }))}
        guides={guides.filter((g) => g.category === "נדל״ן")}
        leadDomain="real-estate"
        bottomCta={{
          title: "רוצה לבדוק עסקה ספציפית מול מומחה?",
          sub: "השאר פרטים עם תקציר העסקה. נחזור אליך עם בדיקה ראשונית, ובמידת הצורך נחבר לאיש מקצוע מאומת בתחום הנכון.",
        }}
      />
    </PageLayout>
  ),
});
