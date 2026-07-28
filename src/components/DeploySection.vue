<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { useSiteData } from '../composables/useSiteData'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { deploys, stack } = useSiteData()
</script>

<template>
  <section id="deploy" class="section section-alt">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title" data-reveal data-reveal-delay="80">
          {{ t('deploy.sectionTitle') }}
        </h2>
        <p class="section-lead" data-reveal data-reveal-delay="140">
          {{ t('deploy.sectionLead') }}
        </p>
      </div>

      <div class="deploys">
        <article
          v-for="(d, i) in deploys"
          :key="d.title"
          class="deploy card"
          data-reveal
          :data-reveal-delay="i * 120"
        >
          <div class="deploy-head">
            <div class="deploy-icon"><AppIcon :name="d.icon" :size="26" /></div>
            <div>
              <h3 class="deploy-title">{{ d.title }}</h3>
              <span class="deploy-badge">{{ d.badge }}</span>
            </div>
          </div>
          <p class="deploy-desc">{{ d.desc }}</p>
          <ol class="steps">
            <li v-for="(s, idx) in d.steps" :key="idx">
              <span class="step-no">{{ idx + 1 }}</span>
              <span class="step-txt">{{ s }}</span>
            </li>
          </ol>
        </article>
      </div>

      <div class="stack" data-reveal>
        <div class="stack-label">{{ t('deploy.stackLabel') }}</div>
        <div class="stack-grid">
          <div v-for="s in stack" :key="s.k" class="stack-item">
            <span class="stack-k">{{ s.k }}</span>
            <span class="stack-v">{{ s.v }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-alt {
  background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg) 100%);
}
.deploys {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  margin-bottom: 40px;
}
.deploy {
  padding: 32px 30px;
}
.deploy-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.deploy-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid rgba(243, 128, 32, 0.25);
  flex-shrink: 0;
}
.deploy-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.deploy-badge {
  font-size: 12.5px;
  color: var(--accent-2);
  font-weight: 600;
}
.deploy-desc {
  color: var(--text-muted);
  font-size: 14.5px;
  margin-bottom: 22px;
}
.steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.step-no {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-2);
}
.step-txt {
  font-size: 14px;
  color: var(--text);
  padding-top: 2px;
}
.stack {
  margin-top: 8px;
  padding: 26px 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-2);
}
.stack-label {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-weight: 600;
  margin-bottom: 16px;
}
.stack-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.stack-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stack-k {
  font-size: 12.5px;
  color: var(--text-dim);
}
.stack-v {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  font-family: var(--mono);
}
@media (max-width: 900px) {
  .deploys { grid-template-columns: 1fr; }
  .stack-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
