import { ArrowRight, Check } from "lucide-react";

export function CustomerSection() {
  const customerFeatures = [
    "Create quotation requests",
    "Receive proposals",
    "Compare proposal details",
    "Chat with Enterprise managers",
    "Approve proposals",
  ];

  const processSteps = [
    { label: "Quotation Request", icon: "arrow" },
    { label: "Enterprise Proposals", icon: "arrow" },
    { label: "Proposal Comparison", icon: "arrow" },
    { label: "Approval", icon: "check" },
  ];

  return (
    <section id="for-customers" className="bg-white py-20 sm:py-28">
      <div className="w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-[clamp(3rem,5vw,6rem)] items-center">
          <div className="w-full max-w-[44rem]">
            <h2 className="text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-[var(--text-headline)] tracking-tight leading-[1.2] m-0">
              A Simpler Way to Find What
              <br />
              You Need
            </h2>

            <p className="mt-6 text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--text-body)] leading-relaxed mb-0">
              Tell enterprises exactly what you are looking for and receive proposals in one organized place.
            </p>

            <ul className="mt-8 p-0 list-none flex flex-col gap-3.5 mb-0">
              {customerFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-tertiary)] shrink-0" />
                  <span className="text-sm sm:text-base text-[var(--text-body)]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-[32rem] mx-auto lg:ml-auto lg:mr-0 lg:max-w-[34rem]">
            <div className="bg-[var(--color-primary-light)] rounded-3xl p-6 sm:p-8 border border-[#dde5ed]/80 shadow-xs">
              <div className="flex flex-col gap-3 sm:gap-4">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl py-4 px-5 border border-[var(--color-border)] shadow-xs flex items-center justify-between transition-all duration-200 cursor-default hover:translate-x-1"
                  >
                    <span className="text-sm sm:text-base font-medium text-[var(--text-body)]">
                      {step.label}
                    </span>
                    {step.icon === "arrow" ? (
                      <ArrowRight className="w-4 h-4 text-[var(--color-tertiary)]" />
                    ) : (
                      <Check className="w-4 h-4 text-[var(--color-primary)] stroke-[2.5]" />
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
