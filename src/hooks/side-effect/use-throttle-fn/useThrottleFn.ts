import { throttle } from 'lodash-es'
import type { UseThrottleOptions, Fn, UseThrottleFnResult } from './types'

const DEFAULT_OPTIONS: Required<UseThrottleOptions> = {
  wait: 1000,
  leading: false,
  trailing: true,
}

export default function useThrottleFn<T extends Fn>(
  fn: T,
  options: UseThrottleOptions = DEFAULT_OPTIONS,
): UseThrottleFnResult<T> {
  const currentOptions = { ...options, ...DEFAULT_OPTIONS }
  const throttled = throttle(fn, currentOptions.wait, currentOptions)

  return {
    run: (throttled as unknown) as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  }
}
