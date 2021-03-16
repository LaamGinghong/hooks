import { watchEffect } from 'vue'
import { getTarget } from '@/utils'

import type { UseEventListenerOptions } from './types'

function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options: UseEventListenerOptions<HTMLElement>,
): void
function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (event: ElementEventMap[K]) => void,
  options: UseEventListenerOptions<Element>,
): void
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options: UseEventListenerOptions<Document>,
): void
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options: UseEventListenerOptions<Window>,
): void
function useEventListener(eventName: string, handler: (event: Event) => void, options: UseEventListenerOptions): void
function useEventListener(eventName: string, handler: (event: Event) => void, options: any = {}): void {
  const targetElement = getTarget(options.target)
  if (!targetElement) return
  if (!targetElement.addEventListener) return

  watchEffect((onInvalidate) => {
    targetElement.addEventListener(eventName, handler, {
      once: options.once,
      capture: options.capture,
      passive: options.passive,
    })
    onInvalidate(() => {
      targetElement.removeEventListener(eventName, handler, {
        capture: options.capture,
      })
    })
  })
}

export default useEventListener
