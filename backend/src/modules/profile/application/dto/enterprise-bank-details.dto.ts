export interface CreateEnterpriseBankRecordDto {
  userId: string;
  accountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountType: string;
  upiId: string;
}

export interface UpdateEnterpriseBankRecordDto {
    userId: string;
    accountHolderName?: string;
    bankAccountNumber?: string;
    ifscCode?: string;
    accountType?: string;
    upiId?: string;
}

export interface SaveEnterpriseBankRecordRequestDto {
  accountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountType: string;
  upiId: string;
}

export interface BaseBankRecordDto {
  id: string;
  accountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountType: string;
  upiId: string | null;
  verifiedAt: Date | null;
}

export type ActiveBankRecordDto = BaseBankRecordDto;

export interface BankRecordRequestDto extends BaseBankRecordDto {
  status : string;
  rejectionReason : string | null;
}

export interface EnterpriseBankrecordDto {
  activeBankRecord: ActiveBankRecordDto | null;
  pendingRequest: BankRecordRequestDto | null;
}
