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
    <section id="how-it-works" className="bg-[var(--bg-canvas)] py-20 sm:py-24 lg:py-28">
      <div className="w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <h2 className="text-[clamp(1.875rem,3.5vw,2.25rem)] font-bold text-[var(--text-headline)] text-center tracking-tight m-0">
          How Dealio Works
        </h2>

        <div className="mt-16 sm:mt-20 relative">
          <div
            className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-[2px] bg-[var(--color-border-alt)] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[clamp(1.5rem,3vw,3.5rem)] relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm sm:text-base flex items-center justify-center shadow-[0_0_0_8px_var(--bg-canvas)]">
                  {step.number}
                </div>

                <h3 className="mt-5 text-base sm:text-lg font-bold text-[var(--text-headline)] mb-0">
                  {step.title}
                </h3>

                <p className="mt-2 mb-0 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-[280px]">
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
