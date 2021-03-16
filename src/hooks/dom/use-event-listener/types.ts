import type { Ref } from 'vue'

export interface UseEventListenerOptions<
  T extends Element | HTMLElement | Window | Document | Ref<HTMLElement> = Window
> {
  /**
   * 事件监听的对象
   * 默认是 window
   */
  target: (() => T | null) | T | null
  /**
   * 是否在传递阶段执行
   */
  capture?: boolean
  /**
   * 是否只执行一次
   * 如只执行一次，则会在执行之后取消监听
   */
  once?: boolean
  /**
   * 表示 listener 永远不会调用 preventDefault() 。
   * 如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
   */
  passive?: boolean
}
