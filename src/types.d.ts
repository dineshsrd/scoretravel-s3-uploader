interface S3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName: string;
    endpoint?: string;
}

interface UploadUrlOptions {
    sourceUrl: string;
    destinationDir: string;
    sourceType?: string;
}