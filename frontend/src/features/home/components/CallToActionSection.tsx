import { Link } from "react-router-dom";
import "./CallToActionSection.css";

export function CallToActionSection() {
  return (
    <div id="ready-to-start" className="cta-wrapper">
      <section className="cta-main-section">
        <div className="cta-container">
          <div className="cta-header">
            <h2 className="cta-title"> Ready to Get Started? </h2>
            <p className="cta-subtitle"> Choose how you want to use Dealio.</p>
          </div>

          <div className="cta-cards-grid">
            <div className="cta-card">
              <div className="cta-card-content">
                <span className="cta-badge"> CUSTOMER</span>
                <h3 className="cta-card-title"> Create a Quotation</h3>
                <p className="cta-card-desc"> Create a quotation request and start receiving proposals.</p>
              </div>

              <div className="cta-button-wrapper">
                <Link to="/signup/customer" className="cta-btn">Create a Quotation</Link>
              </div>
            </div>

            <div className="cta-card">
              <div className="cta-card-content">
                <span className="cta-badge"> ENTERPRISE</span>
                <h3 className="cta-card-title"> Join as an Enterprise</h3>
                <p className="cta-card-desc"> Join Dealio and connect with customer quotation requests.</p>
              </div>

              <div className="cta-button-wrapper">
                <Link to="/register/enterprise" className="cta-btn">Join as an Enterprise</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
