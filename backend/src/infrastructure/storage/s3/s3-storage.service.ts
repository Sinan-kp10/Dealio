import { IStorageService, UploadFileDTO } from "../../../shared/interfaces/IStorageService";
import { env } from "../../../config/env";
import { s3Client } from "./s3-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export class S3StorageService implements IStorageService {

    getFileUrl = async (key: string): Promise<string> =>{
        
        const command = new GetObjectCommand({
            Bucket : env.aws.bucketName,
            Key : key
        })
        return getSignedUrl(s3Client,command, {
            expiresIn: 3600,
        })
    }

    uploadFile = async (data: UploadFileDTO): Promise<void> => {
        await s3Client.send(
            new PutObjectCommand({
                Bucket : env.aws.bucketName,
                Key : data.key,
                Body : data.buffer,
                ContentType : data.contentType
            })
        )
    }

    deleteFile = async (key: string): Promise<void> => {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: env.aws.bucketName,
                Key: key,
            })
        );
    }
}