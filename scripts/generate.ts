import type { QuestionCollection } from 'inquirer'

import { textSync } from 'figlet'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import ora from 'ora'
import { resolve } from 'path'
import { mkdir, pathExistsSync, writeFile } from 'fs-extra'

import { getIndexTemplate, getFnTemplate, getTypesTemplate } from './template'

interface Answers {
  functionName: string
}

const questions: QuestionCollection[] = [
  { name: 'functionName', message: 'Please enter the function name', default: 'request' },
]

async function generate() {
  console.log(chalk.greenBright(textSync('I-Hooks Generate Tool')))

  const { functionName } = await inquirer.prompt<Answers>(questions)

  const spin = ora()
  spin.start('The template is being generated, please wait...')

  const dirName = `use-${kebabCase(functionName)}`
  const dirPath = resolve(__dirname, '../', 'src', dirName)

  if (pathExistsSync(dirPath)) {
    spin.fail(chalk.redBright(`${functionName} function already exists, please change it！`))
    process.exit(1)
  }

  // create dir
  await mkdir(dirPath)
  await mkdir(`${dirPath}/__tests__`)
  await mkdir(`${dirPath}/demo`)

  const tsName = camelCase(dirName)
  const upperFistName = upperFirst(tsName)

  await writeFile(`${dirPath}/index.ts`, getIndexTemplate(tsName))
  await writeFile(`${dirPath}/${tsName}.ts`, getFnTemplate(upperFistName))
  await writeFile(`${dirPath}/types.ts`, getTypesTemplate(upperFistName))

  spin.succeed(`The template is successfully created, enjoy coding ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`)
  console.log(chalk.bold.yellowBright(textSync('Hello World!')))
}

generate()
