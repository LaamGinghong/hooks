import type { RequestOptions } from './types'

type CacheKey = RequestOptions<any, any>['cacheKey']

export interface CacheOptions {
  cacheKey: CacheKey
  cacheTime: number
  data: any
}

const GlobalCacheMap = new Map<CacheKey, CacheOptions>()

function useCache(key: CacheKey, options?: CacheOptions): CacheOptions | undefined {
  if (!options) {
    return GlobalCacheMap.get(key)
  }
  GlobalCacheMap.set(key, options)
  return options
}

export default useCache
