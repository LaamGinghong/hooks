import { watchEffect } from 'vue'
import { isNil } from 'lodash-es'

export default function useTimeout(fn: () => void, delay: number | null | undefined): void {
  if (isNil(delay)) return

  watchEffect((onInvalidate) => {
    const timeout = setTimeout(fn, delay)

    onInvalidate(() => {
      clearTimeout(timeout)
    })
  })
}
