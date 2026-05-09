import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { MortgageCalc } from "@/components/calculators/MortgageCalc";

export const Route = createFileRoute("/calculators/mortgage")({
  head: () => ({ meta: [{ title: "מחשבון משכנתא | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="mortgage" eyebrow="מחשבון" title="מחשבון משכנתא" />
      <Section><MortgageCalc /></Section>
    </PageLayout>
  ),
});
