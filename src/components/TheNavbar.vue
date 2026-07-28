<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import GitHubBadge from './GitHubBadge.vue'
import { site } from '../data/site'

const scrolled = ref(false)
const open = ref(false)

const router = useRouter()
const route = useRoute()

const links = [
  { href: '#pillars', label: '核心能力' },
  { href: '#features', label: '功能特性' },
  { href: '#scenarios', label: '应用场景' },
  { href: '#deploy', label: '部署方式' }
]
const docLinks = [
  { to: '/docs', label: '文档' }
]

const NAV_OFFSET = 70
function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 在任意路由下点击首页锚点：非首页先跳回首页再滚动
function goAnchor(hash: string) {
  open.value = false
  if (route.path !== '/') {
    router.push('/').then(() => setTimeout(() => scrollToHash(hash), 90))
  } else {
    scrollToHash(hash)
  }
}

// 点击 logo：始终返回首页顶部
function goHome() {
  open.value = false
  if (route.path !== '/') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const onScroll = () => (scrolled.value = window.scrollY > 20)
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="container nav-inner">
      <a href="#top" class="brand" @click.prevent="goHome">
        <span class="brand-mark"><AppIcon name="cf" :size="22" /></span>
        <span class="brand-text">{{ site.name }}</span>
      </a>

      <nav class="nav-links" :class="{ open }">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          @click.prevent="goAnchor(l.href)"
          >{{ l.label }}</a
        >
        <RouterLink
          v-for="l in docLinks"
          :key="l.to"
          :to="l.to"
          active-class="nav-active"
          @click="open = false"
          >{{ l.label }}</RouterLink
        >
        <a
          :href="site.demo"
          target="_blank"
          rel="noopener"
          class="nav-demo"
          @click="open = false"
          ><AppIcon name="play" :size="14" /> 在线演示</a
        >
      </nav>

      <div class="nav-cta">
        <div class="gh-group">
          <a
            :href="site.github"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost btn-sm gh-btn"
          >
            <AppIcon name="github" :size="16" /> GitHub
          </a>
          <span class="gh-badge-wrap"><GitHubBadge /></span>
        </div>
        <button
          class="burger"
          :class="{ open }"
          aria-label="菜单"
          @click="open = !open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(7, 7, 11, 0.72);
  backdrop-filter: blur(16px) saturate(140%);
  border-bottom-color: var(--border);
}
.nav-inner {
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -0.01em;
}
.brand-mark {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1a1206;
  box-shadow: 0 6px 18px -4px var(--accent-glow);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-links a {
  font-size: 14.5px;
  color: var(--text-muted);
  padding: 8px 13px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}
.nav-links a:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}
.nav-demo {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--accent) !important;
  border: 1px solid rgba(243, 128, 32, 0.22);
  padding: 6px 14px !important;
  font-weight: 600;
}
.nav-demo:hover {
  background: var(--accent-soft) !important;
}
.nav-active {
  color: var(--text) !important;
  font-weight: 600;
}
.nav-cta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.gh-group {
  display: flex;
  align-items: center;
}
.gh-btn {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-right: none !important;
  padding: 9px 14px;
  font-size: 14px;
}
.gh-badge-wrap {
  display: flex;
  align-items: center;
  padding: 9px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-strong);
  border-radius: 0 12px 12px 0;
  font-size: 13px;
  color: var(--text-muted);
}
.btn-sm {
  padding: 9px 16px;
  font-size: 14px;
}
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.burger span {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  opacity: 0;
}
.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 860px) {
  .burger {
    display: flex;
  }
  .nav-links {
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    padding: 14px 18px 20px;
    background: rgba(7, 7, 11, 0.96);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s, opacity 0.25s;
  }
  .nav-links.open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
  .nav-links a {
    padding: 12px 10px;
    font-size: 15px;
  }
}
</style>
