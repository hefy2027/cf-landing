<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { docs, getDoc } from '../content/docs'
import { renderMarkdown } from '../utils/markdown'
import DocSidebar from '../components/DocSidebar.vue'
import TheFooter from '../components/TheFooter.vue'
const route = useRoute()
const doc = computed(() => getDoc(route.params.slug as string))
const html = computed(() => (doc.value ? renderMarkdown(doc.value.content) : ''))
const idx = computed(() => (doc.value ? docs.findIndex((d) => d.slug === doc.value!.slug) : -1))
const prev = computed(() => (idx.value > 0 ? docs[idx.value - 1] : null))
const next = computed(() => (idx.value >= 0 && idx.value < docs.length - 1 ? docs[idx.value + 1] : null))
watch(() => doc.value?.title, (t) => { if (t) document.title = `${t} · CF Manager 文档` }, { immediate: true })
</script>
<template>
  <div class="doc-article-page">
    <div class="container doc-layout">
      <DocSidebar />
      <main v-if="doc" class="doc-content">
        <div class="doc-breadcrumb"><RouterLink to="/docs">文档</RouterLink><span>/</span><span class="bc-group">{{ doc.group }}</span></div>
        <h1 class="article-title">{{ doc.title }}</h1>
        <p class="article-desc">{{ doc.desc }}</p>
        <div class="markdown-body" v-html="html"></div>
        <nav class="doc-pager">
          <RouterLink v-if="prev" :to="`/docs/${prev.slug}`" class="pager-link"><span class="pager-label">上一篇</span><span class="pager-title">{{ prev.title }}</span></RouterLink>
          <span v-else></span>
          <RouterLink v-if="next" :to="`/docs/${next.slug}`" class="pager-link pager-next"><span class="pager-label">下一篇</span><span class="pager-title">{{ next.title }}</span></RouterLink>
        </nav>
      </main>
      <main v-else class="doc-content">
        <p class="not-found">未找到该文档。</p>
        <RouterLink to="/docs" class="btn btn-ghost">返回文档</RouterLink>
      </main>
    </div>
    <TheFooter />
  </div>
</template>
<style scoped>
.doc-article-page { padding-top: 110px; }
.doc-layout { display: flex; gap: 48px; align-items: flex-start; padding-bottom: 80px; }
.doc-content { flex: 1; min-width: 0; max-width: 820px; }
.doc-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-dim); margin-bottom: 24px; }
.doc-breadcrumb a { color: var(--text-muted); }
.doc-breadcrumb a:hover { color: var(--accent); }
.bc-group { color: var(--accent); }
.article-title { font-size: clamp(28px, 4vw, 38px); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }
.article-desc { font-size: 16px; color: var(--text-muted); margin-bottom: 36px; padding-bottom: 28px; border-bottom: 1px solid var(--border); }
.doc-pager { display: flex; justify-content: space-between; gap: 18px; margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--border); }
.pager-link { display: flex; flex-direction: column; gap: 6px; padding: 16px 20px; border: 1px solid var(--border); border-radius: 12px; max-width: 48%; transition: border-color .2s, background .2s; }
.pager-link:hover { border-color: var(--accent); background: rgba(255,255,255,0.03); }
.pager-next { text-align: right; margin-left: auto; }
.pager-label { font-size: 12px; color: var(--text-dim); }
.pager-title { font-size: 15px; font-weight: 600; color: var(--text); }
.not-found { color: var(--text-muted); margin-bottom: 20px; }
@media (max-width: 900px) { .doc-layout { flex-direction: column; gap: 0; } }
</style>
