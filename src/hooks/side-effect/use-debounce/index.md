# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础用法

```ts
import { useDebounce } from 'i-hooks'

const debouncedValue = useDebounce(fn, { wait: 500 });
```

## 基础 API
  
```ts
const debouncedValue = useDebounce(
  fn: (...args: any[]) => any,
  options?: Options
);
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

<!-- 所有单元格的两端都需要有一个空格 --> 
