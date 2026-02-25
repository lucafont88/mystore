import { minioClient, BUCKET } from '../config/minio';

class MinioService {
  /** Upload a digital product file to MinIO */
  async uploadFile(key: string, buffer: Buffer, mimeType: string): Promise<void> {
    await minioClient.putObject(BUCKET, key, buffer, buffer.length, {
      'Content-Type': mimeType,
    });
  }

  /** Generate a presigned download URL (default expiry: 5 minutes) */
  async getPresignedDownloadUrl(key: string, expirySeconds: number = 300): Promise<string> {
    return minioClient.presignedGetObject(BUCKET, key, expirySeconds);
  }

  /** Delete a file from MinIO */
  async deleteFile(key: string): Promise<void> {
    await minioClient.removeObject(BUCKET, key);
  }
}

export default new MinioService();
