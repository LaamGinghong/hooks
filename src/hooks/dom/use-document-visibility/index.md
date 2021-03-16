# useDocumentVisibility

可以获取页面可见状态的 Hook。

## 代码演示

### 基础用法

```ts
import { useDocumentVisibility } from 'i-hooks'

const documentVisibility = useDocumentVisibility();
```

## 基础 API
  
```ts
const documentVisibility = useDocumentVisibility();
```

### Result

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| `documentVisibility` | 判断 document 是否在是否处于可见状态 | `'visible' | 'hidden' | 'prerender' | undefined ` |

<!-- 所有单元格的两端都需要有一个空格 --> 
