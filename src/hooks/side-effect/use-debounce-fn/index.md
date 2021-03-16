# useDebounceFn

用来处理防抖函数的 Hook。

## 代码演示

### 基础用法

```ts
import { useDebounceFn } from 'i-hooks'

let times = 0

const { run } = useDebounceFn(
  () => {
    console.log(times++)
  },
  {
    wait: 500,
  },
);

```

## 基础 API
  
```ts
const {
  run,
  cancel
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
)
```

### Params

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| `fn` | 需要防抖执行的函数 | `(...args: any[]) => any` | - | - |  
| `options` | 配置防抖的行为 | `UseDebounceFnOptions` | - | - |  

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ---- |
| `wait` | 超时时间，单位为毫秒 | `number` | 1000 |
| `leading` | 指定在延迟开始前调用 | `boolean` | `false` |
| `trailing` | 指定在延迟结束后调用 | `boolean` | `true` |



### Result

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| `run` | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| `cancel` | 取消当前防抖 | `() => void` |
| `flush` | 当前防抖立即调用 | `() => void` |

<!-- 所有单元格的两端都需要有一个空格 --> 
