import type { QuestionCollection } from 'inquirer'

import { textSync } from 'figlet'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import ora from 'ora'
import { resolve } from 'path'
import { mkdir, pathExistsSync, readFile, writeFile } from 'fs-extra'

import { getIndexTemplate, getFnTemplate, getTypesTemplate, getDocTemplate } from './template'

interface Answers {
  functionName: string
  type: 'Async' | 'Table' | 'UI' | 'SideEffect' | 'LifeCycle' | 'State' | 'DOM'
}

const questions: QuestionCollection[] = [
  { name: 'functionName', message: 'Please enter the function name' },
  {
    name: 'type',
    type: 'list',
    message: 'Please select the type of the function',
    choices: ['Async', 'Table', 'UI', 'SideEffect', 'LifeCycle', 'State', 'DOM'],
  },
]

async function generate() {
  console.log(chalk.greenBright(textSync('I-Hooks Generate Tool')))

  const { functionName, type } = await inquirer.prompt<Answers>(questions)

  const spin = ora()
  spin.start('The template is being generated, please wait...')

  const typeName = kebabCase(type)
  const typePath = resolve(__dirname, '../', 'src', 'hooks', typeName)
  if (!pathExistsSync(typePath)) {
    await mkdir(typePath)
  }

  const dirName = `use-${kebabCase(functionName)}`
  const dirPath = resolve(typePath, dirName)

  if (pathExistsSync(dirPath)) {
    spin.fail(chalk.redBright(`${functionName} function already exists, please change it！`))
    process.exit(1)
  }

  // create dir
  await mkdir(dirPath)
  await mkdir(`${dirPath}/__tests__`)

  const tsName = camelCase(dirName)
  const upperFistName = upperFirst(tsName)

  await writeFile(`${dirPath}/index.ts`, getIndexTemplate(tsName))
  await writeFile(`${dirPath}/${tsName}.ts`, getFnTemplate(tsName))
  await writeFile(`${dirPath}/types.ts`, getTypesTemplate(upperFistName))
  await writeFile(`${dirPath}/index.md`, getDocTemplate(tsName))

  // modify index
  let moduleIndex = await readFile(resolve(typePath, 'index.ts'), 'utf-8')
  moduleIndex = moduleIndex
    ? `${moduleIndex}
export { default as use${upperFistName} } from './${dirName}'`
    : `export { default as use${upperFistName} } from './${dirName}'`

  await writeFile(resolve(typePath, 'index.ts'), moduleIndex)

  spin.succeed(`The template is successfully created, enjoy coding ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`)
  console.log(chalk.bold.yellowBright(textSync('Hello World!')))
}

generate()
