import { ArrowRight, Check } from "lucide-react";
import "./EnterpriseSection.css";

export function EnterpriseSection() {
  const enterpriseFeatures = [
    "Receive quotation requests",
    "Accept suitable requests",
    "Create proposals",
    "Communicate with customers",
    "Manage completed deals",
  ];

  const enterpriseProcessSteps = [
    { label: "Quotation Request", icon: "arrow" },
    { label: "Request Accepted", icon: "arrow" },
    { label: "Proposal Created", icon: "arrow" },
    { label: "Deal Completed", icon: "check" },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "customer",
      text: "Hello, I have a question regarding the proposal.",
    },
    {
      id: 2,
      sender: "sales",
      text: "Of course! I'm happy to clarify. What do you need to know?",
    },
    {
      id: 3,
      sender: "customer",
      text: "Would it be possible to discuss a different pricing option?",
    },
    {
      id: 4,
      sender: "sales",
      text: "Certainly! Let's discuss your requirements and see what works best for both sides.",
    },
    {
      id: 5,
      sender: "customer",
      text: "Sounds good! Let's discuss it further.",
    },
  ];

  return (
    <div id="for-enterprises" className="enterprise-wrapper">
      {/* Part 1: Turn Customer Requests Into Opportunities (Slate Blue Section) */}
      <section className="enterprise-primary-section">
        <div className="enterprise-container">
          <div className="enterprise-grid">
            {/* Left Column: Interactive Enterprise Process Box */}
            <div className="enterprise-box-wrapper">
              <div className="enterprise-card-box">
                <div className="enterprise-steps-stack">
                  {enterpriseProcessSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="enterprise-step-card"
                    >
                      <span className="enterprise-step-label">
                        {step.label}
                      </span>
                      {step.icon === "arrow" ? (
                        <ArrowRight className="enterprise-step-arrow" />
                      ) : (
                        <Check className="enterprise-step-check" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Text & Features */}
            <div className="enterprise-content">
              <h2 className="enterprise-title">
                Turn Customer Requests
                <br />
                Into Opportunities
              </h2>

              <p className="enterprise-subtitle">
                Receive relevant quotation requests and let your sales team manage proposals and customer conversations from one place.
              </p>

              <ul className="enterprise-feature-list">
                {enterpriseFeatures.map((feature, idx) => (
                  <li key={idx} className="enterprise-feature-item">
                    <span className="enterprise-bullet" />
                    <span className="enterprise-feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Stay Connected Throughout the Deal (Split Background with Direct Chat Mockup) */}
      <section className="conversation-section">
        {/* Split Background: Left half soft blue, right half pure white */}
        <div className="conversation-bg-left" />
        <div className="conversation-bg-right" />

        <div className="conversation-container">
          <div className="conversation-grid">
            {/* Left Column: Heading and Feature Pillars */}
            <div className="conversation-content">
              <h2 className="conversation-title">
                Stay Connected Throughout
                <br />
                the Deal
              </h2>

              <p className="conversation-subtitle">
                Customers and salespeople can communicate directly through Dealio.
              </p>

              <div className="conversation-pillars">
                <div>
                  <h3 className="pillar-title">
                    Chat
                  </h3>
                  <p className="pillar-desc">
                    Discuss requirements directly.
                  </p>
                </div>

                <div>
                  <h3 className="pillar-title">
                    Video Call
                  </h3>
                  <p className="pillar-desc">
                    Communicate face-to-face when needed.
                  </p>
                </div>

                <div>
                  <h3 className="pillar-title">
                    Request Context
                  </h3>
                  <p className="pillar-desc">
                    Keep the quotation request connected to the conversation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Customer Conversation Mockup Card (No RFQ-2026, No outer container) */}
            <div className="conversation-card-wrapper">
              <div className="conversation-card">
                {/* Header */}
                <div className="conversation-card-header">
                  <h3 className="conversation-card-title">
                    Customer Conversation
                  </h3>
                </div>

                {/* Chat Bubbles */}
                <div className="conversation-messages-stack">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={msg.sender === "sales" ? "msg-row-sales" : "msg-row-customer"}
                    >
                      <div className={msg.sender === "sales" ? "bubble-sales" : "bubble-customer"}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
