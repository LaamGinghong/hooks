import { ref } from 'vue'

import type { UseBooleanResult } from './types'

export default function useBoolean(defaultValue?: boolean): UseBooleanResult {
  const current = ref(!!defaultValue)

  const toggle = (value = !current.value) => {
    current.value = value
  }

  const setTrue = () => {
    toggle(true)
  }

  const setFalse = () => {
    toggle(false)
  }

  return [current, { setFalse, setTrue, toggle }]
}
