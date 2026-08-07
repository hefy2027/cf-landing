<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'

const { locale, t } = useI18n()
const router = useRouter()

// Sync document lang & meta
function syncHtmlLang() {
  const lang = locale.value === 'zh-CN' ? 'zh-CN' : 'en'
  document.documentElement.lang = lang

  const titleMeta = document.querySelector('meta[name="description"]')
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDesc = document.querySelector('meta[property="og:description"]')

  if (locale.value === 'zh-CN') {
    document.title = 'CF Manager · 一站式 Cloudflare 多账户统一运维平台'
    if (titleMeta) titleMeta.setAttribute('content', 'CF Manager 是面向开发者与运维的一站式 Cloudflare 多账户统一管理平台：可视化管理 DNS、Workers、Pages、KV/D1/R2 存储，内置 AI 工作台（对话/绘图/语音/翻译）与浏览器渲染，并暴露 OpenAI 兼容 API。支持 Cloudflare Pages 与 Docker 双部署。')
    if (ogTitle) ogTitle.setAttribute('content', 'CF Manager · 一站式 Cloudflare 多账户统一运维平台')
    if (ogDesc) ogDesc.setAttribute('content', '一个面板，管完你的 Cloudflare。多账户管理 · 全栈资源运维 · OpenAI 兼容 AI 网关。')
  } else {
    document.title = 'CF Manager · All-in-One Cloudflare Operations Platform'
    if (titleMeta) titleMeta.setAttribute('content', 'CF Manager is an all-in-one multi-account Cloudflare management platform for developers and ops teams: visual DNS, Workers, Pages, KV/D1/R2 storage management, built-in AI workspace (chat/image/TTS/translation) & browser rendering, with OpenAI-compatible API. Supports Cloudflare Pages & Docker deployment.')
    if (ogTitle) ogTitle.setAttribute('content', 'CF Manager · All-in-One Cloudflare Operations Platform')
    if (ogDesc) ogDesc.setAttribute('content', 'One panel to rule all your Cloudflare. Multi-account · Full-stack ops · OpenAI-compatible AI gateway.')
  }
}

// Sync on mount and on home page
onMounted(syncHtmlLang)
watch(locale, () => {
  localStorage.setItem('cf-manager-locale', locale.value)
  syncHtmlLang()
})

// Restore title when on home page
router.afterEach((to) => {
  if (to.path === '/' || to.name === 'home') {
    syncHtmlLang()
  }
})
</script>

<template>
  <TheNavbar />
  <router-view />
</template>
