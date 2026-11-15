import { useNavigate } from "react-router-dom";
import { Sparkles, Info, MapPin, ChevronDown, ChevronRight } from "lucide-react";

export function CreateQuotationPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0e2238] tracking-tight">
            Create Quotation Request
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Tell us what you&apos;re looking for, and receive competitive structured quotations from vetted suppliers.
          </p>
        </div>

        {/* Top Right Action: Only Prefill Sample Data (no Clear button) */}
        <div className="flex items-center shrink-0 self-start sm:self-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <Sparkles size={15} className="text-blue-600" />
            <span>Prefill Sample Data</span>
          </button>
        </div>
      </div>

      {/* Main Form Card Container */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/85 p-6 sm:p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 sm:space-y-7">
        {/* Row 1: Product Name and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Product Name */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="productName"
                className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <span className="text-[11.5px] text-slate-400 font-medium">0 / 120</span>
            </div>
            <input
              id="productName"
              type="text"
              readOnly
              placeholder="e.g. Buy a New iPhone"
              className="w-full h-11 px-3.5 sm:px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
            <p className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
              <Info size={13} className="text-slate-400 shrink-0" />
              <span>Enter any descriptive product name for your request</span>
            </p>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label
              htmlFor="category"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                disabled
                defaultValue=""
                className="w-full h-11 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm text-slate-500 bg-white border border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="" disabled>Select a category</option>
              </select>
              <ChevronDown
                size={17}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <p className="text-[11.5px] text-slate-400">
              Classifies your quotation request for accurate vendor routing
            </p>
          </div>
        </div>

        {/* Row 2: Sub Category and Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Sub Category */}
          <div className="space-y-1.5">
            <label
              htmlFor="subCategory"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Sub Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="subCategory"
                disabled
                defaultValue=""
                className="w-full h-11 pl-3.5 sm:pl-4 pr-10 text-xs sm:text-sm text-slate-400 bg-slate-50/70 border border-slate-200 rounded-xl appearance-none cursor-not-allowed focus:outline-none"
              >
                <option value="" disabled>Select a category first</option>
              </select>
              <ChevronDown
                size={17}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
            </div>
            <p className="text-[11.5px] text-slate-400">
              Specific sub category for specialized supplier matching
            </p>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label
              htmlFor="quantity"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="quantity"
                type="text"
                readOnly
                placeholder="Enter quantity"
                className="w-full h-11 pl-3.5 sm:pl-4 pr-16 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-md pointer-events-none">
                UNITS
              </span>
            </div>
            <p className="text-[11.5px] text-slate-400">
              How many units do you need?
            </p>
          </div>
        </div>

        {/* Row 3: Budget and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Budget */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label
                htmlFor="budget"
                className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
              >
                Budget
              </label>
              <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <input
              id="budget"
              type="text"
              readOnly
              placeholder="Enter your budget (e.g. ₹50,000 or $5,000)"
              className="w-full h-11 px-3.5 sm:px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
            <p className="text-[11.5px] text-slate-400">
              Your estimated budget for this request.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label
                htmlFor="location"
                className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
              >
                Location
              </label>
              <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <div className="relative">
              <MapPin
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="location"
                type="text"
                readOnly
                placeholder="Enter your preferred location (e.g. New York, USA or Kozhikode, Kerala)"
                className="w-full h-11 pl-10 pr-3.5 sm:pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
            <p className="text-[11.5px] text-slate-400">
              Specify a preferred location if relevant to your request.
            </p>
          </div>
        </div>

        {/* Row 4: Description / Detailed Requirements */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="text-xs sm:text-[13.5px] font-semibold text-[#0e2238]"
            >
              Description / Detailed Requirements <span className="text-red-500">*</span>
            </label>
            <span className="text-[11.5px] text-slate-400 font-medium">0 characters</span>
          </div>
          <textarea
            id="description"
            rows={4}
            readOnly
            placeholder="Describe the product you are looking for, including specifications, color, material, size, model, brand, or any other requirements."
            className="w-full p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl resize-y transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 leading-relaxed"
          />
          <p className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
            <Info size={13} className="text-slate-400 shrink-0" />
            <span>Add as much detail as needed so sellers can provide accurate quotations.</span>
          </p>
        </div>

        {/* Bottom Actions: Cancel and Submit (tight spacing near the description field) */}
        <div className="!mt-3.5 sm:!mt-4 pt-0 flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate("/customer")}
            className="px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1e3a5f] hover:bg-[#152a45] rounded-xl transition-all shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <span>Submit Quotation Request</span>
            <ChevronRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuotationPage;
