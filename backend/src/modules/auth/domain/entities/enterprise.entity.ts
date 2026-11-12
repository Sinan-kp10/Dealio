export type EnterpriseStatus = "PENDING" | "VERIFIED";

export interface Enterprise {
  id: string;
  enterprise_name: string;
  category_id?: string | null;
  status: EnterpriseStatus;
  description: string | null;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  subcategories?: { subcategory_id: string }[];
}
