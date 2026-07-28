import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 自托管字库（不由 Google Fonts CDN，合规 production 部署）
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import '@fontsource/jetbrains-mono/700.css'

createApp(App).use(router).mount('#app')
