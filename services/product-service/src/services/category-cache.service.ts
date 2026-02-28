import cacheRedis from '../config/cache-redis';

const CACHE_KEY = 'categories:all';

/**
 * Calcola i secondi mancanti alle prossime 03:30 AM.
 */
function calculateTTLToNext0330(): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(3, 30, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return Math.floor((next.getTime() - now.getTime()) / 1000);
}

/**
 * Legge le categorie dalla cache Redis.
 * Ritorna i dati deserializzati se presenti, null se cache miss o errore.
 */
export async function getCachedCategories(): Promise<unknown[] | null> {
  try {
    const data = await cacheRedis.get(CACHE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (err) {
    console.error('Cache read error (categories):', (err as Error).message);
    return null;
  }
}

/**
 * Salva le categorie in cache con TTL dinamico fino alle prossime 03:30 AM.
 * Fire-and-forget: non blocca il chiamante.
 */
export async function setCachedCategories(categories: unknown[]): Promise<void> {
  try {
    const ttl = calculateTTLToNext0330();
    await cacheRedis.set(CACHE_KEY, JSON.stringify(categories), 'EX', ttl);
  } catch (err) {
    console.error('Cache write error (categories):', (err as Error).message);
  }
}

/**
 * Invalida la cache delle categorie.
 * Predisposta per uso futuro (es. creazione/modifica categoria).
 */
export async function invalidateCategoriesCache(): Promise<void> {
  try {
    await cacheRedis.del(CACHE_KEY);
  } catch (err) {
    console.error('Cache invalidation error (categories):', (err as Error).message);
  }
}
