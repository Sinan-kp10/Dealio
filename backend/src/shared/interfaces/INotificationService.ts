export type NotificationType =
    | "KYC_VERIFIED"
    | "KYC_REJECTED"
    | "BANK_DETAILS_VERIFIED"
    | "BANK_DETAILS_REJECTED";

export interface SendNotification {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
}

export interface INotificationService {
    send(data: SendNotification): Promise<void>;
}