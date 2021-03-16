import type { Ref } from 'vue'
import { isRef } from 'vue'

export type TargetElement = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetElement = HTMLElement> = (() => T | null) | T | null | Ref<T>

export function getTarget(target: BasicTarget<TargetElement>): TargetElement | null {
  if (typeof target === 'function') {
    return target()
  }
  if (isRef(target)) {
    return target.value
  }
  return target
}
