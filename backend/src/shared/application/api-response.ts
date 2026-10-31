export interface IApiResponse<T = unknown> {
    status: boolean;
    message: string;
    data?: T;
}
