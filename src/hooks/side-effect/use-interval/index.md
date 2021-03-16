# useInterval

一个可以处理 setInterval 的 Hook。

## 代码演示

### 基础用法

```ts
import { useInterval } from 'i-hooks'

useInterval(() => {
  console.log('Hello world')
}, 1000)
```

## 基础 API
  
```ts
useInterval(fn: () => void, interval: number, options?: Options)
```

### Params

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| `fn` | 要重复调用的函数 | `() => void` | - | - |
| `interval` | 间隔时间，当取值为 null 或 undefined 时会停止计时器 | `number | null | undefined` | - | - |
| `options` | 配置防抖的行为 | `UseIntervalOptions` | - | - |

### Options

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| `immediate` | 是否立即执行函数 | `boolean` |

<!-- 所有单元格的两端都需要有一个空格 --> 
