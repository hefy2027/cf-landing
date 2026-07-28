<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import GitHubBadge from './GitHubBadge.vue'
import { site } from '../data/site'
</script>

<template>
  <section class="cta">
    <div class="glow glow-c"></div>
    <div class="container cta-inner" data-reveal>
      <span class="eyebrow"
        ><AppIcon name="star" :size="14" /> 开源 · MIT 协议</span
      >
      <h2 class="cta-title">现在就开始管理你的 Cloudflare</h2>
      <p class="cta-desc">
        Fork 仓库一键部署到 Cloudflare Pages，或用 Docker 自建。
        几分钟即可拥有一个统一的多账户运维面板。
      </p>
      <div class="cta-actions">
        <a
          :href="site.github"
          target="_blank"
          rel="noopener"
          class="btn btn-primary btn-lg"
        >
          <AppIcon name="github" :size="18" /> 获取源码
          <GitHubBadge />
        </a>
        <a
          :href="site.demo"
          target="_blank"
          rel="noopener"
          class="btn btn-ghost btn-lg"
        >
          <AppIcon name="play" :size="16" /> 体验在线演示
        </a>
      </div>
      <div class="cta-note">
        演示站密码 <code>{{ site.demoPwd }}</code>
        · 仅限体验，请勿用于真实业务
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
  background: var(--bg);
}
.glow-c {
  width: 600px;
  height: 600px;
  background: var(--accent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.14;
  filter: blur(120px);
}
.cta-inner {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
}
.cta-title {
  font-size: clamp(30px, 4.5vw, 46px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 22px 0 16px;
  background: linear-gradient(180deg, #fff 0%, #c9d1dc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cta-desc {
  font-size: 17px;
  color: var(--text-muted);
  margin-bottom: 34px;
  max-width: 540px;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.btn-lg {
  padding: 15px 28px;
  font-size: 16px;
}
.cta-note {
  margin-top: 20px;
  font-size: 13px;
  color: var(--text-dim);
}
</style>
