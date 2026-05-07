import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { InvestCalc } from "@/components/calculators/InvestCalc";

export const Route = createFileRoute("/calculators/invest")({
  head: () => ({ meta: [{ title: "מחשבון השקעות | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="מחשבון" title="מחשבון השקעות" />
      <Section><InvestCalc /></Section>
    </PageLayout>
  ),
});
