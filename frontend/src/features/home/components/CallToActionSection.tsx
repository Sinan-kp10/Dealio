import "./CallToActionSection.css";

export function CallToActionSection() {
  return (
    <div id="ready-to-start" className="cta-wrapper">
      {/* Ready to Get Started Call to Action */}
      <section className="cta-main-section">
        <div className="cta-container">
          {/* Header */}
          <div className="cta-header">
            <h2 className="cta-title">
              Ready to Get Started?
            </h2>
            <p className="cta-subtitle">
              Choose how you want to use Dealio.
            </p>
          </div>

          {/* Dual Action Cards */}
          <div className="cta-cards-grid">
            {/* Customer Card */}
            <div className="cta-card">
              <div className="cta-card-content">
                <span className="cta-badge">
                  CUSTOMER
                </span>
                <h3 className="cta-card-title">
                  Create a Quotation
                </h3>
                <p className="cta-card-desc">
                  Create a quotation request and start receiving proposals.
                </p>
              </div>

              <div className="cta-button-wrapper">
                <a
                  href="/signup/customer"
                  className="cta-btn"
                >
                  Create a Quotation
                </a>
              </div>
            </div>

            {/* Enterprise Card */}
            <div className="cta-card">
              <div className="cta-card-content">
                <span className="cta-badge">
                  ENTERPRISE
                </span>
                <h3 className="cta-card-title">
                  Join as an Enterprise
                </h3>
                <p className="cta-card-desc">
                  Join Dealio and connect with customer quotation requests.
                </p>
              </div>

              <div className="cta-button-wrapper">
                <a
                  href="/signup/enterprise"
                  className="cta-btn"
                >
                  Join as an Enterprise
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Top Footer Section */}
          <div className="footer-top">
            {/* Brand Info */}
            <div className="footer-brand">
              <a href="/" className="footer-brand-link">
                <img
                  src="/dealio-logo-white.png"
                  alt="Dealio"
                  className="footer-logo"
                />
              </a>
              <p className="footer-desc">
                A simple platform for connecting customers, enterprises, proposals, and deals.
              </p>
            </div>

            {/* Footer Navigation Links */}
            <div className="footer-links">
              <a href="#how-it-works" className="footer-link">
                How It Works
              </a>
              <a href="#for-customers" className="footer-link">
                For Customers
              </a>
              <a href="#for-enterprises" className="footer-link">
                For Enterprises
              </a>
              <a href="mailto:support@dealio.com" className="footer-link">
                Contact Support
              </a>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Dealio. All rights reserved.
            </div>

            <div className="footer-legal-links">
              <a href="#privacy" className="footer-legal-link">
                Privacy Policy
              </a>
              <a href="#terms" className="footer-legal-link">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
