export type Fn = (...arguments_: any[]) => any

export interface UseDebounceFnOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

export interface UseDebounceFnResult<T> {
  run: T
  cancel: () => void
  flush: () => void
}
