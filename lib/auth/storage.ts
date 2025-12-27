import type { SecondaryStorage } from "better-auth/db";
import { redis } from "@/lib/redis";

export const secondaryStorage: SecondaryStorage = {
  async set(key, value, ttl) {
    if (!ttl) {
      await redis.set(key, value);
    } else {
      await redis.setex(key, ttl, value);
    }
  },
  async get(key) {
    const value = await redis.get(key);
    return value;
  },
  async delete(key) {
    await redis.del(key);
  },
};
