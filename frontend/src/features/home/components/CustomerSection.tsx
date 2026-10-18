import { ArrowRight, Check } from "lucide-react";
import "./CustomerSection.css";

export function CustomerSection() {
  const customerFeatures = [
    "Create quotation requests",
    "Receive proposals",
    "Compare proposal details",
    "Chat with Enterprise managers",
    "Approve proposals"
  ];

  const processSteps = [
    { label: "Quotation Request", icon: "arrow" },
    { label: "Enterprise Proposals", icon: "arrow" },
    { label: "Proposal Comparison", icon: "arrow" },
    { label: "Approval", icon: "check" },
  ];

  return (
    <section id="for-customers" className="customer-section">
      <div className="customer-container">
        <div className="customer-grid">
          {/* Left Column: Text & Features */}
          <div className="customer-content">
            <h2 className="customer-title">
              A Simpler Way to Find What
              <br />
              You Need
            </h2>

            <p className="customer-subtitle">
              Tell enterprises exactly what you are looking for and receive proposals in one organized place.
            </p>

            <ul className="customer-feature-list">
              {customerFeatures.map((feature, idx) => (
                <li key={idx} className="customer-feature-item">
                  <span className="customer-bullet" />
                  <span className="customer-feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Interactive Process Card Container */}
          <div className="customer-card-wrapper">
            <div className="customer-card-box">
              <div className="customer-steps-stack">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="customer-step-card"
                  >
                    <span className="customer-step-label">
                      {step.label}
                    </span>
                    {step.icon === "arrow" ? (
                      <ArrowRight className="customer-step-arrow" />
                    ) : (
                      <Check className="customer-step-check" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
