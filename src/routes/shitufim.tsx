import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Disclaimer } from "@/components/layout/Section";
import { ReferralForm } from "@/components/sections/ReferralForm";
import { referrals } from "@/data/content";

export const Route = createFileRoute("/shitufim")({
  head: () => ({ meta: [{ title: "שיתופי פעולה והפניות | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="שיתופי פעולה" title="הפניות חכמות לאנשי מקצוע מאומתים" sub="המפה מחברת בין משתמשים לבין אנשי מקצוע, יועצים, מלווים ומומחים – לפי תחום ושלב." />
      <Section>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-6">תחומי הפניה</h2>
            <div className="space-y-5">
              {Object.entries(referrals).map(([cat, items]) => (
                <div key={cat} className="p-5 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
                  <h3 className="font-bold mb-2">{cat}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {items.map((i) => <li key={i}>● {i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">השאירו פרטים</h2>
            <ReferralForm />
            <div className="mt-6"><Disclaimer /></div>
          </div>
        </div>
      </Section>
    </PageLayout>
  ),
});
