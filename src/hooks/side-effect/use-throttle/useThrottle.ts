import type { UnwrapRef } from 'vue'
import type { UseThrottleOptions } from 'hooks/side-effect/use-throttle-fn'
import { onMounted, ref } from 'vue'
import useThrottleFn from 'hooks/side-effect/use-throttle-fn'

export default function useThrottle<T>(value: T, options?: UseThrottleOptions): T {
  const state = ref(value)

  const { run } = useThrottleFn(() => {
    state.value = value as UnwrapRef<T>
  }, options)

  onMounted(run)

  return (state as unknown) as T
}
