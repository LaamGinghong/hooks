import type { Ref } from 'vue'
import { ref } from 'vue'
import { isUndefined } from 'lodash-es'

import type { UseToggleState, UseToggleActions } from './types'

function useToggle(): [Ref<boolean>, UseToggleActions<boolean>]
function useToggle<T = UseToggleState>(defaultValue: T): [Ref<T>, UseToggleActions<T>]
function useToggle<T = UseToggleState, R = UseToggleState>(
  defaultValue: T,
  reverseValue: R,
): [Ref<T | R>, UseToggleActions<T | R>]
function useToggle(defaultValue: any = false, reverseValue?: any): [Ref<any>, UseToggleActions<any>] {
  const current = ref(defaultValue)

  const toggle = (value?: any) => {
    if (!isUndefined(value)) {
      current.value = value
      return
    }
    current.value = current.value === defaultValue ? reverseValue : defaultValue
  }

  const setLeft = () => {
    current.value = defaultValue
  }

  const setRight = () => {
    current.value = reverseValue
  }

  return [current, { toggle, setLeft, setRight }]
}

export default useToggle
