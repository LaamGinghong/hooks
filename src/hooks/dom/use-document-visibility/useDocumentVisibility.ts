import type { Ref } from 'vue'
import { ref } from 'vue'
import useEventListener from 'hooks/dom/use-event-listener'

import type { UseDocumentVisibilityResult } from './types'

export default function useDocumentVisibility(): Ref<UseDocumentVisibilityResult> {
  const visibility = ref<UseDocumentVisibilityResult>()

  useEventListener(
    'visibilitychange',
    () => {
      visibility.value = document.visibilityState
    },
    { target: document },
  )

  return visibility
}
