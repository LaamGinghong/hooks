const { readdirSync } = require('fs-extra')
const { resolve } = require('path')
const { camelCase } = require('lodash')

function buildSideBar(path) {
  const files = readdirSync(path)
  return files.map((file) => {
    return {
      text: file,
      children: readdirSync(resolve(path, file)).map((child) => {
        if (child === 'index.ts' || child.endsWith('.ts')) return
        return {
          text: camelCase(child),
          link: `/hooks/${file}/${child}/index`,
        }
      }).filter(item => item),
    }
  })
}


const sidebar = {
  '/guide/': [
    { text: '快速上手', link: '/guide/quick-start' },
    { text: 'API 规范', link: '/guide/api-specification' },
  ],
  '/hooks/': buildSideBar(resolve(__dirname, '../', 'hooks')),
}

module.exports = {
  title: 'i-hooks',
  lang: 'en-US',
  description: 'Vue3 Hooks Library.',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/quick-start', activeMatch: '^/guide/' },
      { text: 'Hooks', link: '/hooks/async/use-request/index', activeMatch: '^/hooks/' },
      { text: 'Github', link: 'https://github.com/LaamGinghong/hooks' },
    ],
    sidebar,
  },
}
