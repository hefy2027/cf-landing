<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { site } from '../data/site'

const year = new Date().getFullYear()

interface LinkItem { label: string; href: string; ext?: boolean; internal?: boolean }

const groups: { title: string; links: LinkItem[] }[] = [
  {
    title: '产品',
    links: [
      { label: '核心能力', href: '#pillars' },
      { label: '功能特性', href: '#features' },
      { label: '应用场景', href: '#scenarios' },
      { label: '部署方式', href: '#deploy' }
    ]
  },
  {
    title: '文档',
    links: [
      { label: '什么是 CF Manager', href: '/docs/intro', internal: true },
      { label: '快速开始', href: '/docs/quick-start', internal: true },
      { label: '部署文档', href: '/docs/deploy', internal: true },
      { label: '账户认证', href: '/docs/account-auth', internal: true },
      { label: '外部 API', href: '/docs/api-v1', internal: true }
    ]
  },
  {
    title: '资源',
    links: [
      { label: 'GitHub 仓库', href: site.github, ext: true },
      { label: '在线演示', href: site.demo, ext: true },
      { label: '应用商店模板 (cf-store)', href: site.relatedStore, ext: true }
    ]
  }
]
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a href="#top" class="brand">
          <span class="brand-mark"><AppIcon name="cf" :size="20" /></span>
          <span class="brand-text">{{ site.name }}</span>
        </a>
        <p class="footer-tag">{{ site.tagline }}</p>
        <p class="footer-warn">
          本工具仅供学习、技术研究与已授权账户的自有运维管理使用。请遵守
          Cloudflare 服务条款，禁止用于对外公共 AI / 渲染中转或转售。
        </p>
      </div>

      <div class="footer-links">
        <div v-for="g in groups" :key="g.title" class="footer-col">
          <h4>{{ g.title }}</h4>
          <template v-for="l in g.links" :key="l.label">
            <RouterLink v-if="l.internal" :to="l.href">{{ l.label }}</RouterLink>
            <a
              v-else
              :href="l.href"
              :target="l.ext ? '_blank' : undefined"
              rel="noopener"
              >{{ l.label }}</a
            >
          </template>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} {{ site.name }} Contributors · MIT License</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-1);
  padding: 64px 0 28px;
}
.footer-inner {
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 56px;
  padding-bottom: 44px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 17px;
  margin-bottom: 14px;
}
.brand-mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1a1206;
}
.footer-tag {
  color: var(--text-muted);
  font-size: 14.5px;
  margin-bottom: 16px;
}
.footer-warn {
  font-size: 12.5px;
  color: var(--text-dim);
  line-height: 1.7;
  max-width: 420px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-col h4 {
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-weight: 700;
  margin-bottom: 4px;
}
.footer-col a {
  font-size: 14.5px;
  color: var(--text-muted);
  transition: color 0.2s;
}
.footer-col a:hover {
  color: var(--accent);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-dim);
}
.footer-ver {
  font-family: var(--mono);
}
@media (max-width: 820px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
@media (max-width: 520px) {
  .footer-links {
    grid-template-columns: 1fr 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
