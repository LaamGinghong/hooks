# useToggle

## 代码演示

### 基础用法

```ts
import { useToggle } from 'i-hooks'

const [state, { toggle, setLeft, setRight }] = useToggle()
```

## 基础 API
  
```ts
const [state, { toggle, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
)

const [state,{ toggle, setLeft, setRight }] = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
)
```

### Params

> <!-- 如有特殊说明，请加在这里 -->

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| `defaultValue` | 可选项，传入的默认值 | `number | string | boolean | undefined`  | `false` | - |  
| `reverseValue` | 可选项，传入的默认值 | `number | string | boolean | undefined`  | - | - |  

### Result

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| `state` | 当前状态值 | - |
| `actions` | 操作集合 | `UseToggleActions` |

### Actions

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| `toggle` | 状态变更函数，允许传入一个参数定向修改 | `(value: any) => void` |
| `setLeft` | 设置为 `defaultValue` | `() => void` |
| `setRight` | 设置为 `reverseValue` | `() => void` |

<!-- 所有单元格的两端都需要有一个空格 --> 
