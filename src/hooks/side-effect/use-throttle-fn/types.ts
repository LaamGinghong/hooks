export type Fn = (...arguments_: any[]) => any

export interface UseThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

export interface UseThrottleFnResult<T> {
  run: T
  cancel: () => void
  flush: () => void
}
