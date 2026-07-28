<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { pillars } from '../data/site'
</script>

<template>
  <section id="pillars" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow" data-reveal>三位一体</span>
        <h2 class="section-title" data-reveal data-reveal-delay="80">
          一个平台，三大核心能力
        </h2>
        <p class="section-lead" data-reveal data-reveal-delay="140">
          CF Manager 把分散在多个 Cloudflare 后台的运维工作收拢到统一面板，
          从账户到资源再到 AI 推理，端到端覆盖。
        </p>
      </div>

      <div class="pillars">
        <article
          v-for="(p, i) in pillars"
          :key="p.title"
          class="pillar card"
          data-reveal
          :data-reveal-delay="i * 120"
        >
          <div class="pillar-icon">
            <AppIcon :name="p.icon" :size="26" />
          </div>
          <span class="pillar-no">0{{ i + 1 }}</span>
          <h3 class="pillar-title">{{ p.title }}</h3>
          <p class="pillar-desc">{{ p.desc }}</p>
          <ul class="pillar-points">
            <li v-for="pt in p.points" :key="pt">
              <AppIcon name="check" :size="15" />{{ pt }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.pillar {
  position: relative;
  padding: 34px 30px 32px;
  overflow: hidden;
}
.pillar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.pillar:hover::before {
  opacity: 1;
}
.pillar-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid rgba(243, 128, 32, 0.25);
  margin-bottom: 20px;
}
.pillar-no {
  position: absolute;
  top: 28px;
  right: 30px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}
.pillar-title {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
}
.pillar-desc {
  color: var(--text-muted);
  font-size: 15px;
  margin-bottom: 22px;
}
.pillar-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pillar-points li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  color: var(--text);
}
.pillar-points li :deep(svg) {
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .pillars { grid-template-columns: 1fr; }
}
</style>
