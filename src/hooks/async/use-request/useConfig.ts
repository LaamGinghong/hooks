import type { Ref } from 'vue'
import { inject, provide, shallowReactive, shallowReadonly } from 'vue'
import { isString } from 'lodash-es'
import type { RequestOptions, MultipleRequestOptions, RequestServiceConfig } from './types'

export interface RequestGlobalConfig<Result, Params> {
  manual: boolean

  requestMethod<_Params, _Data>(service: RequestServiceConfig<_Params, _Data>): Promise<any>

  formatParams(params?: Params): any
  formatResult(response: any): Result

  loadingDelay: number
  pollingWhenHidden: boolean
  throwOnError: boolean
  cacheTime: number
  allowRequestRetry: boolean
  retryTimes: number
  indexRetreat: number
}

const requestGlobalConfig = shallowReadonly(
  shallowReactive<RequestGlobalConfig<any, any>>({
    manual: false,
    requestMethod: (service: RequestServiceConfig<any, any>) => fetch(service.url, service),
    formatParams: (params) => JSON.stringify(params),
    formatResult: (response) => response,
    loadingDelay: 0,
    pollingWhenHidden: false,
    throwOnError: false,
    cacheTime: 300000,
    allowRequestRetry: true,
    retryTimes: 5,
    indexRetreat: 5000,
  }),
)

const RequestProviderKey = Symbol('useRequest')

export function useGlobalProvider<Result, Params>(
  config?: RequestGlobalConfig<Result, Params>,
): RequestGlobalConfig<Result, Params> {
  const parentConfig = inject<RequestGlobalConfig<any, any>>(RequestProviderKey, requestGlobalConfig)
  if (!config) return parentConfig

  const currentConfig = shallowReactive<RequestGlobalConfig<Result, Params>>({ ...parentConfig, ...config })
  provide<RequestGlobalConfig<Result, Params>>(RequestProviderKey, currentConfig)

  return currentConfig
}

export interface Options<Result, Params extends Record<string, any>> {
  manual: boolean
  ready?: boolean
  refreshDeps?: Ref<Ref<any[]>>
  requestMethod<_Params, _Data>(service: RequestServiceConfig<_Params, _Data>): Promise<any>
  formatParams(params?: Params): any
  formatResult(response: any): Result
  onSuccess?(data: Result): void
  onError?(error: Error): void
  defaultParams?: Params
  loadingDelay: number
  pollingInterval?: number
  pollingWhenHidden: boolean
  debounceInterval?: number
  throttleInterval?: number
  throwOnError: boolean
  cacheKey?: number | string | symbol
  cacheTime: number
  allowRequestRetry: boolean
  retryTimes: number
  indexRetreat: number
  fetchKey?: (...arguments_: any[]) => string | number | symbol
}

export function useOptions<Result, Params extends Record<string, any>>(
  options: Readonly<Partial<RequestOptions<Result, Params> | MultipleRequestOptions<Result, Params>>>,
): Options<Result, Params> {
  const config = useGlobalProvider<Result, Params>()
  const result = {
    ...config,
    ...options,
  }
  return result
}

export function useService<Params, Data>(
  service: string | RequestServiceConfig<Params, Data>,
): RequestServiceConfig<Params, Data> {
  return isString(service) ? ({ url: service, method: 'GET' } as RequestServiceConfig<Params, Data>) : service
}
