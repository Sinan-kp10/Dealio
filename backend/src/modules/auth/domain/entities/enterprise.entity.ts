
export type EnterpriseStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface Enterprise {
  id: string;
  enterprise_name: string;
  subcategory_id: string | null;
  status: EnterpriseStatus;
  description: string | null;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
