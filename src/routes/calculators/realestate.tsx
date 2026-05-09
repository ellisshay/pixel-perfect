import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { RealEstateCalc } from "@/components/calculators/RealEstateCalc";

export const Route = createFileRoute("/calculators/realestate")({
  head: () => ({ meta: [{ title: "השקעת נדל״ן | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="realestate" eyebrow="מחשבון" title="השקעת נדל״ן" />
      <Section><RealEstateCalc /></Section>
    </PageLayout>
  ),
});
