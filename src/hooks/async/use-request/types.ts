import type { Ref } from 'vue'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | string

export interface RequestServiceConfig<Params extends Record<string, any>, Data extends Record<string, any>> {
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

export interface RequestOptions<Result, Params extends Record<string, any>> {
  /**
   * 是否开启手动模式
   * 如果开启，则需要手动触发 RequestResult 的 run 函数才会执行请求
   */
  manual: boolean
  /**
   * 依赖收集
   * 当被收集的依赖发生改变时，会自动触发请求执行
   */
  refreshDeps: Ref<Ref<any[]>>

  /**
   * 自定义请求函数
   * @param service
   */
  requestMethod<_Params, _Data>(service: RequestServiceConfig<_Params, _Data>): Promise<any>

  /**
   * 格式化请求参数
   * @param params
   */
  formatParams(params?: Params): any

  /**
   * 格式化请求响应
   * @param response
   */
  formatResult(response: any): Result

  /**
   * 请求成功回调
   * 函数参数为格式化后的请求响应
   * @param data
   */
  onSuccess(data: Result): void

  /**
   * 请求异常回调
   * 函数参数为请求异常
   * @param error
   */
  onError(error: Error): void

  /**
   * 请求默认参数
   * 当函数处于自动模式时，需要设置该字段
   */
  defaultParams: Params
  /**
   * 请求状态延时变化
   * 防止闪烁
   * 设置为 0 表示不开启
   * 如设置为一个负数会抛出异常并且关闭延时
   */
  loadingDelay: number
  /**
   * 页面不可见时是否继续轮询
   */
  pollingWhenHidden: boolean
  /**
   * 防抖间隔
   * 优先级高于节流
   */
  debounceInterval: number
  /**
   * 节流间隔
   * 优先级低于防抖
   */
  throttleInterval: number
  /**
   * 默认情况下，为避免因请求异常导致阻塞 js 线程引发的页面崩溃
   * 函数会在遇到请求异常时捕获异常并打印在控制台上
   * 如果需要手动处理异常，则设置为 true
   */
  throwOnError: boolean
  /**
   * 全局缓存标识
   * 如果设置了 cacheKey，函数会在每次请求后都更新缓存
   */
  cacheKey: number | string | symbol
  /**
   * 缓存有效时间
   * 在有效时间内，函数在执行请求时会立马返回缓存，并在后台同步执行请求，待成功获取到请求响应后再返回请求结果
   * 如果设置为 -1 则表示缓存永不过期
   * 需配合 cacheKey 一起使用
   */
  cacheTime: number
  /**
   * 允许请求重试
   * 默认情况下函数会在请求异常时终止行为
   */
  allowRequestRetry: boolean
  /**
   * 允许请求重试次数
   * 在允许次数内，函数会重新发起请求，直到超出允许次数范围
   */
  retryTimes: number
  /**
   * 指数退避
   * 请求重试的间隔会以指数形式递增
   */
  indexRetreat: number
}

export interface MultipleRequestOptions<Result, Params extends Record<string, any>>
  extends RequestOptions<Result, Params> {
  /**
   * 请求唯一 id
   * 用于匹配多个重复的请求结果
   */
  fetchKey: (...arguments_: any[]) => string | number | symbol
}

export interface RequestResult<Result, Params extends Record<string, any>> {
  /**
   * 请求响应
   * 会经过 formatResult 处理
   */
  data: Ref<Result | undefined>
  /**
   * 请求异常
   * 需设置 throwOnError = true 才会被捕获
   */
  error: Ref<Error | undefined>
  /**
   * 当前请求状态
   */
  loading: Ref<boolean>

  /**
   * 手动执行请求
   * 请求参数会传给 service
   * 返回一个无状态的 Promise
   */
  run(data: Params): Promise<void>

  /**
   * 取消当前请求
   * 如果本次请求为轮询状态，则会取消轮询
   */
  cancel(): void

  /**
   * 重新执行请求
   * 如果本次请求为轮询状态，则会重新开始轮询
   */
  refresh(): Promise<void>
}

export interface MultipleRequestResult<Result, Params extends Record<string, any>> {
  /**
   * 一个 Map
   * 保存着 fetchKey 和对应请求状态的键值对
   */
  fetches: Ref<
    Map<
      ReturnType<MultipleRequestOptions<Result, Params>['fetchKey']>,
      Pick<RequestResult<Result, Params>, 'data' | 'error' | 'loading'>
    >
  >

  /**
   * 手动执行请求
   * 请求参数会传给 service
   * 返回一个无状态的 Promise
   */
  run(data: Params): Promise<void>

  /**
   * 取消当前请求
   * 如果本次请求为轮询状态，则会取消轮询
   */
  cancel(): void

  /**
   * 重新执行请求
   * 如果本次请求为轮询状态，则会重新开始轮询
   */
  refresh(): Promise<void>
}
