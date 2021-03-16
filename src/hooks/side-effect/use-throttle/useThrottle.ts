import type { UnwrapRef } from 'vue'
import { onMounted, ref } from 'vue'
import type { UseThrottleOptions } from '../use-throttle-fn'
import useThrottleFn from '../use-throttle-fn'

export default function useThrottle<T>(value: T, options?: UseThrottleOptions): T {
  const state = ref(value)

  const { run } = useThrottleFn(() => {
    state.value = value as UnwrapRef<T>
  }, options)

  onMounted(run)

  return (state as unknown) as T
}
