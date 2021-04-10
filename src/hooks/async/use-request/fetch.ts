import type { Ref } from 'vue'
import type { UseDebounceFnResult } from 'hooks/side-effect/use-debounce-fn'
import type { UseThrottleFnResult } from 'hooks/side-effect/use-throttle-fn'
import { ref } from 'vue'
import { useBoolean } from 'hooks/state'
import { useDebounceFn, useThrottleFn } from 'hooks/side-effect'
import { cloneDeep } from 'lodash-es'
import type { RequestServiceConfig } from './types'
import type { Options } from './useConfig'

export default class Fetch<Result, Params extends Record<string, any>, Data = Params> {
  private readonly service: RequestServiceConfig<Params, Data>

  private readonly options: Options<Result, Params>

  public readonly data: Ref<Result | undefined> = ref()

  public readonly error: Ref<Error | undefined> = ref()

  public readonly loading: Ref<boolean>

  private readonly toggleLoading: (status?: boolean) => void

  private readonly debounceRun: UseDebounceFnResult<(data?: Params) => void> | undefined

  private readonly throttleRun: UseThrottleFnResult<(data?: Params) => void> | undefined

  private lastParams: Params | undefined // 上一次请求的参数

  private currentRetryTimes: number // 当前已经错误的次数

  private retryTimer: NodeJS.Timeout | undefined

  constructor(service: RequestServiceConfig<Params, Data>, options: Options<Result, Params>) {
    this.service = service
    this.options = options
    const [loading, { toggle }] = useBoolean()
    this.loading = loading
    this.toggleLoading = toggle
    this.currentRetryTimes = options.retryTimes

    if (options.debounceInterval) {
      this.debounceRun = useDebounceFn(this._run)
    } else if (options.throttleInterval) {
      this.throttleRun = useThrottleFn(this._run)
    }

    if (options.pollingWhenHidden) {
      // todo useDocumentVisibility
    }

    if (!options.manual) {
      this.run(options.defaultParams)
    }
  }

  private _run = async (data?: Params): Promise<void> => {
    this.lastParams = data
    const {
      cacheKey,
      cacheTime,
      requestMethod,
      formatResult,
      formatParams,
      onSuccess,
      onError,
      throwOnError,
      retryTimes,
      allowRequestRetry,
      indexRetreat,
    } = this.options
    const service = cloneDeep(this.service)
    service.data = formatParams(data)

    this.toggleLoading(true)
    try {
      const result = formatResult(await requestMethod<Params, Data>(service))
      this.data.value = result
      onSuccess?.(result)
    } catch (error) {
      this.error.value = error
      onError?.(error)

      const alwaysAllowRetry = retryTimes === -1
      if (allowRequestRetry && (alwaysAllowRetry || this.currentRetryTimes > 0)) {
        // 开启请求重试
        const index = indexRetreat ** (retryTimes - this.currentRetryTimes--)
        if (this.retryTimer) {
          clearTimeout(this.retryTimer)
        }
        this.retryTimer = setTimeout(this.refresh, index)
      }

      /* 判断是否需要对外抛出异常 */
      if (throwOnError) throw error
      else console.error(error)
    } finally {
      this.toggleLoading(false)
    }
  }

  public run = (data?: Params): Promise<void> => {
    if (this.options.debounceInterval) {
      this.debounceRun?.run(data)
      return Promise.resolve()
    }
    if (this.options.throttleInterval) {
      this.throttleRun?.run(data)
      return Promise.resolve()
    }
    return this._run(data)
  }

  public cancel = (): void => {
    if (this.debounceRun) {
      this.debounceRun.cancel()
    }
    if (this.throttleRun) {
      this.throttleRun.cancel()
    }
    if (this.retryTimer) {
      clearTimeout(this.retryTimer)
    }
    // todo loading延迟 轮询
  }

  public refresh = (): Promise<void> => this.run(this.lastParams)
}
