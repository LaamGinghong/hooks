import type { UnwrapRef } from 'vue'
import { onMounted, ref } from 'vue'
import useDebounceFn from 'hooks/side-effect/use-debounce-fn'

import type { UseDebounceFnOptions } from '../use-debounce-fn'

export default function useDebounce<T>(value: T, options?: UseDebounceFnOptions): T {
  const state = ref(value)

  const { run } = useDebounceFn(() => {
    state.value = value as UnwrapRef<T>
  }, options)

  onMounted(run)

  return (state as unknown) as T
}
