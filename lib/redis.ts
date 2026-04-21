import { Redis } from "@upstash/redis";

const getRedisClient = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("Upstash Redis credentials not found. Caching disabled.");
    return null;
  }

  return new Redis({ url, token });
};

// Singleton — created once per cold start
let redis: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (redis === undefined) {
    redis = getRedisClient();
  }
  return redis;
}

export default getRedis;
