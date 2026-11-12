export interface UploadFileDTO {
    key: string;
    buffer: Buffer;
    contentType: string;
}

export interface IStorageService {
    getFileUrl(key: string): Promise<string>;

    uploadFile(data: UploadFileDTO): Promise<void>;

    deleteFile(key: string): Promise<void>;
}