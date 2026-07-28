<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { useSiteData } from '../composables/useSiteData'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { features } = useSiteData()
</script>

<template>
  <section id="features" class="section section-alt">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title" data-reveal data-reveal-delay="80">
          {{ t('features.sectionTitle') }}
        </h2>
        <p class="section-lead" data-reveal data-reveal-delay="140">
          {{ t('features.sectionLead') }}
        </p>
      </div>

      <div class="grid">
        <article
          v-for="(f, i) in features"
          :key="f.title"
          class="feature card"
          data-reveal
          :data-reveal-delay="(i % 4) * 90"
        >
          <div class="feature-icon">
            <AppIcon :name="f.icon" :size="22" />
          </div>
          <h3 class="feature-title">
            {{ f.title }}
            <span v-if="f.badge" class="badge-new">{{ f.badge }}</span>
          </h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-alt {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-1) 100%);
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.feature {
  padding: 26px 24px 24px;
}
.feature-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--accent-2);
  margin-bottom: 16px;
  transition: color 0.25s, border-color 0.25s, background 0.25s;
}
.feature:hover .feature-icon {
  color: var(--accent);
  border-color: rgba(243, 128, 32, 0.35);
  background: var(--accent-soft);
}
.feature-title {
  font-size: 16.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 9px;
}
.feature-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 720px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>