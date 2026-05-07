import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { LegalDoc, LegalH2, LegalP, LegalUL } from "@/components/legal/LegalDoc";
import { openCookieSettings, clearPrefs } from "@/components/legal/CookieConsent";

type Row = { name: string; provider: string; purpose: string; duration: string };

const necessary: Row[] = [
  { name: "hamapa_cookie_prefs_v1", provider: "האתר (LocalStorage)", purpose: "שמירת בחירת הסכמת העוגיות של המשתמש", duration: "12 חודשים" },
  { name: "session", provider: "האתר", purpose: "ניהול סשן, אבטחה והגנה מפני זיופי בקשות (CSRF)", duration: "סשן" },
];
const preferences: Row[] = [
  { name: "ui_lang / ui_theme", provider: "האתר", purpose: "שמירת העדפות שפה ותצוגה", duration: "12 חודשים" },
];
const analytics: Row[] = [
  { name: "_ga, _ga_*", provider: "Google Analytics 4", purpose: "מדידת תנועה ושימוש מצטבר באתר", duration: "עד 24 חודשים" },
  { name: "_gid, _gat", provider: "Google", purpose: "הבחנה בין משתמשים והגבלת קצב בקשות", duration: "24 שעות / דקה" },
];
const marketing: Row[] = [
  { name: "_fbp, fr", provider: "Meta (Facebook) Pixel", purpose: "מדידת קמפיינים, התאמת פרסום ורימרקטינג", duration: "עד 90 יום" },
  { name: "IDE, NID, _gcl_*", provider: "Google Ads / DoubleClick", purpose: "פרסום מותאם, רימרקטינג ומדידת המרות", duration: "עד 13 חודשים" },
  { name: "li_sugr, bcookie", provider: "LinkedIn Insight", purpose: "מדידת קמפיינים ופרסום מותאם", duration: "עד 12 חודשים" },
  { name: "ttp, _ttp", provider: "TikTok Pixel", purpose: "מדידת קמפיינים ורימרקטינג", duration: "עד 13 חודשים" },
  { name: "partner_ref", provider: "רשתות שיווק שותפים (Affiliate)", purpose: "ייחוס הפניה לשותף עסקי לצורך תגמול", duration: "עד 90 יום" },
];

function Table({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="mt-4 rounded-xl border border-border overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/60 font-bold text-sm">{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="text-right text-muted-foreground bg-muted/30">
            <tr>
              <th className="p-3 font-semibold">שם העוגייה</th>
              <th className="p-3 font-semibold">ספק</th>
              <th className="p-3 font-semibold">מטרה</th>
              <th className="p-3 font-semibold whitespace-nowrap">תקופת שמירה</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-border align-top">
                <td className="p-3 font-mono text-[11px] md:text-xs">{r.name}</td>
                <td className="p-3">{r.provider}</td>
                <td className="p-3 text-muted-foreground">{r.purpose}</td>
                <td className="p-3 whitespace-nowrap">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({ meta: [
    { title: "מדיניות עוגיות (Cookies) | המפה הפיננסית" },
    { name: "description", content: "מדיניות עוגיות, פיקסלים, אנליטיקה ורימרקטינג — וניהול הסכמה לפי הדין בישראל." },
  ] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="משפטי" title="מדיניות עוגיות (Cookies)"
        sub="פירוט עוגיות, פיקסלים וכלי מדידה באתר — וניהול הסכמה מלאה לפי חוק הגנת הפרטיות בישראל." />
      <Section>
        <LegalDoc>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold text-foreground">ניהול הסכמתכם לעוגיות</div>
              <p className="text-xs text-muted-foreground mt-1">ניתן לעדכן את הבחירה, לבטלה כליל או להציג מחדש את חלון ההסכמה.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openCookieSettings()}
                className="h-10 px-4 rounded-full text-sm font-bold text-primary-foreground hover:scale-[1.02] transition"
                style={{ background: "var(--gradient-hero)" }}>
                ניהול העדפות עוגיות
              </button>
              <button onClick={() => { clearPrefs(); window.location.reload(); }}
                className="h-10 px-4 rounded-full text-sm font-bold border border-border hover:bg-muted transition">
                איפוס הסכמה
              </button>
            </div>
          </div>

          <LegalH2>1. מהן עוגיות וכלי מדידה</LegalH2>
          <LegalP>
            עוגיות (Cookies) הן קבצי טקסט קטנים שדפדפן המשתמש שומר בעת ביקור באתר. הן משמשות לזיהוי הדפדפן,
            לשמירת העדפות, למדידת שימוש ולהתאמה אישית. בנוסף לעוגיות, האתר עושה שימוש בפיקסלים (Pixels),
            תגיות (Tags), Local Storage, Session Storage, Web Beacons וטכנולוגיות מדידה דומות.
          </LegalP>

          <LegalH2>2. הסכמה ובסיס משפטי</LegalH2>
          <LegalP>
            בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, לתיקון 13 ולהנחיות הרשות להגנת הפרטיות —
            עוגיות שאינן הכרחיות (אנליטיקה, שיווק, רימרקטינג ופרסום מותאם) מופעלות
            <strong className="text-foreground"> רק לאחר הסכמה מפורשת ומדעת (Opt-in)</strong> של המשתמש,
            הניתנת באמצעות באנר ניהול ההסכמה. עוגיות הכרחיות מופעלות ללא הסכמה משום שבלעדיהן האתר אינו פועל.
            ניתן לחזור בך מההסכמה בכל עת באמצעות הכפתור שלמעלה — הביטול לא יחול רטרואקטיבית על עיבוד שכבר בוצע.
          </LegalP>

          <LegalH2>3. סוגי עוגיות באתר</LegalH2>
          <LegalUL>
            <li><strong>הכרחיות:</strong> תפעול בסיסי, אבטחה, שמירת בחירת הסכמה. לא ניתן לכבות.</li>
            <li><strong>העדפות:</strong> שמירת העדפות שפה, תצוגה ובחירות משתמש.</li>
            <li><strong>אנליטיקה ומדידה:</strong> סטטיסטיקות שימוש מצטברות לשיפור האתר.</li>
            <li><strong>שיווק, פרסום ורימרקטינג:</strong> מדידת קמפיינים, פרסום מותאם והפניה חוזרת.</li>
          </LegalUL>

          <Table title="עוגיות הכרחיות (פעילות תמיד)" rows={necessary} />
          <Table title="עוגיות העדפות (אופציונלי)" rows={preferences} />
          <Table title="עוגיות אנליטיקה ומדידה (טעונות הסכמה)" rows={analytics} />
          <Table title="עוגיות שיווק, פרסום ורימרקטינג (טעונות הסכמה)" rows={marketing} />

          <LegalH2>4. צדדים שלישיים</LegalH2>
          <LegalP>
            חלק מהעוגיות והפיקסלים מנוהלים בידי צדדים שלישיים, ובכלל זה: Google (Analytics, Ads, Tag Manager),
            Meta (Facebook/Instagram Pixel), LinkedIn Insight, TikTok Pixel, ספקי CRM ודיוור (לדוגמה ActiveTrail,
            Mailchimp, HubSpot), פלטפורמות שיווק שותפים (Affiliate Networks), כלי מפות (Google Maps) וכלי מדידת
            ביצועים (Hotjar, Microsoft Clarity וכד׳, ככל שיופעלו). שימוש בעוגיות צד-שלישי כפוף גם למדיניות
            הפרטיות של אותם ספקים.
          </LegalP>

          <LegalH2>5. ניהול וחסימה דרך הדפדפן</LegalH2>
          <LegalP>בנוסף לבאנר ההסכמה באתר, ניתן לחסום או למחוק עוגיות ישירות בהגדרות הדפדפן:</LegalP>
          <LegalUL>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
            <li><a href="https://support.apple.com/he-il/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="text-primary hover:underline">Safari</a></li>
            <li><a href="https://support.mozilla.org/he/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/he-il/microsoft-edge" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
          </LegalUL>
          <LegalP>
            בנוסף ניתן לבטל פרסום מותאם ב-
            <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline"> Google Ad Settings</a> וב-
            <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noreferrer" className="text-primary hover:underline"> Meta Ad Preferences</a>.
            חסימת עוגיות עלולה לפגוע בתפקוד חלקים מהאתר.
          </LegalP>

          <LegalH2>6. העברת מידע מחוץ לישראל</LegalH2>
          <LegalP>
            חלק מספקי הצד השלישי שומרים מידע במערכות הממוקמות מחוץ לישראל (לרבות באיחוד האירופי ובארה״ב),
            בכפוף להסדרי הגנה מקובלים. למידע נוסף — ראו <a href="/legal/privacy" className="text-primary hover:underline">מדיניות הפרטיות</a>.
          </LegalP>

          <LegalH2>7. עדכונים</LegalH2>
          <LegalP>מדיניות זו עשויה להתעדכן מעת לעת כדי לשקף שינויים בכלים, בספקים או בדין החל. הנוסח העדכני המפורסם באתר הוא הנוסח המחייב.</LegalP>
        </LegalDoc>
      </Section>
    </PageLayout>
  ),
});
