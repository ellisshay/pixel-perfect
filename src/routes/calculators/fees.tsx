import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FeesCalc } from "@/components/calculators/FeesCalc";

export const Route = createFileRoute("/calculators/fees")({
  head: () => ({ meta: [{ title: "מחשבון דמי ניהול | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="מחשבון" title="דמי ניהול" sub="כמה דמי ניהול 'אוכלים' לך לאורך השנים — והאם שווה לבדוק חלופה." />
      <Section><FeesCalc /></Section>
    </PageLayout>
  ),
});