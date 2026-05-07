import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FamilyHealthCalc } from "@/components/calculators/FamilyHealthCalc";

export const Route = createFileRoute("/calculators/family")({
  head: () => ({ meta: [{ title: "מצב פיננסי משפחתי | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="מחשבון" title="מצב פיננסי משפחתי" />
      <Section><FamilyHealthCalc /></Section>
    </PageLayout>
  ),
});
