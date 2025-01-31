import { describe, it, expect, vi } from "vitest";
import { Media } from "../src/media"; // Adjust path as necessary
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fixtures from "./fixtures.json";
import config from "../src/config/environment";

vi.mock("@aws-sdk/client-s3");

describe("Media", () => {
    const media = new Media(config);

    it("should upload a file from URL", async () => {
        const mockPutObjectCommand = vi.fn();
        S3Client.prototype.send = mockPutObjectCommand;

        const fileUrl = fixtures["150mb_video"];
        const s3Key = "uploads";

        const uploadOptions = {
            sourceUrl: fileUrl,
            destinationDir: s3Key,
        };

        describe("should call the mock at least once", async () => {
            const result = await media.uploadStreamFromUrl(uploadOptions);
            console.log(result);
            expect(mockPutObjectCommand).toHaveBeenCalled();
            expect(result).toBe(`https://${config.AWS_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`);
        });
    });

    it("should throw an error for unsupported file types", async () => {
        const invalidFileUrl = fixtures["text_file"];
        const s3Key = "uploads";

        const uploadOptions = {
            sourceUrl: invalidFileUrl,
            destinationDir: s3Key,
        };

        await expect(media.uploadStreamFromUrl(uploadOptions)).rejects.toThrow("Unsupported file type");
    });

    // Add more tests for streaming and edge cases
});
