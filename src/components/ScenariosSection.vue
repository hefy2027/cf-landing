<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { scenarios } from '../data/site'
</script>

<template>
  <section id="scenarios" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title" data-reveal data-reveal-delay="80">
          谁在用 CF Manager
        </h2>
        <p class="section-lead" data-reveal data-reveal-delay="140">
          无论你是独立开发者还是团队运维，CF Manager 都能适配你的 Cloudflare
          工作流。
        </p>
      </div>

      <div class="scenarios">
        <article
          v-for="(s, i) in scenarios"
          :key="s.title"
          class="scenario card"
          data-reveal
          :data-reveal-delay="i * 100"
        >
          <div class="sc-icon"><AppIcon :name="s.icon" :size="24" /></div>
          <div class="sc-body">
            <h3 class="sc-title">{{ s.title }}</h3>
            <p class="sc-desc">{{ s.desc }}</p>
            <ul v-if="s.points" class="sc-points">
              <li v-for="pt in s.points" :key="pt">
                <AppIcon name="check" :size="13" />{{ pt }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scenarios {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.scenario {
  display: flex;
  gap: 18px;
  padding: 28px 28px;
  align-items: flex-start;
}
.sc-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid rgba(243, 128, 32, 0.2);
}
.sc-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.sc-desc {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 14px;
}
.sc-points {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}
.sc-points li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text);
}
.sc-points li :deep(svg) {
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 760px) {
  .scenarios { grid-template-columns: 1fr; }
}
</style>
