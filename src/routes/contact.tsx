import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { LeadForm } from "@/components/sections/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "צור קשר | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="צור קשר" title="נשמח לשמוע ממך" sub="שאלה, הצעה לשיתוף פעולה או רצון לקבל הפניה – השאירו פרטים." />
      <Section><div className="max-w-2xl mx-auto"><LeadForm /></div></Section>
    </PageLayout>
  ),
});
