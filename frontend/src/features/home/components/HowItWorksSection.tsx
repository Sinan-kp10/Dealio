import "./HowItWorksSection.css";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create a Request",
      description: "Customer submits their requirements.",
    },
    {
      number: "02",
      title: "Find the Right Enterprise",
      description: "Relevant enterprises receive the request.",
    },
    {
      number: "03",
      title: "Receive & Review Proposals",
      description: "Create proposals for the customer.",
    },
    {
      number: "04",
      title: "Approve & Complete",
      description: "Customer approves the proposal and completes the purchase.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Section Heading */}
        <h2 className="how-it-works-title">
          How Dealio Works
        </h2>

        {/* Stepper Grid Container */}
        <div className="stepper-wrapper">
          {/* Continuous Connecting Line (visible on desktop) */}
          <div className="stepper-line" aria-hidden="true" />

          <div className="stepper-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-item">
                {/* Step Number Badge */}
                <div className="step-badge">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="step-title">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="step-description">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
