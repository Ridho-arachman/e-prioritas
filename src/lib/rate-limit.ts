import { LRUCache } from "lru-cache";
import prisma from "./prisma"; // Pastikan ekspor default atau named

const rateLimitCache = new LRUCache<
  string,
  { count: number; resetTime: number }
>({
  max: 5000,
  ttl: 60 * 1000,
  updateAgeOnGet: true,
  allowStale: false,
});

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfter?: number;
}

export async function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const now = Date.now();
  const nowBigInt = BigInt(now);

  // Cek cache dulu
  const cached = rateLimitCache.get(key);
  if (cached) {
    if (now < cached.resetTime) {
      if (cached.count >= max) {
        const retryAfter = Math.ceil((cached.resetTime - now) / 1000);
        return { success: false, remaining: 0, retryAfter };
      }
      cached.count++;
      rateLimitCache.set(key, cached);
      // Update database async
      updateDatabase(key, cached.count, nowBigInt).catch(console.error);
      return { success: true, remaining: max - cached.count };
    }
    // Reset window, lanjut ke DB
  }

  // Cek database dengan transaction (tanpa tipe eksplisit)
  const result = await prisma.$transaction(async (tx) => {
    // Coba dengan nama model yang benar. Karena schema punya @@map("rateLimit"),
    // seharusnya aksesnya tx.rateLimit. Tapi jika tidak, coba tx.RateLimit.
    const record = await (tx.rateLimit || tx.rateLimit)?.findUnique({
      where: { key },
    });

    if (!record) {
      await (tx.rateLimit || tx.rateLimit).create({
        data: {
          id: crypto.randomUUID(),
          key,
          count: 1,
          lastRequest: nowBigInt,
        },
      });
      rateLimitCache.set(key, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: max - 1 };
    }

    const lastRequestNum = Number(record.lastRequest);
    const recordResetTime = lastRequestNum + windowMs;

    if (now > recordResetTime) {
      await (tx.rateLimit || tx.rateLimit).update({
        where: { key },
        data: { count: 1, lastRequest: nowBigInt },
      });
      rateLimitCache.set(key, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: max - 1 };
    }

    if (record.count >= max) {
      rateLimitCache.set(key, {
        count: record.count,
        resetTime: recordResetTime,
      });
      const retryAfter = Math.ceil((recordResetTime - now) / 1000);
      return { success: false, remaining: 0, retryAfter };
    }

    const newCount = record.count + 1;
    await (tx.rateLimit || tx.rateLimit).update({
      where: { key },
      data: { count: newCount },
    });
    rateLimitCache.set(key, { count: newCount, resetTime: recordResetTime });
    return { success: true, remaining: max - newCount };
  });

  return result;
}

async function updateDatabase(key: string, count: number, lastRequest: bigint) {
  await prisma.rateLimit.upsert({
    where: { key },
    update: { count, lastRequest },
    create: {
      id: crypto.randomUUID(),
      key,
      count,
      lastRequest,
    },
  });
}
