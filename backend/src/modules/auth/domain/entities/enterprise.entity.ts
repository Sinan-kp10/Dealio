
export interface Enterprise {
  id: string;
  name: string;
  subcategory_id: string | null;
  description: string | null;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
