import { ArrowRight, Check } from "lucide-react";

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
    <div id="for-enterprises" className="w-full">
      <section className="bg-[var(--color-primary)] py-20 sm:py-28 text-white">
        <div className="w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-[clamp(3rem,5vw,6rem)] items-center">
            <div className="w-full max-w-[32rem] mx-auto lg:ml-0 lg:mr-auto lg:max-w-[34rem] order-2 lg:order-1">
              <div className="bg-[#244163]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg">
                <div className="flex flex-col gap-3 sm:gap-4">
                  {enterpriseProcessSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-[#3c638e]/60 rounded-xl py-4 px-5 border border-white/10 flex items-center justify-between transition-all duration-200 cursor-default hover:bg-[#3c638e]/80 hover:border-white/25 hover:translate-x-1"
                    >
                      <span className="text-sm sm:text-base font-medium text-white/95">
                        {step.label}
                      </span>
                      {step.icon === "arrow" ? (
                        <ArrowRight className="w-4 h-4 text-[#a5c8e4]" />
                      ) : (
                        <Check className="w-4 h-4 text-[#a5c8e4] stroke-[2.5]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full max-w-[44rem] order-1 lg:order-2">
              <h2 className="text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-white tracking-tight leading-[1.2] m-0">
                Turn Customer Requests
                <br />
                Into Opportunities
              </h2>

              <p className="mt-6 text-[clamp(1rem,1.5vw,1.125rem)] text-slate-200 leading-relaxed mb-0">
                Receive relevant quotation requests and let your sales team manage proposals and customer conversations from one place.
              </p>

              <ul className="mt-8 p-0 list-none flex flex-col gap-3.5 mb-0">
                {enterpriseFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-tertiary)] shrink-0" />
                    <span className="text-sm sm:text-base text-slate-100">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 border-b border-[var(--color-border)] overflow-hidden bg-[var(--bg-canvas)] lg:bg-transparent">
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-1/2 bg-[var(--bg-canvas)] z-0" />
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 bg-white z-0" />

        <div className="relative z-10 w-full max-w-[var(--container-standard,1440px)] mx-auto px-[clamp(1rem,3.5vw,3.5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-[clamp(3rem,5vw,6rem)] items-center">
            <div className="w-full max-w-[44rem]">
              <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold text-[var(--text-headline)] tracking-tight leading-[1.2] m-0">
                Stay Connected Throughout
                <br />
                the Deal
              </h2>

              <p className="mt-6 text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--text-body)] leading-relaxed mb-0">
                Customers and salespeople can communicate directly through Dealio.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-headline)] m-0">
                    Chat
                  </h3>
                  <p className="mt-1 mb-0 text-sm sm:text-base text-[var(--text-muted)]">
                    Discuss requirements directly.
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-headline)] m-0">
                    Video Call
                  </h3>
                  <p className="mt-1 mb-0 text-sm sm:text-base text-[var(--text-muted)]">
                    Communicate face-to-face when needed.
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-headline)] m-0">
                    Request Context
                  </h3>
                  <p className="mt-1 mb-0 text-sm sm:text-base text-[var(--text-muted)]">
                    Keep the quotation request connected to the conversation.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[36rem] mx-auto lg:ml-auto lg:mr-0 lg:max-w-[38rem]">
              <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="font-bold text-base sm:text-lg text-[var(--text-headline)] m-0">
                    Customer Conversation
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={msg.sender === "sales" ? "flex justify-end" : "flex justify-start"}
                    >
                      <div
                        className={
                          msg.sender === "sales"
                            ? "max-w-[85%] rounded-2xl rounded-tr-xs py-3 px-5 text-xs sm:text-sm leading-normal bg-[var(--color-primary)] text-white"
                            : "max-w-[85%] rounded-2xl rounded-tl-xs py-3 px-5 text-xs sm:text-sm leading-normal bg-[#eef2f6] text-[var(--text-body)]"
                        }
                      >
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
