export type UseToggleState = number | string | boolean

export interface UseToggleActions<S = UseToggleState> {
  toggle: (value?: S) => void
  setLeft: () => void
  setRight: () => void
}
