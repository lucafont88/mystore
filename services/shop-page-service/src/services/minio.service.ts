import { minioClient, BUCKET } from '../config/minio';

class MinioService {
  /** Upload HTML content to MinIO */
  async uploadHtml(key: string, htmlContent: string): Promise<void> {
    const buffer = Buffer.from(htmlContent, 'utf-8');
    await minioClient.putObject(BUCKET, key, buffer, buffer.length, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  /** Download HTML content from MinIO */
  async getHtml(key: string): Promise<string> {
    const stream = await minioClient.getObject(BUCKET, key);
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      stream.on('error', reject);
    });
  }

  /** Delete HTML content from MinIO */
  async deleteHtml(key: string): Promise<void> {
    await minioClient.removeObject(BUCKET, key);
  }

  /** Generate a presigned URL for public access */
  async getPresignedUrl(key: string, expirySeconds: number = 3600): Promise<string> {
    return minioClient.presignedGetObject(BUCKET, key, expirySeconds);
  }
}

export default new MinioService();
