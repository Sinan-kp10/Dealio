export interface CreateEnterpriseBankRecordDto {
  userId: string;
  AccountHolderName : string;
  BankAccountNumber: string;
  ifscCode : string;
  accountType : string;
  upiId : string;
}

export interface UpdateEnterpriseBankRecordDto {
    userId : string
    AccountHolderName? : string;
    BankAccountNumber? : string;
    ifscCode? : string;
    accountType? : string;
    upiId? : string;
}

export interface SaveEnterpriseBankRecordRequestDto {
  AccountHolderName : string;
  BankAccountNumber: string;
  ifscCode : string;
  accountType : string;
  upiId : string;
}

export interface BaseBankRecordDto {
  id: string;
  AccountHolderName : string;
  BankAccountNumber: string;
  ifscCode : string;
  accountType : string;
  upiId : string | null;
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
