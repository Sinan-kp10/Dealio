import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { CustomerSection } from "../components/CustomerSection";
import { EnterpriseSection } from "../components/EnterpriseSection";
import { CallToActionSection } from "../components/CallToActionSection";

export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <CustomerSection />
      <EnterpriseSection />
      <CallToActionSection />
    </div>
  );
}