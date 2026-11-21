import { useState, useEffect } from "react";
import { X, Send, IndianRupee, Clock, ShieldCheck, FileText, Sparkles } from "lucide-react";

export interface ProposalFormData {
  price: number;
  deliveryTime: string;
  warranty: string;
  notes: string;
}

interface EnterpriseSendProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: {
    id: string;
    productName: string;
    quantity: number;
    budget: number | null;
    location: string | null;
    category: string;
  } | null;
  onSubmit: (data: ProposalFormData) => void;
}

export function EnterpriseSendProposalModal({
  isOpen,
  onClose,
  quotation,
  onSubmit,
}: EnterpriseSendProposalModalProps) {
  const [price, setPrice] = useState<string>(() =>
    quotation?.budget ? quotation.budget.toLocaleString("en-IN") : ""
  );
  const [deliveryTime, setDeliveryTime] = useState<string>("Within 5 business days");
  const [warranty, setWarranty] = useState<string>("1 Year Official Manufacturer Warranty + GST Invoice");
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !quotation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrice = parseInt(price.replace(/,/g, ""), 10);
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      setError("Please enter a valid offer price greater than 0");
      return;
    }
    if (!deliveryTime.trim()) {
      setError("Please specify delivery timeline");
      return;
    }

    onSubmit({
      price: cleanPrice,
      deliveryTime: deliveryTime.trim(),
      warranty: warranty.trim(),
      notes: notes.trim(),
    });
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setPrice("");
      return;
    }
    setPrice(Number(raw).toLocaleString("en-IN"));
    if (error) setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0e2238]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1e3a5f] bg-[#edf4fb] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {quotation.category}
              </span>
              <span className="text-xs text-slate-400">• Qty: {quotation.quantity} Units</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0e2238] mt-1 m-0">
              Submit Quotation Proposal
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 m-0">
              For: <span className="font-semibold text-slate-700">{quotation.productName}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Buyer Budget Notice */}
          {quotation.budget && (
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-medium">Customer's Target Budget:</span>
              <span className="text-emerald-900 font-extrabold text-sm">
                ₹{quotation.budget.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Offer Price Input */}
          <div className="space-y-1.5">
            <label htmlFor="proposalPrice" className="text-xs sm:text-[13px] font-bold text-[#0e2238] flex items-center gap-1.5">
              <span>Your Offer Price (Total)</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <IndianRupee size={15} />
              </div>
              <input
                id="proposalPrice"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="e.g. 11,50,000"
                className="w-full h-11 pl-9 pr-4 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#2f5581] focus:ring-[3px] focus:ring-[#2f5581]/12 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400">Total inclusive offer amount for all {quotation.quantity} units.</p>
          </div>

          {/* Delivery Timeline Input */}
          <div className="space-y-1.5">
            <label htmlFor="deliveryTimeline" className="text-xs sm:text-[13px] font-bold text-[#0e2238] flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              <span>Estimated Delivery Timeline</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              id="deliveryTimeline"
              type="text"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              placeholder="e.g. Within 5-7 business days"
              className="w-full h-10 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#2f5581] focus:ring-[3px] focus:ring-[#2f5581]/12 transition-all"
            />
          </div>

          {/* Warranty & Inclusions */}
          <div className="space-y-1.5">
            <label htmlFor="warrantyTerms" className="text-xs sm:text-[13px] font-bold text-[#0e2238] flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-slate-400" />
              <span>Warranty & Terms</span>
            </label>
            <input
              id="warrantyTerms"
              type="text"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g. 1 Year Manufacturer Warranty, Free Delivery"
              className="w-full h-10 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:border-[#2f5581] focus:ring-[3px] focus:ring-[#2f5581]/12 transition-all"
            />
          </div>

          {/* Proposal Notes / Description */}
          <div className="space-y-1.5">
            <label htmlFor="proposalNotes" className="text-xs sm:text-[13px] font-bold text-[#0e2238] flex items-center gap-1.5">
              <FileText size={14} className="text-slate-400" />
              <span>Proposal Details & Scope</span>
            </label>
            <textarea
              id="proposalNotes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add details regarding model, specifications, commercial discounts, or special inclusions..."
              className="w-full p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl resize-y hover:border-slate-300 focus:outline-none focus:border-[#2f5581] focus:ring-[3px] focus:ring-[#2f5581]/12 transition-all"
            />
          </div>

          {/* Pro-Tip Box */}
          <div className="p-3 rounded-xl bg-[#edf4fb] border border-[#d2e4f5] flex items-start gap-2.5 text-xs text-[#1e3a5f]">
            <Sparkles size={16} className="text-[#2f5581] shrink-0 mt-0.5" />
            <p className="m-0 leading-relaxed text-[11.5px]">
              <span className="font-semibold">Seller Tip:</span> Competitive pricing combined with fast delivery timelines significantly increases the probability of the customer accepting your quote.
            </p>
          </div>

          {error && <p className="text-xs text-red-500 font-medium m-0">{error}</p>}

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.98] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Send size={14} />
              <span>Submit Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterpriseSendProposalModal;
