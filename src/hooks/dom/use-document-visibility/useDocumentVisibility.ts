import { ref } from 'vue'
import type { UseDocumentVisibilityResult } from './types'
import useEventListener from '../use-event-listener'

export default function useDocumentVisibility(): UseDocumentVisibilityResult {
  const visibility = ref<UseDocumentVisibilityResult>()

  useEventListener(
    'visibilitychange',
    () => {
      visibility.value = document.visibilityState
    },
    { target: document },
  )

  return visibility.value
}
