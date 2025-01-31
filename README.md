# Media Uploader - Technical Assessment

Create a Media class that can upload images & videos to an S3-compatible storage service.

## Environment Setup

1. Node.js >= 20.15
2. pnpm 9.x
3. Vitest for testing
4. Docker Compose
5. [AWS S3 client](https://github.com/aws-lite/aws-lite)

## Project Structure

```
src/
├── media.ts       # Implementation
├── media.test.ts  # Test files
└── fixtures.json  # Test fixtures
└── compose.yaml   # Docker compose for S3-compatible storage service
```

## `media.ts`

Create a `Media` class that handles images & videos uploads to an S3-compatible storage service.

### Requirements

- Create a class that accepts S3 configuration in constructor
- Implement method to upload file from URL
- Implement streaming upload (we recommend using `undici`, but you can use alternatives if you prefer)
- Implement proper error handling and validation. Validate file size, content type, file type, and other validations for edge cases
- Use fixtures provided for testing
- Write tests using Vitest

### Example Usage

```ts
const mediaUploader = new Media({
  s3Endpoint: 'http://localhost:9000',
  s3Region: 'us-east-1',
  bucket: 'dummy-bucket',
  accessKeyId: 'dummy-user',
  secretAccessKey: 'dummy-password',
});

await media.uploadUrl({
  sourceUrl: 'https://example.com/image.jpg',
  destinationDir: 'images',
  maxFileSize: 10 * 1000 * 1000, // 10MB
});
```

### Local Development

Start S3-compatible storage:

```shell
$ docker compose up
```

## Evaluation Criteria

1. Code organization and clarity
2. Type safety and TypeScript usage
3. Error handling
4. Test coverage
5. Performance considerations
