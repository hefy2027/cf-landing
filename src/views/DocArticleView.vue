<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import mermaid from 'mermaid'
import { useDocs } from '../composables/useDocs'
import { renderMarkdown } from '../utils/markdown'
import DocSidebar from '../components/DocSidebar.vue'
import TheFooter from '../components/TheFooter.vue'

const { t } = useI18n()
const route = useRoute()
const { docs, getDoc } = useDocs()
const doc = computed(() => getDoc(route.params.slug as string))
const html = computed(() => (doc.value ? renderMarkdown(doc.value.content) : ''))
const idx = computed(() => (doc.value ? docs.value.findIndex((d) => d.slug === doc.value!.slug) : -1))
const prev = computed(() => (idx.value > 0 ? docs.value[idx.value - 1] : null))
const next = computed(() => (idx.value >= 0 && idx.value < docs.value.length - 1 ? docs.value[idx.value + 1] : null))
watch(() => doc.value?.title, (title) => { if (title) document.title = `${title} ${t('doc.titleSuffix')}` }, { immediate: true })

mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict' })

watch(html, async () => {
  await nextTick()
  const blocks = document.querySelectorAll<HTMLElement>('.markdown-body pre code.language-mermaid')
  blocks.forEach((code) => {
    const pre = code.parentElement
    if (!pre) return
    const div = document.createElement('div')
    div.className = 'mermaid'
    div.textContent = code.textContent || ''
    pre.replaceWith(div)
  })
  if (blocks.length) {
    try { await mermaid.run() } catch (e) { console.error('[mermaid] render failed', e) }
  }
}, { immediate: true })
</script>
<template>
  <div class="doc-article-page">
    <div class="container doc-layout">
      <DocSidebar />
      <main v-if="doc" class="doc-content">
        <div class="doc-breadcrumb"><RouterLink to="/docs">{{ t('doc.breadcrumb') }}</RouterLink><span>/</span><span class="bc-group">{{ doc.group }}</span></div>
        <h1 class="article-title">{{ doc.title }}</h1>
        <p class="article-desc">{{ doc.desc }}</p>
        <div class="markdown-body" v-html="html"></div>
        <nav class="doc-pager">
          <RouterLink v-if="prev" :to="`/docs/${prev.slug}`" class="pager-link"><span class="pager-label">{{ t('doc.prev') }}</span><span class="pager-title">{{ prev.title }}</span></RouterLink>
          <span v-else></span>
          <RouterLink v-if="next" :to="`/docs/${next.slug}`" class="pager-link pager-next"><span class="pager-label">{{ t('doc.next') }}</span><span class="pager-title">{{ next.title }}</span></RouterLink>
        </nav>
      </main>
      <main v-else class="doc-content">
        <p class="not-found">{{ t('doc.notFound') }}</p>
        <RouterLink to="/docs" class="btn btn-ghost">{{ t('doc.backToDocs') }}</RouterLink>
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

<style>
.markdown-body .mermaid {
  display: flex;
  justify-content: center;
  margin: 28px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 12px;
}
.markdown-body .mermaid svg { max-width: 100%; height: auto; }
</style>
