import "./home.css";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { CustomerSection } from "../components/CustomerSection";
import { EnterpriseSection } from "../components/EnterpriseSection";
import { CallToActionSection } from "../components/CallToActionSection";

export function HomePage() {
  return (
    <div className="home-page-container">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <CustomerSection />
      <EnterpriseSection />
      <CallToActionSection />
    </div>
  );
}