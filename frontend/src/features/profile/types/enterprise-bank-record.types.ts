export {BANK_ACCOUNT_TYPE_LABELS,type BankAccountType,} from "../../../constants/enterprise.constants";
import type { BankAccountType } from "../../../constants/enterprise.constants";

export type BankRecordStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface BaseBankRecord {
  id: string;
  accountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountType: BankAccountType;
  upiId: string | null;
  verifiedAt: string | null;
}

export type ActiveBankRecord = BaseBankRecord;

export interface BankRecordRequest extends BaseBankRecord {
  status: BankRecordStatus;
  rejectionReason: string | null;
}


export interface EnterpriseBankRecord {
  activeBankRecord: ActiveBankRecord | null;
  pendingRequest: BankRecordRequest | null;
}

export interface EnterpriseBankRecordResponse {
  success: boolean;
  message: string;
  data: EnterpriseBankRecord;
}

export interface SubmitBankRecordResponse {
  success: boolean;
  message: string;
  data: BankRecordRequest
}

export interface CreateEnterpriseBankRecordFormData {
  accountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountType: BankAccountType;
  upiId?: string;
}

export interface UpdateEnterpriseBankRecordInput {
  accountHolderName?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  accountType?: BankAccountType;
  upiId?: string;
}
