import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { LegalDoc, LegalH2, LegalP, LegalUL } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({ meta: [
    { title: "מדיניות עוגיות (Cookies) | המפה הפיננסית" },
    { name: "description", content: "מדיניות שימוש בעוגיות, פיקסלים וכלי מדידה באתר המפה הפיננסית." },
  ] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="משפטי" title="מדיניות עוגיות (Cookies)" sub="כיצד אנו משתמשים בעוגיות, פיקסלים, תגיות וכלי מדידה — וכיצד תוכלו לנהל זאת." />
      <Section>
        <LegalDoc>
          <LegalH2>1. מהן עוגיות</LegalH2>
          <LegalP>עוגיות (Cookies) הן קבצי טקסט קטנים שדפדפן המשתמש שומר בעת ביקור באתר. הן משמשות לזיהוי הדפדפן, לשמירת העדפות, למדידת שימוש ולהתאמה אישית. בנוסף לעוגיות, האתר עושה שימוש בפיקסלים (Pixels), תגיות (Tags), Local Storage וכלי מדידה דומים.</LegalP>

          <LegalH2>2. סוגי עוגיות שבהן אנו משתמשים</LegalH2>
          <LegalUL>
            <li><strong>הכרחיות:</strong> מאפשרות את התפעול הבסיסי של האתר (טעינה, ניווט, אבטחה). ללא עוגיות אלו האתר לא יפעל כראוי.</li>
            <li><strong>העדפות:</strong> שמירת בחירות המשתמש (שפה, תצוגה, הסכמות).</li>
            <li><strong>ביצועים ואנליטיקה:</strong> Google Analytics או כלים דומים — לאיסוף סטטיסטיקות שימוש מצטברות ושיפור האתר.</li>
            <li><strong>שיווק ופרסום:</strong> Meta Pixel, Google Ads, רשתות שותפים — לרימרקטינג, פרסום מותאם ומדידת קמפיינים.</li>
          </LegalUL>

          <LegalH2>3. צדדים שלישיים</LegalH2>
          <LegalP>חלק מהעוגיות מנוהלות בידי צדדים שלישיים (Google, Meta, ספקי CRM ודיוור, פלטפורמות שיווק שותפים). למידע נוסף יש לעיין במדיניות הפרטיות של אותם צדדים.</LegalP>

          <LegalH2>4. ניהול וחסימת עוגיות</LegalH2>
          <LegalP>ניתן לחסום או למחוק עוגיות בהגדרות הדפדפן (Chrome, Safari, Firefox, Edge). כמו כן ניתן להסיר הסכמה לפרסום מותאם דרך Google Ads Settings ו-Meta Ad Preferences. חסימת עוגיות עלולה לפגוע בתפקוד חלקים מהאתר.</LegalP>

          <LegalH2>5. עדכונים</LegalH2>
          <LegalP>מדיניות זו עשויה להתעדכן מעת לעת. הנוסח העדכני המפורסם באתר הוא הנוסח המחייב.</LegalP>
        </LegalDoc>
      </Section>
    </PageLayout>
  ),
});
