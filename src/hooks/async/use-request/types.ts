import type { Ref } from 'vue'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | string

export interface RequestServiceConfig<Params extends Record<string, any> = Record<string, any>, Data = Params> {
  /**
   * 请求子路由
   */
  url: string
  /**
   * 请求方法
   * 全局默认为 GET
   */
  method?: RequestMethod
  /**
   * 请求服务器地址
   */
  baseURL?: string
  /**
   * 请求头
   */
  header?: Record<string, string>
  /**
   * URL上的请求参数
   */
  params?: Params
  /**
   * Body里面的请求参数
   */
  data?: Data
  /**
   * 请求超时
   */
  timeout?: number
  /**
   * 请求是否带缓存
   */
  withCredentials?: boolean
  /**
   * 请求响应格式
   * 全局默认为 json
   */
  responseType?: XMLHttpRequestResponseType
  /**
   * 请求响应字符格式
   * 全局默认 utf8
   */
  responseEncoding?: string

  [key: string]: any
}

export interface RequestResult<Params extends any[], Result extends any = Record<string, any>> {
  /**
   * 请求返回的数据
   * 默认是 undefined
   * 所有数据均会经过 formatResult 处理
   */
  data: Result | undefined
  /**
   * 请求抛出的异常
   * 默认是 undefined
   */
  error: Error | undefined
  /**
   * 当前请求的状态
   */
  loading: boolean
  /**
   * 手动执行请求
   * 如果本次请求为轮询，则会重新开始轮询
   * 参数会传给 RequestParams 中的 RequestFn
   * @param arguments_
   */
  run: (...arguments_: Params) => Promise<void>
  /**
   * 取消本次请求
   * 如果当前请求为轮询，则暂停当前轮询
   */
  cancel: () => void
  /**
   * 以最新的请求参数重新执行请求
   * 如果请求为轮询，则会重新开始轮询
   */
  refresh: () => Promise<void>
}

export interface MultipleRequestResult<Params extends any[], Result extends any = Record<string, any>> {
  /**
   * 多次请求的状态键值对
   * key 为请求唯一 id
   * value 为当前请求返回状态
   */
  fetches: Record<string, RequestResult<Params, Result>>
}

export interface RequestParams<
  Params extends any[],
  Request extends any = Record<string, any>,
  Response extends any = Record<string, any>
> {
  /**
   * 手动模式
   * 如果开启，则请求需要手动调用 RequestResult 的 run 函数才会执行
   */
  manual: boolean
  /**
   * 依赖收集
   * 当数组中的数据发生变化时自动重新发送请求
   */
  refreshDeps: Ref<Ref<any>[]>
  /**
   * 格式化请求响应
   * @param response
   */
  formatResult: (response: Response) => Request

  /**
   * 请求成功回调
   * 参数为经过 formatResult 处理过的请求响应
   */
  onSuccess(data: Request): void

  /**
   * 失败回调
   * @param error
   */
  onError(error: Error): void

  /**
   * 自动请求时的默认参数
   */
  defaultParams: Params
  /**
   * 请求状态延时变化
   * 防止闪烁
   */
  loadingDelay: boolean
  /**
   * 页面不可见时是否继续轮询
   * 全局配置默认为不轮询
   */
  pollingWhenHidden: boolean
  /**
   * 防抖间隔
   */
  debounceInterval: number
  /**
   * 节流间隔
   */
  throttleInterval: number
  /**
   * 是否抛出请求异常
   * 默认情况下，为了避免因为请求异常阻塞 js 线程的执行，会在内部捕获异常并打印到控制台上
   */
  throwOnError: boolean
  /**
   * 缓存标识，全局通用
   * 在设置了 cacheKey 的情况下，我们会在请求前判断是否有缓存，请求后更新缓存
   */
  cacheKey: string
  /**
   * 缓存过期时间
   * 在时间内，函数在发送请求前都会先返回缓存数据
   * 如果设置为 -1 则表示缓存永不过期
   * 需要配合 cacheKey 一起使用
   */
  cacheTime: number
  /**
   * 是否开启请求重试
   * 默认情况下，在请求失败时会直接终止函数
   * 如开启请求重试，会在允许次数内重新发送请求
   */
  allowRequestRetry: boolean
  /**
   * 允许请求重试次数
   */
  retryTimes: number
  /**
   * 指数退避
   * 在请求重试的情况下，重新请求的间隔时间会以指数递增
   */
  indexRetreat: number
}

export interface MultipleRequestParams<
  Params extends any[],
  Request extends any = Record<string, any>,
  Response extends any = Record<string, any>
> extends RequestParams<Params, Request, Response> {
  /**
   * 唯一请求 ID
   * 用于匹配多个请求结果
   */
  fetchKey: string
}
