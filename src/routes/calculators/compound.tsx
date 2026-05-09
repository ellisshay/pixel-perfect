import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CompoundFeesCalc } from "@/components/calculators/CompoundFeesCalc";

export const Route = createFileRoute("/calculators/compound")({
  head: () => ({ meta: [{ title: "ריבית דריבית עם דמי ניהול | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="investing" eyebrow="מחשבון" title="ריבית דריבית עם דמי ניהול" />
      <Section><CompoundFeesCalc /></Section>
    </PageLayout>
  ),
});
