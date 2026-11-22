export type NotificationType =
    | "KYC_VERIFIED"
    | "KYC_REJECTED"
    | "BANK_DETAILS_VERIFIED"
    | "BANK_DETAILS_REJECTED"
    | "QUOTATION_RECEIVED"
    | "NEW_PROPOSAL_RECEIVED";

export interface SendNotification {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
}

export interface INotificationService {
    send(data: SendNotification): Promise<void>;
}