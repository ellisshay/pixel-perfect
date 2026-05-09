import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { LegalDoc, LegalH2, LegalP, LegalUL } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/legal/accessibility")({
  head: () => ({ meta: [
    { title: "הצהרת נגישות | המפה הפיננסית" },
    { name: "description", content: "הצהרת נגישות מלאה — תקן ישראלי 5568 (WCAG 2.0 AA), חוק שוויון זכויות לאנשים עם מוגבלות." },
  ] }),
  component: () => (
    <PageLayout>
      <PageHero variant="light" eyebrow="משפטי" title="הצהרת נגישות" sub="מחויבות מלאה להנגשת התוכן והכלים לכלל המשתמשים — לרבות אנשים עם מוגבלות." />
      <Section>
        <LegalDoc>
          <LegalH2>1. מחויבות לנגישות</LegalH2>
          <LegalP>אתר "המפה הפיננסית של ישראל" רואה בנגישות ערך מרכזי ופועל להנגיש את השירותים, המידע, הכלים והמחשבונים בו לכלל הציבור — לרבות אנשים עם מוגבלות — בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ״ח-1998, תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013, ותקן ישראלי ת״י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.</LegalP>

          <LegalH2>2. התאמות הנגישות שבוצעו</LegalH2>
          <LegalUL>
            <li>ניווט מלא באמצעות מקלדת (Tab, Shift+Tab, Enter, Space, ESC).</li>
            <li>תמיכה בקוראי מסך נפוצים (NVDA, JAWS, VoiceOver, TalkBack).</li>
            <li>מבנה כותרות היררכי תקין (H1–H6) וסמנטיקה תקנית של HTML5.</li>
            <li>ניגודיות צבעים תואמת WCAG AA לטקסט ולרכיבי ממשק.</li>
            <li>טקסט חלופי (alt) לכל התמונות והאייקונים בעלי משמעות.</li>
            <li>טפסים עם תוויות (Labels) ברורות והודעות שגיאה מילוליות.</li>
            <li>תמיכה בהגדלת טקסט עד 200% ללא אובדן תוכן או פונקציונליות.</li>
            <li>אפשרות שינוי התצוגה לכיוון מלא RTL בעברית.</li>
            <li>הימנעות מהבהובים מהירים העלולים לגרום להתקפי אפילפסיה.</li>
            <li>מבנה קישורים תיאורי וברור (ללא "לחצו כאן" סתמי).</li>
            <li>ממשק רספונסיבי לנייד, טאבלט ומחשב.</li>
          </LegalUL>

          <LegalH2>3. חריגים ידועים</LegalH2>
          <LegalP>חרף המאמצים, ייתכנו עמודים, רכיבי צד שלישי ומטמיעים (וידאו מובא, מפות, רשתות חברתיות, מערכות לידים) שאינם נגישים במלואם. אנו פועלים לאתר ולתקן ליקויים אלה ככל הניתן. תוכן וידאו ישן עשוי להיות ללא כתוביות; אנו מוסיפים כתוביות לכל תוכן מהותי חדש.</LegalP>

          <LegalH2>4. דרכי פנייה ורכז נגישות</LegalH2>
          <LegalP>נתקלתם בבעיית נגישות? יש לכם הצעה לשיפור? נשמח לטפל בפנייתכם בהקדם.</LegalP>
          <LegalUL>
            <li>פנייה דרך עמוד <a href="/contact" className="text-primary hover:underline">"צור קשר"</a>.</li>
            <li>נא לציין: כתובת העמוד, תיאור הבעיה, סוג הדפדפן, מערכת ההפעלה וטכנולוגיה מסייעת בה אתם משתמשים.</li>
            <li>נשתדל להשיב לפנייתכם בתוך עד 14 ימי עסקים.</li>
          </LegalUL>

          <LegalH2>5. תאריך ההצהרה</LegalH2>
          <LegalP>הצהרה זו עודכנה לאחרונה במאי 2026 ונבדקת מעת לעת. ההתאמות נבחנות באופן שוטף ועשויות להשתנות עם הוספת תכנים חדשים.</LegalP>
        </LegalDoc>
      </Section>
    </PageLayout>
  ),
});
