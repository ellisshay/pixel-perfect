import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { MonthlyInvestCalc } from "@/components/calculators/MonthlyInvestCalc";

export const Route = createFileRoute("/calculators/monthly")({
  head: () => ({ meta: [{ title: "מחשבון השקעה חודשית | המפה הפיננסית" }] }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="מחשבון" title="השקעה חודשית" sub="גם 200–500 ₪ בחודש בונים סכום משמעותי לאורך זמן. בדוק לבד." />
      <Section><MonthlyInvestCalc /></Section>
    </PageLayout>
  ),
});