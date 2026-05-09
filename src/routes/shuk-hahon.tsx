import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { TopicPage } from "@/components/sections/TopicPage";
import { InvestCalc } from "@/components/calculators/InvestCalc";
import { guides, mistakes } from "@/data/content";
import { TrendingUp, PiggyBank, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/shuk-hahon")({
  head: () => ({ meta: [
    { title: "שוק ההון | בדוק התאמה למסלול השקעה - המפה הפיננסית" },
    { name: "description", content: "בדוק התאמה למסלול השקעה: מדדים, תיק מנוהל, קרנות סל, ריבית דריבית ודמי ניהול. סימולציה אישית בלי הרשמה." },
  ]}),
  component: () => (
    <PageLayout>
      <TopicPage
        hero={{
          theme: "investing", eyebrow: "שוק ההון",
          title: "שוק ההון לא חייב להיות מפחיד",
          sub: "למד את הבסיס, הבן את ההבדל בין השקעה למסחר, גלה מה זה מדדים, תיק מנוהל, קרנות סל וניהול סיכון, ובחר אם מתאים לך להתחיל לבד או עם ליווי.",
          ctas: [
            { to: "/calculators/invest", label: "בדוק התאמה למסלול השקעה", variant: "primary" },
            { to: "/calculators/compound", label: "כמה דמי ניהול 'אוכלים' לך", variant: "ghost" },
          ],
          actions: {
            title: "מה עושים עכשיו",
            items: [
              "ממלאים סימולציית השקעה לפי הסכומים שלך",
              "בודקים את ההשפעה של ריבית דריבית לאורך זמן",
              "מזהים דמי ניהול שאוכלים תשואה",
              "מקבלים כיוון: להתחיל לבד או עם ליווי",
            ],
            cta: { to: "/calculators/invest", label: "התחל סימולציה" },
          },
        }}
        valueCards={[
          { icon: TrendingUp, t: "סימולציה אישית, לא תיאוריה", d: "מזינים סכום התחלתי, הפקדה חודשית ותקופה — ורואים את התוצאה במספרים אמיתיים." },
          { icon: PiggyBank, t: "מבינים את עלות דמי הניהול", d: "0.5% נשמע קטן. לאורך 30 שנה זה יכול להגיע למאות אלפי שקלים." },
          { icon: ShieldCheck, t: "החלטה לפני פעולה", d: "תוצאה ברורה לפני שמדברים עם יועץ. נכנסים מוכנים, לא מבולבלים." },
        ]}
        converter={{
          eyebrow: "סימולציית השקעה",
          title: "כמה ההשקעה שלך יכולה לצמוח?",
          sub: "מחשבון חי, ללא הרשמה. שנו את הסכומים ותראו את ההשפעה מיידית.",
          element: <InvestCalc />,
        }}
        mistakes={mistakes.filter((m) => m.category === "שוק ההון").map(({ slug, title }) => ({ slug, title }))}
        guides={guides.filter((g) => g.category === "שוק ההון")}
        leadDomain="investments"
        bottomCta={{
          title: "רוצה כיוון אישי לפני שמתחילים להשקיע?",
          sub: "השאר פרטים ונחזור אליך עם התאמה ראשונית למסלול השקעה: עצמאי, מנוהל או IRA — לפי הסכומים, הסיכון והאופק שלך.",
        }}
      />
    </PageLayout>
  ),
});
