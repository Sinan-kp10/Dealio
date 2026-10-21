import { Link } from "react-router-dom";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Main Headline */}
        <h1 className="hero-title">
          Find What You Need.
          <br />
          Get the Right Proposal.
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Create a quotation request and connect with relevant enterprises
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <Link to="/signup/customer" className="hero-btn-primary">
            Create a Quotation
          </Link>
          <Link to="/signup/enterprise" className="hero-btn-secondary">
            Join as an Enterprise
          </Link>
        </div>
      </div>
    </section>
  );
}
