import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  cacheSet(key: string, value: unknown, ttl?: number) {
    return this.cacheManager.set(key, value, ttl); // ttl(Time To Live)的单位是ms
  }
  cacheGet(key: string) {
    return this.cacheManager.get(key);
  }
}
