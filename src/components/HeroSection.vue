<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import GitHubBadge from './GitHubBadge.vue'
import { useSiteData } from '../composables/useSiteData'

const { t } = useI18n()
const { site, stats } = useSiteData()
</script>

<template>
  <section id="top" class="hero">
    <div class="bg-grid"></div>
    <div class="glow glow-a"></div>
    <div class="glow glow-b"></div>

    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow" data-reveal
          ><AppIcon name="bolt" :size="14" /> {{ t('hero.eyebrow') }}</span
        >
        <h1 class="hero-title" data-reveal data-reveal-delay="80">
          {{ site.name }}
        </h1>
        <p class="hero-slogan" data-reveal data-reveal-delay="160">
          {{ site.slogan }}
        </p>
        <p class="hero-desc" data-reveal data-reveal-delay="220">
          {{ t('hero.desc') }}
        </p>

        <div class="hero-cta" data-reveal data-reveal-delay="300">
          <RouterLink to="/docs" class="btn btn-primary">
            <AppIcon name="arrow" :size="18" /> {{ t('hero.readDocs') }}
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
            <AppIcon name="play" :size="16" /> {{ t('hero.demo') }}
          </a>
        </div>

        <div class="hero-stats" data-reveal data-reveal-delay="360">
          <div v-for="s in stats" :key="s.l" class="stat">
            <span class="stat-v">{{ s.v }}</span>
            <span class="stat-l">{{ s.l }}</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" data-reveal data-reveal-delay="260">
        <div class="shot">
          <div class="shot-bar">
            <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
            <span class="shot-url">cloud.umami.is/q/9GbJ5YAyt</span>
          </div>
          <img
            src="/dashboard.png"
            alt="CF Manager Dashboard"
            width="1200"
            height="500"
            loading="eager"
            decoding="async"
          />
        </div>
        <div class="float-card fc-1">
          <AppIcon name="tunnel" :size="18" /><span>{{ t('hero.tunnelCard') }} <em class="fc-new">NEW</em></span>
        </div>
        <div class="float-card fc-2">
          <AppIcon name="rules" :size="18" /><span>{{ t('hero.rulesCard') }} <em class="fc-new">NEW</em></span>
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
  background: var(--accent-2);
  top: -80px;
  right: -140px;
  opacity: 0.16;
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

/* 产品截图 */
.hero-visual {
  position: relative;
}
.shot {
  background: #0b0b12;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  box-shadow: var(--shadow), 0 0 80px -20px var(--accent-glow);
  overflow: hidden;
}
.shot-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
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
.shot-url {
  margin-left: 10px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-dim);
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
}
.shot img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2908 / 1212;
}

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
.fc-new {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 2px;
  letter-spacing: 0.04em;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (prefers-reduced-motion: reduce) {
  .float-card { animation: none; }
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
