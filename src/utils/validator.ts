import { Response } from "undici";
import { MAX_FILE_SIZE } from "../config/constants";

export const contentValidator = async (response: Response) => {
    const contentType = response.headers.get("content-type") || "";

    console.log(`Content-Type: ${contentType}`);


    if (!/^(image|video)\//.test(contentType)) {
        throw new Error(`Unsupported file type`);
    }

    const contentLength = Number(response.headers.get("content-length")) || 0;

    console.log(`Content-Length: ${contentLength}`);

    if (contentLength > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the ${MAX_FILE_SIZE} limit.`);
    }
}