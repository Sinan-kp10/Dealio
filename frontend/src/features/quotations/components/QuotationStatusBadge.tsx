import type { QuotationRequestStatus } from "../types/quotation.types";

interface QuotationStatusBadgeProps {
  status: QuotationRequestStatus;
}

export function QuotationStatusBadge({ status }: QuotationStatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-amber-50 text-amber-700 border border-amber-200/70">
          Pending
        </span>
      );
    case "PROPOSAL_RECEIVED":
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-blue-50 text-blue-700 border border-blue-200/70">
          Proposal Received
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70">
          Accepted
        </span>
      );
    case "COMPLETED":
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-teal-50 text-teal-700 border border-teal-200/70">
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-red-50 text-red-700 border border-red-200/70">
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-slate-50 text-slate-700 border border-slate-200/70">
          {status}
        </span>
      );
  }
}

export default QuotationStatusBadge;
