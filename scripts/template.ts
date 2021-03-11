import { upperFirst } from 'lodash'

export const getIndexTemplate = (name: string): string =>
  `export * from './${name}'
export * from './types'  
`

export const getTypesTemplate = (name: string): string =>
  `export interface ${name}Params {
}

export interface ${name}Result {
} 
`

export const getFnTemplate = (name: string): string =>
  `import type { ${upperFirst(name)}Params, ${upperFirst(name)}Result } from './types'

export default function ${name}(params: ${upperFirst(name)}Params): ${upperFirst(name)}Result {
}
`

export const getDocTemplate = (name: string): string =>
  `# ${name}

## 代码演示

### 基础用法

\`\`\`ts
import { ${name} } from 'i-hooks'

const options = ${name}()
\`\`\`

## 基础 API
  
\`\`\`ts
const {
// result ...
} = ${name}(
// params ...
)
\`\`\`

### Params

> <!-- 如有特殊说明，请加在这里 -->

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | ---- | --- | ----- | ------ |
| \`data\` | description | \`string\` | 'i-hooks' | ✅ |  

### Result

| 参数 | 说明 | 类型 |  
| --- | ---- | --- |
| \`data\` | description | \`number\` |

<!-- 所有单元格的两端都需要有一个空格 --> 
`
