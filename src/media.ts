import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { fetch } from "undici";
import { Readable } from "stream";
import { Client } from "minio";
import { contentValidator } from "./utils/validator";
import { EnvironmentConfig } from './config/environment';

export class Media {
    private minIoClient: Client;
    private s3Client: S3Client;
    private bucketName: string;

    constructor(envConfig: EnvironmentConfig) {
        this.minIoClient = new Client({
            endPoint: envConfig.MINIO_HOST,
            port: envConfig.MINIO_PORT,
            useSSL: false,
            accessKey: envConfig.MINIO_ACCESS_KEY,
            secretKey: envConfig.MINIO_SECRET_KEY,
        });
        this.s3Client = new S3Client({
            region: envConfig.AWS_REGION,
            credentials: {
                accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
                secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = envConfig.AWS_BUCKET_NAME;
    }

    public async uploadStreamFromUrl(envConfig: EnvironmentConfig, options: UploadUrlOptions): Promise<string> {

        const { sourceUrl, destinationDir, sourceType } = options;
        const response = await fetch(sourceUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch file from URL: ${response.statusText}`);
        }

        await contentValidator(response);

        const fileName = sourceUrl.split('/').pop();
        if (!fileName) {
            throw new Error('Unable to extract file name from URL.');
        }

        const s3Key = `${destinationDir}/${fileName}`;

        if (!response.body) {
            throw new Error("Response body is null.");
        }

        const readableStream = Readable.fromWeb(response.body);
        const contentType = response.headers.get("content-type") || "";
        const contentLength = Number(response.headers.get("content-length")) || 0;

        if (envConfig.ENV === "prod") {
            const upload = new Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.bucketName,
                    Key: s3Key,
                    Body: readableStream,
                    ContentType: contentType,
                },
            });
            await upload.done();
            return `https://${this.bucketName}.s3.amazonaws.com/${s3Key}`;
        } else {
            await this.minIoClient.putObject(this.bucketName, s3Key, readableStream, contentLength, {
                "Content-Type": contentType,
            });
            return `https://${this.bucketName}.s3.amazonaws.com/${s3Key}`;
        }
    }
}
