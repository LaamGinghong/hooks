import type { Ref } from 'vue'

export interface UseBooleanActions {
  toggle: (value?: boolean) => void
  setTrue: () => void
  setFalse: () => void
}

export type UseBooleanResult = [Ref<boolean>, UseBooleanActions]
