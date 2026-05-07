import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Domains } from "@/components/Domains";
import { HowItWorks } from "@/components/HowItWorks";
import { Calculators } from "@/components/Calculators";
import { CtaQuiz } from "@/components/CtaQuiz";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Domains />
        <HowItWorks />
        <Calculators />
        <CtaQuiz />
      </main>
      <Footer />
    </div>
  );
}
