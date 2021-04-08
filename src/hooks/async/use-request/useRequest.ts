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
  const loading = ref(false)
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

  const run = (params?: Params): Promise<void> => {
    const { requestMethod, formatResult, formatParams, onSuccess, onError, throwOnError } = config
    currentService.params = formatParams!(params)

    return requestMethod!<Params, Data>(currentService)
      .then((response) => {
        const result = formatResult!(response)
        data.value = result
        onSuccess?.(result)
      })
      .catch((error_) => {
        error.value = error_
        onError?.(error_)

        if (throwOnError) throw error_
      })
  }

  const cancel = (): void => {
    console.log(data)
  }

  const refresh = (): Promise<void> => {
    console.log(data)
    return Promise.resolve()
  }

  if (!config.manual) {
    run(config.defaultParams)
  }

  if (isMultiple) {
    return { fetches, run, cancel, refresh }
  }

  return { data, error, loading, run, cancel, refresh }
}

export default useRequest
