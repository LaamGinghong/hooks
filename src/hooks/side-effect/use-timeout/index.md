# useTimeout

一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

### 基础用法

```ts
import { useTimeout } from 'i-hooks'

useTimeout(() => {
  console.log('Hello world')
}, 3000)
```

## 基础 API
  
```ts
useTimeout(fn: () => void, delay: number | undefined | null)
```

### Params

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| `fn` | 要重复调用的函数 | `() => void` | - | - |
| `delay` | 间隔时间，当取值为 null 或 undefined 时会停止计时器 | `number | null | undefined` | - | - |

<!-- 所有单元格的两端都需要有一个空格 --> 
