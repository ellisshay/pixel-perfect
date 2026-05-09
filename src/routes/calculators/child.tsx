import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ChildSavingsCalc } from "@/components/calculators/ChildSavingsCalc";

export const Route = createFileRoute("/calculators/child")({
  head: () => ({ meta: [{ title: "חיסכון לכל ילד | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero theme="investing" eyebrow="מחשבון" title="חיסכון לכל ילד" />
      <Section><ChildSavingsCalc /></Section>
    </PageLayout>
  ),
});
