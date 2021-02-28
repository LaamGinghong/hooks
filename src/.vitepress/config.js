const { readdirSync } = require('fs-extra')
const { resolve } = require('path')
const { camelCase } = require('lodash')

function buildSideBar(path) {
  const files = readdirSync(path)
  return files.map((file) => {
    return {
      text: file,
      children: readdirSync(resolve(path, file)).map((child) => {
        return {
          text: camelCase(child),
          link: `/hooks/${file}/${child}/index`,
        }
      }),
    }
  })
}

const sidebar = {
  '/hooks/': buildSideBar(resolve(__dirname, '../', 'hooks')),
}

module.exports = {
  title: 'i-hooks',
  lang: 'en-US',
  description: 'Vue3 Hooks Library.',
  themeConfig: {
    nav: [
      { text: 'Hooks', link: '/hooks/async/use-request/index', activeMatch: '^/hooks/' },
      { text: 'Github', link: 'https://github.com/LaamGinghong/hooks' },
    ],
    sidebar,
  },
}
