import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {ArrowLeft,ShieldCheck,Truck,Send,Calculator,RotateCcw,} from "lucide-react";
import { EnterpriseCustomerRequestSnapshotCard } from "../../components/enterprise/EnterpriseCustomerRequestSnapshotCard";
import { Select, type SelectOption } from "../../../../components/common/select/Select";
import { ButtonSpinner } from "../../../../components/common/loading/ButtonSpinner";
import { submitEnterpriseProposal } from "../../services/enterprise-quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import type { AvailableQuotationDetails } from "../../types/enterprise-available-quotation-details.types";
import {createEnterpriseProposalSchema,type CreateEnterpriseProposalFormData,} from "../../schemas/create-enterprise-proposal.schema";

const DELIVERY_OPTIONS: SelectOption[] = [
  { label: "No delivery available (Buyer pickup)", value: "No delivery available (Buyer pickup)" },
  { label: "Within 3 business days", value: "Within 3 business days" },
  { label: "Within 5 business days", value: "Within 5 business days" },
  { label: "Within 7 business days", value: "Within 7 business days" },
  { label: "Custom", value: "Custom" },
];

const WARRANTY_OPTIONS: SelectOption[] = [
  { label: "No warranty available", value: "No warranty available" },
  { label: "6 Months Warranty", value: "6 Months Warranty" },
  { label: "1 Year Comprehensive Warranty", value: "1 Year Comprehensive Warranty" },
  { label: "2 Years Brand Warranty", value: "2 Years Brand Warranty" },
  { label: "Custom", value: "Custom" },
];

const REPLACEMENT_OPTIONS: SelectOption[] = [
  { label: "No replacement policy", value: "No replacement policy" },
  { label: "3 Days Doorstep Replacement", value: "3 Days Doorstep Replacement" },
  { label: "7 Days Doorstep Replacement", value: "7 Days Doorstep Replacement" },
  { label: "Inspection & Approval on Delivery", value: "Inspection & Approval on Delivery" },
  { label: "Custom", value: "Custom" },
];

export function EnterpriseCreateProposalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const quotation = (location.state as { quotation?: AvailableQuotationDetails } | null)?.quotation;

  const [isCustomDelivery, setIsCustomDelivery] = useState(false);
  const [isCustomWarranty, setIsCustomWarranty] = useState(false);
  const [isCustomReplacement, setIsCustomReplacement] = useState(false);

  useEffect(() => {
    if (!quotation) {
      navigate("/enterprise/quotations", { replace: true });
    }
  }, [quotation, id, navigate]);

  const {register,handleSubmit,control,setValue,formState: {errors, isSubmitting}} = useForm<CreateEnterpriseProposalFormData>({
    resolver: zodResolver(createEnterpriseProposalSchema),
    defaultValues: {
      itemName: quotation?.productName || "",
      quantity: quotation?.quantity || 1,
      unitPrice: "",
      deliveryTimeline: "",
      warrantyCoverage: "",
      replacementPolicy: "",
      additionalNotes: "",
    },
  });

  const quantity = useWatch({ control, name: "quantity", defaultValue: quotation?.quantity || 1 });
  const unitPrice = useWatch({ control, name: "unitPrice", defaultValue: "" });
  const deliveryTimeline = useWatch({ control, name: "deliveryTimeline", defaultValue: "" });
  const warrantyCoverage = useWatch({ control, name: "warrantyCoverage", defaultValue: "" });
  const replacementPolicy = useWatch({ control, name: "replacementPolicy", defaultValue: "" });

  const numericUnitPrice = Number(unitPrice) || 0;
  const totalAmount = (quantity || 0) * numericUnitPrice;

  const onSubmit = async (data: CreateEnterpriseProposalFormData) => {
    const targetQuotationId = quotation?.id || id;
    if (!targetQuotationId) return;

    try {
      await submitEnterpriseProposal(targetQuotationId, {
        itemName: data.itemName,
        description: data.description,
        quantity: data.quantity,
        unitPrice: Number(data.unitPrice),
        deliveryTimeline: data.deliveryTimeline,
        warrantyCoverage: data.warrantyCoverage,
        replacementPolicy: data.replacementPolicy,
        additionalNotes: data.additionalNotes || null,
      });
      navigate(`/enterprise/quotations/${targetQuotationId}`);
    } catch (error) {
      handleApiError(error, "Failed to submit proposal");
    }
  };

  if (!quotation) {
    return null;
  }

  return (
    <div className="w-full space-y-5 pb-16 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(`/enterprise/quotations/${quotation.id}`)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#355982] transition-colors cursor-pointer group py-1 self-start"
        >
          <ArrowLeft size={16} className="text-slate-500 group-hover:text-[#355982]" />
          <span>Back to Quotation Details</span>
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0e2238] tracking-tight m-0">
          Create Commercial Proposal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 m-0">
          Prepare your formal proposal for &ldquo;<strong>{quotation.productName}</strong>&rdquo; with pricing and fulfillment terms.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <EnterpriseCustomerRequestSnapshotCard
          quotation={quotation}
          className="block lg:hidden mb-5"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#edf4fb] text-[#1e3a5f] flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <h2 className="text-sm font-bold text-[#0e2238] m-0">
                  Offer Details & Inclusions
                </h2>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="itemName"
                  className="text-xs sm:text-[13px] font-semibold text-[#0e2238] block"
                >
                  Offered Item / Product Title
                </label>
                <input
                  id="itemName"
                  type="text"
                  {...register("itemName")}
                  placeholder="e.g. Ergonomic Office Chair / Executive Uniforms / Dell Latitude Laptop"
                  className={`w-full h-11 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none ${
                    errors.itemName
                      ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                  }`}
                />
                {errors.itemName && (
                  <span className="text-[11px] font-medium text-red-500 block">
                    {errors.itemName.message}
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="description"
                  className="text-xs sm:text-[13px] font-semibold text-[#0e2238] block"
                >
                  Offer Description & Inclusions
                </label>
                <textarea
                  id="description"
                  rows={3}
                  {...register("description")}
                  placeholder="Detail your item specifications, dimensions, material, inclusions, or fulfillment notes..."
                  className={`w-full p-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none leading-relaxed resize-y ${
                    errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                  }`}
                />
                {errors.description && (
                  <span className="text-[11px] font-medium text-red-500 block">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#edf4fb] text-[#1e3a5f] flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <h2 className="text-sm font-bold text-[#0e2238] m-0">
                  Commercial Terms & Policies
                </h2>
              </div>

              <div className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="deliveryTime"
                      className="text-xs sm:text-[13px] font-semibold text-[#0e2238] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <Truck size={14} className="text-[#355982]" />
                        <span>Delivery Timeline</span>
                      </span>
                      {isCustomDelivery && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomDelivery(false);
                            setValue("deliveryTimeline", "", { shouldValidate: true });
                          }}
                          className="text-[11px] font-semibold text-[#355982] hover:text-[#284566] cursor-pointer"
                        >
                          Select from presets
                        </button>
                      )}
                    </label>
                    {isCustomDelivery ? (
                      <input
                        id="deliveryTime"
                        type="text"
                        value={deliveryTimeline}
                        onChange={(e) => setValue("deliveryTimeline", e.target.value, { shouldValidate: true })}
                        placeholder="Type custom delivery timeline..."
                        autoFocus
                        className={`w-full h-11 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none ${
                          errors.deliveryTimeline
                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                        }`}
                      />
                    ) : (
                      <Select
                        value={deliveryTimeline}
                        onChange={(val) => {
                          if (val === "Custom") {
                            setIsCustomDelivery(true);
                            setValue("deliveryTimeline", "", { shouldValidate: false });
                          } else {
                            setValue("deliveryTimeline", val, { shouldValidate: true });
                          }
                        }}
                        options={DELIVERY_OPTIONS}
                        placeholder="Select delivery timeline"
                        hasError={Boolean(errors.deliveryTimeline)}
                        className="w-full"
                      />
                    )}
                    {errors.deliveryTimeline && (
                      <span className="text-[11px] font-medium text-red-500 block">
                        {errors.deliveryTimeline.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="warranty"
                      className="text-xs sm:text-[13px] font-semibold text-[#0e2238] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>Warranty Coverage</span>
                      </span>
                      {isCustomWarranty && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomWarranty(false);
                            setValue("warrantyCoverage", "", { shouldValidate: true });
                          }}
                          className="text-[11px] font-semibold text-[#355982] hover:text-[#284566] cursor-pointer"
                        >
                          Select from presets
                        </button>
                      )}
                    </label>
                    {isCustomWarranty ? (
                      <input
                        id="warranty"
                        type="text"
                        value={warrantyCoverage}
                        onChange={(e) => setValue("warrantyCoverage", e.target.value, { shouldValidate: true })}
                        placeholder="Type custom warranty coverage..."
                        autoFocus
                        className={`w-full h-11 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none ${
                          errors.warrantyCoverage
                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                        }`}
                      />
                    ) : (
                      <Select
                        value={warrantyCoverage}
                        onChange={(val) => {
                          if (val === "Custom") {
                            setIsCustomWarranty(true);
                            setValue("warrantyCoverage", "", { shouldValidate: false });
                          } else {
                            setValue("warrantyCoverage", val, { shouldValidate: true });
                          }
                        }}
                        options={WARRANTY_OPTIONS}
                        placeholder="Select warranty coverage"
                        hasError={Boolean(errors.warrantyCoverage)}
                        className="w-full"
                      />
                    )}
                    {errors.warrantyCoverage && (
                      <span className="text-[11px] font-medium text-red-500 block">
                        {errors.warrantyCoverage.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 w-full">
                  <label
                    htmlFor="replacementPolicy"
                    className="text-xs sm:text-[13px] font-semibold text-[#0e2238] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <RotateCcw size={14} className="text-amber-600" />
                      <span>Replacement Policy</span>
                    </span>
                    {isCustomReplacement && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomReplacement(false);
                          setValue("replacementPolicy", "", { shouldValidate: true });
                        }}
                        className="text-[11px] font-semibold text-[#355982] hover:text-[#284566] cursor-pointer"
                      >
                        Select from presets
                      </button>
                    )}
                  </label>
                  {isCustomReplacement ? (
                    <input
                      id="replacementPolicy"
                      type="text"
                      value={replacementPolicy}
                      onChange={(e) => setValue("replacementPolicy", e.target.value, { shouldValidate: true })}
                      placeholder="Type custom replacement policy..."
                      autoFocus
                      className={`w-full h-11 px-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none ${
                        errors.replacementPolicy
                          ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                          : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                      }`}
                    />
                  ) : (
                    <Select
                      value={replacementPolicy}
                      onChange={(val) => {
                        if (val === "Custom") {
                          setIsCustomReplacement(true);
                          setValue("replacementPolicy", "", { shouldValidate: false });
                        } else {
                          setValue("replacementPolicy", val, { shouldValidate: true });
                        }
                      }}
                      options={REPLACEMENT_OPTIONS}
                      placeholder="Select replacement policy"
                      hasError={Boolean(errors.replacementPolicy)}
                      className="w-full"
                    />
                  )}
                  {errors.replacementPolicy && (
                    <span className="text-[11px] font-medium text-red-500 block">
                      {errors.replacementPolicy.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 w-full flex-1 flex flex-col">
                  <label
                    htmlFor="customRemarks"
                    className="text-xs sm:text-[13px] font-semibold text-[#0e2238] block"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="customRemarks"
                    rows={3}
                    {...register("additionalNotes")}
                    placeholder="Enter any additional terms, payment conditions, or special notes..."
                    className={`w-full flex-1 min-h-[90px] p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border rounded-xl transition-all focus:outline-none leading-relaxed resize-y custom-scrollbar ${
                      errors.additionalNotes
                        ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                        : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                    }`}
                  />
                  {errors.additionalNotes && (
                    <span className="text-[11px] font-medium text-red-500 block">
                      {errors.additionalNotes.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <EnterpriseCustomerRequestSnapshotCard
              quotation={quotation}
              className="hidden lg:block"
            />

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#edf4fb] text-[#1e3a5f] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <h2 className="text-sm font-bold text-[#0e2238] m-0">
                    Pricing & Commercial Calculation
                  </h2>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quantity"
                      className="text-xs sm:text-[13px] font-semibold text-[#0e2238] block"
                    >
                      Quantity Offered
                    </label>
                    <div className="relative">
                      <input
                        id="quantity"
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                        className={`w-full h-11 pl-3.5 pr-14 text-xs sm:text-sm font-semibold text-slate-800 bg-white border rounded-xl transition-all focus:outline-none ${
                          errors.quantity
                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                        }`}
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                        Units
                      </span>
                    </div>
                    {errors.quantity && (
                      <span className="text-[11px] font-medium text-red-500 block">
                        {errors.quantity.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="unitPrice"
                      className="text-xs sm:text-[13px] font-semibold text-[#0e2238] block"
                    >
                      Offered Unit Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                        ₹
                      </span>
                      <input
                        id="unitPrice"
                        type="number"
                        step="any"
                        placeholder="e.g. 550"
                        {...register("unitPrice")}
                        className={`w-full h-11 pl-8 pr-16 text-xs sm:text-sm font-bold text-slate-900 bg-white border rounded-xl transition-all focus:outline-none ${
                          errors.unitPrice
                            ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
                        }`}
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                        / unit
                      </span>
                    </div>
                    {errors.unitPrice && (
                      <span className="text-[11px] font-medium text-red-500 block">
                        {errors.unitPrice.message}
                      </span>
                    )}
                  </div>

                  <div className="rounded-xl border border-sky-100 bg-[#f8fbfe] p-4 space-y-3">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-sky-100/80">
                      <Calculator size={15} className="text-[#355982]" />
                      <span className="text-xs sm:text-[13px] font-bold text-[#0e2238]">
                        Calculation Breakdown
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600 gap-2">
                        <span className="shrink-0">Calculated Subtotal:</span>
                        <span className="font-semibold text-slate-800 text-right truncate min-w-0 max-w-[65%]">
                          {quantity || 0} Units × ₹{numericUnitPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-sky-100 flex items-center justify-between gap-2">
                        <div className="shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-[#0e2238] block">
                            Total Proposal Offer
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Final commercial quote for customer
                          </span>
                        </div>
                        <span className="text-lg sm:text-xl font-black text-[#355982] tracking-tight text-right truncate min-w-0 max-w-[65%]">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100 mt-auto">
                <button
                  type="button"
                  onClick={() => navigate(`/enterprise/quotations/${quotation.id}`)}
                  className="w-36 sm:w-40 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer border border-slate-300 text-center shrink-0"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#355982] hover:bg-[#284566] active:scale-[0.99] rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <ButtonSpinner size="sm" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EnterpriseCreateProposalPage;
