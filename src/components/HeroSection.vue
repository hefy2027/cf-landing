<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import GitHubBadge from './GitHubBadge.vue'
import { site } from '../data/site'

const stats = [
  { v: '12+', l: '功能模块' },
  { v: '3', l: '部署方式' },
  { v: '2', l: '后端架构' },
  { v: '100%', l: '开源' }
]
</script>

<template>
  <section id="top" class="hero">
    <div class="bg-grid"></div>
    <div class="glow glow-a"></div>
    <div class="glow glow-b"></div>

    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow" data-reveal
          ><AppIcon name="bolt" :size="14" /> v{{ site.version }} · 全栈
          Cloudflare 运维</span
        >
        <h1 class="hero-title" data-reveal data-reveal-delay="80">
          {{ site.name }}
        </h1>
        <p class="hero-slogan" data-reveal data-reveal-delay="160">
          {{ site.slogan }}
        </p>
        <p class="hero-desc" data-reveal data-reveal-delay="220">
          {{ site.tagline }}。可视化管理 DNS、Workers、Pages 与 KV / D1 / R2
          存储，内置 AI 推理与浏览器渲染，并暴露 OpenAI 兼容 API。多账户统一管理
          · 全栈资源运维 · AI 网关，三位一体。
        </p>

        <div class="hero-cta" data-reveal data-reveal-delay="300">
          <RouterLink to="/docs" class="btn btn-primary">
            <AppIcon name="arrow" :size="18" /> 阅读文档
          </RouterLink>
          <a
            :href="site.github"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
          >
            <AppIcon name="github" :size="18" /> GitHub
            <GitHubBadge />
          </a>
          <a
            :href="site.demo"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
          >
            <AppIcon name="play" :size="16" /> 在线演示
          </a>
        </div>

        <div class="hero-hint" data-reveal data-reveal-delay="360">
          演示站密码 <code>{{ site.demoPwd }}</code> · 演示账户配额有限，仅供体验
        </div>

        <div class="hero-stats" data-reveal data-reveal-delay="420">
          <div v-for="s in stats" :key="s.l" class="stat">
            <span class="stat-v">{{ s.v }}</span>
            <span class="stat-l">{{ s.l }}</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" data-reveal data-reveal-delay="260">
        <div class="terminal">
          <div class="term-bar">
            <span class="dot r"></span><span class="dot y"></span
            ><span class="dot g"></span>
            <span class="term-title">cf-manager — dashboard</span>
          </div>
          <div class="term-body">
            <p class="t-line"><span class="t-prompt">$</span> ./deploy.sh <span class="t-cmt"># 一键部署</span></p>
            <p class="t-ok">  ✓ services ready · admin at <span class="t-key">/admin/</span></p>
            <p class="t-out t-cmt"># 在管理面板中操作</p>
            <p class="t-out">[accounts] <span class="t-num">3</span> added · AES encrypted</p>
            <p class="t-out">[workers] deployed across <span class="t-num">3</span> accounts</p>
            <p class="t-out">[dns] <span class="t-num">12</span> records · quota tracked</p>
            <p class="t-line"><span class="t-prompt">$</span> curl /v1/chat/completions \</p>
            <p class="t-out">  -H "Authorization: Bearer <span class="t-key">••••</span>"</p>
            <p class="t-out">→ streaming · multi-account routing</p>
            <p class="t-ok">  ✔ 200 OK · <span class="t-num">1.2k</span> tokens · cache-aware billing</p>
            <p class="t-cursor">$ <span class="cursor"></span></p>
          </div>
        </div>
        <div class="float-card fc-1">
          <AppIcon name="shield" :size="18" /><span>AES 加密</span>
        </div>
        <div class="float-card fc-2">
          <AppIcon name="bolt" :size="18" /><span>多账户调度</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 150px 0 90px;
  overflow: hidden;
  background: radial-gradient(
      ellipse 70% 50% at 50% -10%,
      rgba(243, 128, 32, 0.16),
      transparent 60%
    ),
    var(--bg);
}
.glow-a {
  width: 520px;
  height: 520px;
  background: var(--accent);
  top: -160px;
  left: -120px;
  opacity: 0.22;
}
.glow-b {
  width: 460px;
  height: 460px;
  background: #6d3bd6;
  top: -80px;
  right: -140px;
  opacity: 0.18;
}
.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}
.hero-title {
  font-size: clamp(48px, 7vw, 88px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.035em;
  margin: 20px 0 14px;
  background: linear-gradient(180deg, #ffffff 0%, #ffcf9e 60%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-slogan {
  font-size: clamp(20px, 2.6vw, 27px);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.hero-desc {
  font-size: 16.5px;
  color: var(--text-muted);
  margin-top: 16px;
  max-width: 540px;
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}
.hero-hint {
  margin-top: 16px;
  font-size: 13px;
  color: var(--text-dim);
}
.hero-stats {
  display: flex;
  gap: 36px;
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-v {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
}
.stat-l {
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 2px;
}

/* 终端 mock */
.hero-visual {
  position: relative;
}
.terminal {
  background: #0b0b12;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  box-shadow: var(--shadow), 0 0 80px -20px var(--accent-glow);
  overflow: hidden;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px;
  background: #101019;
  border-bottom: 1px solid var(--border);
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.term-title {
  margin-left: 10px;
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--text-dim);
}
.term-body {
  padding: 20px 22px;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.9;
}
.t-line { color: var(--text); }
.t-cmt { color: var(--text-dim); }
.t-prompt { color: var(--accent); font-weight: 700; margin-right: 8px; }
.t-out { color: var(--text-muted); padding-left: 16px; }
.t-ok { color: var(--green); padding-left: 16px; }
.t-key { color: var(--accent-2); }
.t-num { color: var(--blue); }
.t-cursor { color: var(--text); }
.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--accent);
  vertical-align: -2px;
  animation: blink 1.1s steps(2) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 11px;
  background: rgba(22, 22, 31, 0.85);
  border: 1px solid var(--border-strong);
  backdrop-filter: blur(10px);
  color: var(--accent-2);
  box-shadow: var(--shadow);
  animation: float 5s ease-in-out infinite;
}
.fc-1 { top: 18%; left: -34px; }
.fc-2 { bottom: 14%; right: -28px; animation-delay: -2.5s; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 960px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-visual { max-width: 520px; }
  .hero-stats { gap: 24px; }
}
@media (max-width: 560px) {
  .hero-stats { flex-wrap: wrap; gap: 18px 28px; }
  .fc-1 { left: -10px; }
  .fc-2 { right: -6px; }
}
</style>
