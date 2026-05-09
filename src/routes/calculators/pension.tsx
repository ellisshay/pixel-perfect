import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PensionCalc } from "@/components/calculators/PensionCalc";

export const Route = createFileRoute("/calculators/pension")({
  head: () => ({ meta: [{ title: "מחשבון פנסיה | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="planning" eyebrow="מחשבון" title="מחשבון פנסיה" />
      <Section><PensionCalc /></Section>
    </PageLayout>
  ),
});