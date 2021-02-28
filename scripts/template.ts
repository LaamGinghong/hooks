export const getIndexTemplate = (name: string): string => {
  return `export * from './${name}'
export * from './types'  
`
}

export const getTypesTemplate = (name: string): string => {
  return `export interface ${name}Params {
}

export interface ${name}Result {
} 
`
}

export const getFnTemplate = (name: string): string => {
  return `import type { ${name}Params, ${name}Result } from './types'

export function ${name}(params: ${name}Params): ${name}Result {
}
`
}
