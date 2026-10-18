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
          <a href="/login" className="hero-btn-primary">
            Create a Quotation
          </a>
          <a href="#for-enterprises" className="hero-btn-secondary">
            Join as an Enterprise
          </a>
        </div>
      </div>
    </section>
  );
}
