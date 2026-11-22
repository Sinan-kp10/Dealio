import { CallToActionSection } from "../../components/common/CallToActionSection";
import { CustomerSection } from "../../components/common/CustomerSection";
import { EnterpriseSection } from "../../components/common/EnterpriseSection";
import { HeroSection } from "../../components/common/HeroSection";
import { HowItWorksSection } from "../../components/common/HowItWorksSection";


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