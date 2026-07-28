<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import GitHubBadge from './GitHubBadge.vue'
import { useSiteData } from '../composables/useSiteData'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { site } = useSiteData()
</script>

<template>
  <section class="cta">
    <div class="glow glow-c"></div>
    <div class="container cta-inner" data-reveal>
      <span class="eyebrow"
        ><AppIcon name="star" :size="14" /> {{ t('cta.eyebrow') }}</span
      >
      <h2 class="cta-title">{{ t('cta.title') }}</h2>
      <p class="cta-desc">{{ t('cta.desc') }}</p>
      <div class="cta-actions">
        <a
          :href="site.github"
          target="_blank"
          rel="noopener"
          class="btn btn-primary btn-lg"
        >
          <AppIcon name="github" :size="18" /> GitHub
          <GitHubBadge />
        </a>
        <a
          :href="site.demo"
          target="_blank"
          rel="noopener"
          class="btn btn-ghost btn-lg"
        >
          <AppIcon name="play" :size="16" /> {{ t('cta.demo') }}
        </a>
      </div>
      <div class="cta-note">
        {{ t('cta.demoNote') }} <code>{{ site.demoPwd }}</code>
        {{ t('cta.demoNoteSuffix') }}
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
