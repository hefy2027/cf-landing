/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

// 允许以 raw 字符串形式导入仓库 docs/ 下的 markdown
declare module '*.md?raw' {
  const src: string
  export default src
}
