import "./Footer.css";

export function Footer() {
  return (
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
  );
}
