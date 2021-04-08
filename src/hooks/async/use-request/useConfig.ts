import { inject, provide, shallowReactive, shallowReadonly } from 'vue'
import { MultipleRequestOptions, RequestOptions, RequestServiceConfig } from '@/hooks/async/use-request/types'

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

export function useConfig<Result, Params extends Record<string, any>>(
  options: Readonly<Partial<RequestOptions<Result, Params> | MultipleRequestOptions<Result, Params>>>,
) {
  const config = useGlobalProvider<Result, Params>()
  const result: Readonly<Partial<RequestOptions<Result, Params> | MultipleRequestOptions<Result, Params>>> = {
    ...config,
    ...options,
  }
  return result
}
