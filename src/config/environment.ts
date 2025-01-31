import dotenv from 'dotenv';

dotenv.config();

export interface EnvironmentConfig {
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_BUCKET_NAME: string;

    MINIO_ROOT_USER: string;
    MINIO_ROOT_PASSWORD: string;
    MINIO_HOST: string;
    MINIO_PORT: number;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;

    ENV: string;
}

const config: EnvironmentConfig = {
    MINIO_HOST: process.env.MINIO_HOST || 'localhost',
    MINIO_PORT: parseInt(process.env.PORT || '9000', 10),
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || '',
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || '',
    MINIO_ROOT_USER: process.env.MINIO_ROOT_USER || '',
    MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD || '',

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',

    ENV: process.env.NODE_ENV || 'development',
};

if (!config.MINIO_ACCESS_KEY || !config.MINIO_SECRET_KEY) {
    throw new Error('Missing MINIO configuration in .env');
}

if (!config.AWS_ACCESS_KEY_ID || !config.AWS_SECRET_ACCESS_KEY || !config.AWS_REGION || !config.AWS_BUCKET_NAME) {
    throw new Error('Missing AWS configuration in .env');
}

export default config;
