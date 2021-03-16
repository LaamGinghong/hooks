import { isNil } from 'lodash-es'
import { watchEffect } from 'vue'
import type { UseIntervalOptions } from './types'

const DEFAULT_OPTIONS: Required<UseIntervalOptions> = { immediate: false }

export default function useInterval(
  fn: () => void,
  interval: number | null | undefined,
  options: UseIntervalOptions = DEFAULT_OPTIONS,
): void {
  const { immediate } = options

  if (isNil(interval)) return

  watchEffect((onInvalidate) => {
    if (immediate) {
      fn()
    }
    const timer = setInterval(fn, interval)

    onInvalidate(() => {
      clearInterval(timer)
    })
  })
}
