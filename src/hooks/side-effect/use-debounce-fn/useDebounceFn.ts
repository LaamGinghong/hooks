import { debounce } from 'lodash-es'
import type { Fn, UseDebounceFnOptions, UseDebounceFnResult } from './types'

const DEFAULT_OPTIONS: Required<UseDebounceFnOptions> = {
  wait: 1000,
  leading: false,
  trailing: true,
}

export default function useDebounceFn<T extends Fn>(
  fn: T,
  options: UseDebounceFnOptions = DEFAULT_OPTIONS,
): UseDebounceFnResult<T> {
  const currentOptions = { ...DEFAULT_OPTIONS, ...options }

  const debounced = debounce(fn, currentOptions.wait, currentOptions)

  return {
    run: (debounced as unknown) as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}
