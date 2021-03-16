# useEventListener

优雅使用 addEventListener 的 Hook。

## 代码演示

### 基础用法

```ts
import { useEventListener } from 'i-hooks'

let times = 0

const clickHandler = () => {
  console.log(`You click ${times++} times.`)
}

useEventListener('click', clickHandler, { target: document.body })
```

## 基础 API
  
```ts
useEventListener(
  eventName: string,
  handler: Function,
  options?: Options,
)
```

### Params

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| `eventName` | 事件名称 | `string` | - | - |  
| `handler` | 处理函数 | `(e: Event) => void` | - | - |  
| `options` | 设置 | `UseEventListenerOptions` | - | - |  

### Options

| 参数 | 说明 | 类型 | 默认值 | 
| --- | ---- | --- | ---- |
| `target` | 监听的 DOM 节点 | `HTMLElement | (() => HTMLElement) | Window | Document` | `window` |
| `capture` | 可选项，listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发 | `boolean` | `false` |
| `once` | 可选项，listener 在添加之后最多只调用一次。如果是 true，listener 会在其被调用之后自动移除 | `boolean` | `false` |
| `passive` | 可选项，设置为 true 时，表示 listener 永远不会调用 preventDefault() 。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告 | `boolean` | `false` |


<!-- 所有单元格的两端都需要有一个空格 --> 
