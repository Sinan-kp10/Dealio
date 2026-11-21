export type BadgeStatus =
  | "PENDING"
  | "OPEN"
  | "PROPOSAL_SENT"
  | "CLOSED"
  | "PROPOSAL_RECEIVED"
  | "ACCEPTED"
  | "PAY_ADVANCE"
  | "COMPLETED"
  | "CANCELLED"
  | string;

export interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-amber-50 text-amber-700 border border-amber-200/70 ${className}`}
        >
          Pending
        </span>
      );
    case "OPEN":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-amber-50 text-amber-700 border border-amber-200/70 ${className}`}
        >
          Open
        </span>
      );
    case "PROPOSAL_SENT":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-blue-50 text-blue-700 border border-blue-200/70 ${className}`}
        >
          Proposal Sent
        </span>
      );
    case "CLOSED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-slate-100 text-slate-600 border border-slate-200/80 ${className}`}
        >
          Closed
        </span>
      );
    case "PROPOSAL_RECEIVED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-blue-50 text-blue-700 border border-blue-200/70 ${className}`}
        >
          Proposal Received
        </span>
      );
    case "ACCEPTED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70 ${className}`}
        >
          Accepted
        </span>
      );
    case "PAY_ADVANCE":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70 ${className}`}
        >
          Pay Advance
        </span>
      );
    case "COMPLETED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-teal-50 text-teal-700 border border-teal-200/70 ${className}`}
        >
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-red-50 text-red-700 border border-red-200/70 ${className}`}
        >
          Cancelled
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-slate-50 text-slate-700 border border-slate-200/70 ${className}`}
        >
          {status}
        </span>
      );
  }
}

export default StatusBadge;
