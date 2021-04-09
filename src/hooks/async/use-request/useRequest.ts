import type { Ref } from 'vue'
import { ref } from 'vue'
import { isString } from 'lodash-es'
import { useBoolean } from '@/hooks/state'
import type {
  MultipleRequestOptions,
  MultipleRequestResult,
  RequestOptions,
  RequestResult,
  RequestServiceConfig,
} from './types'
import { useConfig } from './useConfig'

function useRequest<Result, Params extends Record<string, any>>(
  service: string,
  options: Readonly<Partial<RequestOptions<Result, Params>>>,
): RequestResult<Result, Params>
function useRequest<Result, Params extends Record<string, any>>(
  service: string,
  options: Readonly<Partial<MultipleRequestOptions<Result, Params>>>,
): MultipleRequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<RequestOptions<Result, Params>>>,
): RequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<MultipleRequestOptions<Result, Params>>>,
): MultipleRequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: string | RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<RequestOptions<Result, Params> | MultipleRequestOptions<Result, Params>>>,
): RequestResult<Result, Params> | MultipleRequestResult<Result, Params> {
  const isMultiple = 'fetchKey' in options
  const data: Ref<Result | undefined> = ref()
  const error: Ref<Error | undefined> = ref()
  const [loading, { toggle: toggleLoading }] = useBoolean()
  const fetches: Ref<
    Map<
      ReturnType<MultipleRequestOptions<Result, Params>['fetchKey']>,
      Pick<RequestResult<Result, Params>, 'data' | 'error' | 'loading'>
    >
  > = ref(new Map()) // 批量请求集合

  const currentService: RequestServiceConfig<Params, Data> = isString(service)
    ? { url: service, method: 'GET' }
    : service

  const config = useConfig(options)
  let allowRetryTimes = config.retryTimes!
  let currentWaitTime = config.indexRetreat!
  let lastParams: Params | undefined

  let retryTimer: NodeJS.Timeout | undefined // 请求重试计时器

  const run = async (params?: Params): Promise<void> => {
    lastParams = params
    const {
      requestMethod,
      formatResult,
      formatParams,
      onSuccess,
      onError,
      throwOnError,
      retryTimes,
      indexRetreat,
      allowRequestRetry,
    } = config
    currentService.params = formatParams!(params)
    toggleLoading()

    try {
      const response = await requestMethod!<Params, Data>(currentService)
      const result = formatResult!(response)
      data.value = result
      onSuccess?.(result)
    } catch (error_) {
      error.value = error_
      console.error(error_)
      onError?.(error_)

      const alwaysAllowRetry = retryTimes === -1 // 表示永远开启请求重试
      if (allowRequestRetry && (alwaysAllowRetry || allowRetryTimes > 0)) {
        // eslint-disable-next-line no-plusplus
        const index = retryTimes! - allowRetryTimes--
        currentWaitTime = indexRetreat! ** index // 指数退避

        clearTimeout(retryTimer!)
        retryTimer = setTimeout(() => {
          run(lastParams)
        }, currentWaitTime)
      }

      if (throwOnError) throw error_
    } finally {
      toggleLoading()
    }
  }

  const cancel = (): void => {
    // todo 处理防抖节流
    console.log(data)
  }

  const refresh = (): Promise<void> => run(lastParams)

  if (!config.manual) {
    run(config.defaultParams)
  }

  if (isMultiple) {
    return { fetches, run, cancel, refresh }
  }

  return { data, error, loading, run, cancel, refresh }
}

export default useRequest
