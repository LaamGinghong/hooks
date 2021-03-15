# 快速上手

`i-hooks` 是一个 Vue3 Hooks 库，致力于提供常用的高质量 Hooks 库。

> 在开始之前，你需要先掌握 Vue 以及 Vue Composition API 用法。访问[链接](https://vue3js.cn/docs/zh/guide/composition-api-introduction.html)学习 Vue Composition 官方文档。

## 第一个例子

TODO

## 按需加载

可以通过以下的写法来按需加载 Hooks。

```typescript
import useToggle from 'i-hooks/es/useToggle'
```

> 注意：`i-hooks` 默认支持基于 ES module 的 tree shaking，对于 js 部分，直接引入 import { useToggle } from 'i-hooks' 也会有按需加载的效果。

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：

```typescript
import { useToggle } from 'i-hooks'
```

插件会帮你转换成 `i-hooks/es/useToggle` 的写法。