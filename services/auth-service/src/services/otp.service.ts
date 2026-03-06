import crypto from 'crypto';
import redis from '../config/redis';

const OTP_TTL = 600; // 10 minuti
const redisKey = (email: string) => `otp:register:${email}`;

export interface OtpPayload {
  otp: string;
  passwordHash: string;
  role: string;
}

export function generateOtp(): string {
  return String(crypto.randomInt(100000, 999999));
}

export async function storeOtp(email: string, otp: string, passwordHash: string, role: string): Promise<void> {
  const payload: OtpPayload = { otp, passwordHash, role };
  await redis.set(redisKey(email), JSON.stringify(payload), 'EX', OTP_TTL);
}

/**
 * Verifica l'OTP. Se corretto lo elimina (one-time use) e restituisce il payload.
 * Ritorna null se scaduto o errato.
 */
export async function verifyAndConsumeOtp(email: string, otp: string): Promise<Omit<OtpPayload, 'otp'> | null> {
  const raw = await redis.get(redisKey(email));
  if (!raw) return null;

  const data = JSON.parse(raw) as OtpPayload;
  if (data.otp !== otp) return null;

  await redis.del(redisKey(email));
  return { passwordHash: data.passwordHash, role: data.role };
}
