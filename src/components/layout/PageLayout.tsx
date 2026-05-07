import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/legal/CookieConsent";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
