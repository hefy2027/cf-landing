<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSiteData } from '../composables/useSiteData'

const { t } = useI18n()
const { site } = useSiteData()

const year = new Date().getFullYear()

interface LinkItem { label: string; href: string; ext?: boolean; internal?: boolean }
type Group = { title: string; links: LinkItem[] }

const groups = computed<Group[]>(() => [
  {
    title: t('footer.groupProduct'),
    links: [
      { label: t('footer.linkCoreFeatures'), href: '#pillars' },
      { label: t('footer.linkFeatures'), href: '#features' },
      { label: t('footer.linkScenarios'), href: '#scenarios' },
      { label: t('footer.linkDeploy'), href: '#deploy' }
    ]
  },
  {
    title: t('footer.groupDocs'),
    links: [
      { label: t('footer.linkIntro'), href: '/docs/intro', internal: true },
      { label: t('footer.linkQuickStart'), href: '/docs/quick-start', internal: true },
      { label: t('footer.linkDeployDoc'), href: '/docs/deploy', internal: true },
      { label: t('footer.linkAuth'), href: '/docs/account-auth', internal: true },
      { label: t('footer.linkApi'), href: '/docs/api-v1', internal: true }
    ]
  },
  {
    title: t('footer.groupResources'),
    links: [
      { label: t('footer.linkGitHub'), href: site.value.github, ext: true },
      { label: t('footer.linkDemo'), href: site.value.demo, ext: true },
      { label: t('footer.linkStore'), href: site.value.relatedStore, ext: true }
    ]
  }
])
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
        <p class="footer-warn">{{ t('footer.warn') }}</p>
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
      <span>© {{ year }} {{ site.name }} {{ t('footer.copyright') }}</span>
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
