import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryCacheServiceService {
  cacheFollows: Map<string, any[]> = new Map<string, any[]>();

  constructor() { }

  addToCacheFollows(key: string, value: any[]) {
    this.cacheFollows.set(key, value);
  }

  getFromCacheFollows(key: string): any[] | undefined {
    return this.cacheFollows.get(key);
  }
}
