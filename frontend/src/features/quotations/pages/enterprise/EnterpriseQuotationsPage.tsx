import { useState, useMemo } from "react";
import {Search,X,Tag,ChevronDown,MessageSquare,Send,MapPin,Package,IndianRupee,Clock,Eye,FileText,ShieldCheck,Truck, Ban,} from "lucide-react";
import { toast } from "react-toastify";
import { QuotationDescriptionModal } from "../../components/QuotationDescriptionModal";
import { EnterpriseSendProposalModal, type ProposalFormData } from "../../components/enterprise/EnterpriseSendProposalModal";

type TabType = "available" | "proposals";

interface EnterpriseQuotationItem {
  id: string;
  productName: string;
  subCategory: string;
  quantity: number;
  budget: number | null;
  location: string | null;
  description: string;
  createdAt: string;
  status: "available" | "proposal_sent";
  proposal?: {
    price: number;
    deliveryTime: string;
    warranty: string;
    notes: string;
    submittedAt: string;
  };
}

// Initial mock dataset: Customer requests matching enterprise subcategories
const INITIAL_QUOTATIONS: EnterpriseQuotationItem[] = [
  {
    // CASE 1: With Budget AND With Delivery Location
    id: "q-1",
    productName: "Business Laptop for Office",
    subCategory: "Laptops",
    quantity: 15,
    budget: 1200000,
    location: "Kozhikode, Kerala",
    description:
      "Looking for 15 high-performance business laptops (13th Gen Intel Core i7 or newer, 16GB RAM, 512GB SSD) with 3-year on-site commercial warranty. Delivery needed within 7 business days.",
    createdAt: "2 hours ago",
    status: "available",
  },
  {
    // CASE 2: NO Budget (null), but WITH Delivery Location
    id: "q-2",
    productName: "Complete CCTV Surveillance System for Commercial Building",
    subCategory: "Cameras",
    quantity: 24,
    budget: null,
    location: "Ernakulam, Kochi",
    description:
      "Need a complete CCTV surveillance solution for a commercial building: 16 indoor dome cameras, 8 outdoor bullet cameras, 32-channel NVR with 8TB storage, installation and cabling included.",
    createdAt: "4 hours ago",
    status: "available",
  },
  {
    // CASE 3: WITH Budget, but NO Delivery Location (null)
    id: "q-3",
    productName: "Industrial Grade Commercial Air Purifiers",
    subCategory: "Appliances",
    quantity: 8,
    budget: 480000,
    location: null,
    description:
      "Require 8 heavy-duty medical-grade air purifiers for clinic branches. Minimum CADR 600 m3/h with True HEPA H14 filtration.",
    createdAt: "Yesterday",
    status: "available",
  },
  {
    // CASE 4: NEITHER Budget NOR Delivery Location (both null)
    id: "q-4",
    productName: "Thermal Barcode Shipping Label Printers",
    subCategory: "Printers",
    quantity: 12,
    budget: null,
    location: null,
    description:
      "Direct thermal barcode label printers for fulfillment shipping stations with USB and Ethernet connectivity.",
    createdAt: "2 days ago",
    status: "available",
  },
  {
    // SUBMITTED PROPOSAL 1: With Budget and Location
    id: "q-5",
    productName: "Enterprise Network Rack and Managed Switches",
    subCategory: "Networking",
    quantity: 6,
    budget: 180000,
    location: "Kozhikode, Kerala",
    description:
      "Enterprise server rack and 24-port Gigabit PoE+ managed switches for our new branch network infrastructure.",
    createdAt: "3 days ago",
    status: "proposal_sent",
    proposal: {
      price: 172000,
      deliveryTime: "Immediate Dispatch (Next Day)",
      warranty: "Lifetime Hardware on Switches + 3 Years on Rack",
      notes: "Includes Cisco-compatible Gigabit PoE+ 24-Port Managed switches + 42U Server Rack with PDU and cable managers.",
      submittedAt: "2 days ago",
    },
  },
  {
    // SUBMITTED PROPOSAL 2: Without Budget, With Location
    id: "q-6",
    productName: "Commercial Grade Mesh Wi-Fi 6 Access Points",
    subCategory: "Networking",
    quantity: 20,
    budget: null,
    location: "Kochi, Kerala",
    description:
      "High-density Wi-Fi 6 ceiling access points with cloud controller management for 3-floor co-working space.",
    createdAt: "4 days ago",
    status: "proposal_sent",
    proposal: {
      price: 145000,
      deliveryTime: "Within 3 business days",
      warranty: "2 Years Full Replacement Warranty",
      notes: "Supplied 20x Dual-Band Wi-Fi 6 PoE Ceiling APs with cloud controller portal license and ceiling mount kits.",
      submittedAt: "Yesterday",
    },
  },
  {
    // SUBMITTED PROPOSAL 3: With Budget, Without Location
    id: "q-7",
    productName: "High-Volume Laser Multifunction Printers",
    subCategory: "Printers",
    quantity: 10,
    budget: 450000,
    location: null,
    description:
      "10 commercial monochrome laser multifunction printers for accounting firm branches with duplex printing and network scanning.",
    createdAt: "5 days ago",
    status: "proposal_sent",
    proposal: {
      price: 430000,
      deliveryTime: "Within 4 business days",
      warranty: "3 Years Comprehensive On-Site Warranty",
      notes: "Supplied HP LaserJet Enterprise MFP series with 10 high-yield toner cartridges included.",
      submittedAt: "3 days ago",
    },
  },
];

export function EnterpriseQuotationsPage() {
  const [quotations, setQuotations] = useState<EnterpriseQuotationItem[]>(INITIAL_QUOTATIONS);
  const [activeTab, setActiveTab] = useState<TabType>("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");

  // Modals state
  const [proposalModalQuotation, setProposalModalQuotation] = useState<EnterpriseQuotationItem | null>(null);
  const [specsModalQuotation, setSpecsModalQuotation] = useState<EnterpriseQuotationItem | null>(null);

  // Tab counters
  const tabCounts = useMemo(() => {
    return {
      available: quotations.filter((q) => q.status === "available").length,
      proposals: quotations.filter((q) => q.status === "proposal_sent").length,
    };
  }, [quotations]);

  // Subcategories list extracted from quotations
  const subCategories = useMemo(() => {
    const list = Array.from(new Set(quotations.map((q) => q.subCategory)));
    return ["ALL", ...list];
  }, [quotations]);

  // Filtered quotations (tab + search + subcategory)
  const displayedQuotations = useMemo(() => {
    return quotations.filter((q) => {
      if (q.status !== activeTab) return false;
      if (selectedSubCategory !== "ALL" && q.subCategory !== selectedSubCategory) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.productName.toLowerCase().includes(query);
        const matchDesc = q.description.toLowerCase().includes(query);
        const matchSub = q.subCategory.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchSub) return false;
      }

      return true;
    });
  }, [quotations, activeTab, selectedSubCategory, searchQuery]);

  // Action: Mark request as Not Interested
  const handleNotInterested = (id: string) => {
    setQuotations((prev) => prev.filter((item) => item.id !== id));
    toast.info("Marked as not interested and removed from feed.");
  };

  // Action: Submit proposal
  const handleSubmitProposal = (formData: ProposalFormData) => {
    if (!proposalModalQuotation) return;

    setQuotations((prev) =>
      prev.map((item) =>
        item.id === proposalModalQuotation.id
          ? {
              ...item,
              status: "proposal_sent",
              proposal: {
                price: formData.price,
                deliveryTime: formData.deliveryTime,
                warranty: formData.warranty,
                notes: formData.notes,
                submittedAt: "Just now",
              },
            }
          : item
      )
    );
    toast.success(
      `Proposal of ₹${formData.price.toLocaleString("en-IN")} submitted successfully!`
    );
    setActiveTab("proposals");
  };

  const handleOpenChat = () => {
    toast.info("Opening secure chat with buyer...");
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* Page Header (No static stats pill) */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e2238] tracking-tight m-0">
          Quotation Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 m-0">
          Customer inquiries matching your enterprise categories. Review requirements, chat with buyers, and submit proposals.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pb-px">
        <button
          type="button"
          onClick={() => setActiveTab("available")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "available"
              ? "border-[#355982] text-[#355982]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Available Requests</span>
          <span
            className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
              activeTab === "available"
                ? "bg-[#355982] text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {tabCounts.available}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("proposals")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "proposals"
              ? "border-[#355982] text-[#355982]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Submitted Proposals</span>
          <span
            className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
              activeTab === "proposals"
                ? "bg-[#355982] text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {tabCounts.proposals}
          </span>
        </button>
      </div>

      {/* Search Bar & Subcategory Filter Directly Below Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search Input - Clean constrained width */}
        <div className="relative w-full sm:w-72 md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product or specs..."
            className="w-full h-10 pl-9 pr-8 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#355982] focus:ring-2 focus:ring-[#355982]/15 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Custom Styled Subcategory Dropdown (Clean arrow, no floating funnel) */}
        <div className="relative self-start sm:self-auto shrink-0">
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="appearance-none h-10 pl-3.5 pr-9 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#355982] focus:ring-2 focus:ring-[#355982]/15 transition-all cursor-pointer shadow-2xs"
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub === "ALL" ? "All Subcategories" : sub}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Quotation Cards Feed */}
      <div className="space-y-4">
        {displayedQuotations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText size={24} />
            </div>
            <h3 className="text-base font-bold text-[#0e2238] m-0">No Quotations Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto m-0">
              {searchQuery || selectedSubCategory !== "ALL"
                ? "No quotation requests matched your filters. Try clearing your search."
                : activeTab === "available"
                ? "There are currently no customer requests waiting in your subcategories."
                : "You haven't submitted any proposals yet."}
            </p>
          </div>
        ) : (
          displayedQuotations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all space-y-3.5"
            >
              {/* TOP ROW: Product Title on left, Status Badge on right (Nothing above the product name!) */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-[#0e2238] tracking-tight m-0">
                  {item.productName}
                </h2>

                {/* Status Badge in the top right across from title */}
                {item.status === "available" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 shrink-0 self-start sm:self-center">
                    <Clock size={11} className="text-emerald-600" />
                    <span>Waiting for Proposal</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/90 shrink-0 self-start sm:self-center">
                    <Clock size={11} className="text-amber-600" />
                    <span>Proposal Submitted</span>
                  </span>
                )}
              </div>

              {/* HORIZONTAL BADGES ROW: Strictly Quotation Data Fields (Subcategory, Quantity, Budget, Delivery Location) */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {/* Subcategory Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold">
                  <Tag size={13} className="text-slate-500 shrink-0" />
                  <span>
                    Subcategory: <strong className="font-bold text-slate-900">{item.subCategory}</strong>
                  </span>
                </div>

                {/* Quantity */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/70 text-[#1e3a5f] border border-blue-100/90 text-xs font-semibold">
                  <Package size={14} className="text-blue-600 shrink-0" />
                  <span>
                    Quantity: <strong className="font-extrabold text-[#0e2238]">{item.quantity} Units</strong>
                  </span>
                </div>

                {/* Budget: ONLY rendered if budget exists */}
                {item.budget !== null && item.budget > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-semibold">
                    <IndianRupee size={14} className="text-emerald-700 shrink-0" />
                    <span>
                      Budget: <strong className="font-extrabold text-emerald-950">₹{item.budget.toLocaleString("en-IN")}</strong>
                    </span>
                  </div>
                )}

                {/* Delivery Location: ONLY rendered if location exists */}
                {item.location && item.location.trim().length > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] text-slate-700 border border-slate-200/90 text-xs font-semibold">
                    <MapPin size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate max-w-[220px] sm:max-w-[320px]">
                      Location: <strong className="font-bold text-slate-800">{item.location}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Requirements Description Snippet with Inline View more (No separate header or button) */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-100/90 text-xs leading-relaxed text-slate-600">
                <p className="m-0 leading-relaxed text-slate-600">
                  {item.description.length > 105 ? (
                    <>
                      <span>{item.description.slice(0, 100).trim()}...</span>{" "}
                      <button
                        type="button"
                        onClick={() => setSpecsModalQuotation(item)}
                        className="inline font-bold text-[#355982] hover:text-[#0e2238] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View more
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{item.description}</span>{" "}
                      <button
                        type="button"
                        onClick={() => setSpecsModalQuotation(item)}
                        className="inline font-bold text-[#355982] hover:text-[#0e2238] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View more
                      </button>
                    </>
                  )}
                </p>
              </div>

              {/* Submitted Proposal Container (Only shown in Submitted Proposals tab) */}
              {item.status === "proposal_sent" && item.proposal && (
                <div className="rounded-xl border border-sky-200/90 bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-indigo-50/30 p-4 sm:p-4.5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-sky-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#355982] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Send size={13} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0e2238] block leading-tight">
                          Your Submitted Proposal
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Sent {item.proposal.submittedAt}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/90 text-[11px] font-semibold">
                      <Clock size={12} className="text-amber-600" />
                      <span>Awaiting Buyer Decision</span>
                    </div>
                  </div>

                  {/* Proposal Key Terms Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white/95 border border-sky-100/90 shadow-2xs">
                      <span className="text-[11px] font-medium text-slate-500 block">Offered Price</span>
                      <span className="text-base sm:text-lg font-extrabold text-[#355982] tracking-tight">
                        ₹{item.proposal.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/95 border border-sky-100/90 shadow-2xs">
                      <span className="text-[11px] font-medium text-slate-500 block">Delivery Timeline</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                        <Truck size={14} className="text-[#355982] shrink-0" />
                        <span className="truncate">{item.proposal.deliveryTime}</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/95 border border-sky-100/90 shadow-2xs">
                      <span className="text-[11px] font-medium text-slate-500 block">Warranty Terms</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                        <span className="truncate">{item.proposal.warranty}</span>
                      </span>
                    </div>
                  </div>

                  {/* Scope & Terms Notes */}
                  {item.proposal.notes && (
                    <div className="p-3 rounded-xl bg-white/90 border border-sky-100/80 text-xs">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Scope of Supply & Notes:
                      </span>
                      <p className="text-slate-600 m-0 leading-relaxed text-[11.5px]">
                        {item.proposal.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Card Footer Actions: Timestamp on Left, Buttons on Right */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                {/* Timestamp cleanly placed on bottom left */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock size={13} className="text-slate-400 shrink-0" />
                  <span>Received {item.createdAt}</span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap sm:flex-nowrap">
                  {/* Chat Button */}
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0e2238] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    <MessageSquare size={14} className="text-slate-500" />
                    <span>Chat with Buyer</span>
                  </button>

                  {/* Actions for Available Requests */}
                  {item.status === "available" && (
                    <>
                      {/* Cancel / Not Interested Button: Always red, darker on hover */}
                      <button
                        type="button"
                        onClick={() => handleNotInterested(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                        title="Mark as not interested"
                      >
                        <Ban size={13} strokeWidth={2.2} />
                        <span>Not Interested</span>
                      </button>

                      {/* Send Proposal Button: Theme color #355982 */}
                      <button
                        type="button"
                        onClick={() =>
                          setProposalModalQuotation({
                            ...item,
                            category: item.subCategory,
                          } as unknown as EnterpriseQuotationItem)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.98] rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        <Send size={13} />
                        <span>Send Proposal</span>
                      </button>
                    </>
                  )}

                  {/* Actions for Submitted Proposals */}
                  {item.status === "proposal_sent" && (
                    <button
                      type="button"
                      onClick={() => setSpecsModalQuotation(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#355982] bg-[#edf4fb] hover:bg-[#e2effa] rounded-xl transition-all cursor-pointer border border-[#355982]/20"
                    >
                      <Eye size={13} />
                      <span>View Specifications</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Specifications Modal */}
      {specsModalQuotation && (
        <QuotationDescriptionModal
          isOpen={!!specsModalQuotation}
          onClose={() => setSpecsModalQuotation(null)}
          productName={specsModalQuotation.productName}
          description={specsModalQuotation.description}
        />
      )}

      {/* Send Proposal Modal */}
      {proposalModalQuotation && (
        <EnterpriseSendProposalModal
          key={proposalModalQuotation.id}
          isOpen={!!proposalModalQuotation}
          onClose={() => setProposalModalQuotation(null)}
          quotation={{
            id: proposalModalQuotation.id,
            productName: proposalModalQuotation.productName,
            quantity: proposalModalQuotation.quantity,
            budget: proposalModalQuotation.budget,
            location: proposalModalQuotation.location,
            category: proposalModalQuotation.subCategory,
          }}
          onSubmit={handleSubmitProposal}
        />
      )}
    </div>
  );
}

export default EnterpriseQuotationsPage;
