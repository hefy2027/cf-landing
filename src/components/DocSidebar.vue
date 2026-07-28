<script setup lang="ts">
import { docs, groups } from '../content/docs'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <aside class="doc-sidebar">
    <div class="sidebar-inner">
      <RouterLink to="/docs" class="sidebar-home">文档首页</RouterLink>
      <div v-for="g in groups" :key="g" class="sidebar-group">
        <h4 class="sidebar-group-title">{{ g }}</h4>
        <RouterLink
          v-for="d in docs.filter((x) => x.group === g)"
          :key="d.slug"
          :to="`/docs/${d.slug}`"
          class="sidebar-link"
          :class="{ active: route.params.slug === d.slug }"
        >{{ d.title }}</RouterLink>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.doc-sidebar { position: sticky; top: 86px; align-self: flex-start; width: 240px; flex-shrink: 0; max-height: calc(100vh - 110px); overflow-y: auto; }
.sidebar-inner { padding: 4px 0 24px; }
.sidebar-home { display: block; font-size: 13.5px; color: var(--text-muted); padding: 10px 14px; border-radius: 8px; margin-bottom: 14px; border: 1px solid var(--border); background: rgba(255,255,255,0.02); }
.sidebar-home:hover { color: var(--accent); border-color: var(--accent); }
.sidebar-group { margin-bottom: 22px; }
.sidebar-group-title { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-dim); font-weight: 700; padding: 0 14px; margin-bottom: 8px; }
.sidebar-link { display: block; font-size: 14px; color: var(--text-muted); padding: 8px 14px; border-radius: 8px; border-left: 2px solid transparent; }
.sidebar-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.sidebar-link.active { color: var(--accent); background: var(--accent-soft); border-left-color: var(--accent); font-weight: 600; }
@media (max-width: 900px) { .doc-sidebar { position: static; width: 100%; max-height: none; margin-bottom: 28px; } }
</style>
