<script setup lang="ts">
// 内联 SVG 图标集，零依赖。通过 name prop 选择。
defineProps<{ name: string; size?: number | string }>()
</script>

<template>
  <svg
    :width="size || 24"
    :height="size || 24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- 三大支柱 -->
    <template v-if="name === 'layers'">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </template>
    <template v-else-if="name === 'spark'">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      <circle cx="12" cy="12" r="3" />
    </template>

    <!-- 功能图标 -->
    <template v-else-if="name === 'gauge'">
      <path d="M12 14 16 9" /><circle cx="12" cy="14" r="8" />
      <path d="M4 14a8 8 0 0 1 16 0" />
    </template>
    <template v-else-if="name === 'dns'">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </template>
    <template v-else-if="name === 'worker'">
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </template>
    <template v-else-if="name === 'tunnel'">
      <path d="M3 12h4l3 7 4-14 3 7h4" />
    </template>
    <template v-else-if="name === 'rules'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 4v16" />
    </template>
    <template v-else-if="name === 'database'">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </template>
    <template v-else-if="name === 'ai'">
      <rect x="4" y="6" width="16" height="13" rx="2" />
      <path d="M12 6V3M8 11h.01M16 11h.01M9 15h6M4 11h2M18 11h2" />
    </template>
    <template v-else-if="name === 'browser'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </template>
    <template v-else-if="name === 'api'">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </template>
    <template v-else-if="name === 'store'">
      <path d="M3 9 4 4h16l1 5M4 9v11h16V9M4 9h16M9 13h6" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 3 5 6v6c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </template>
    <template v-else-if="name === 'dual'">
      <rect x="3" y="4" width="8" height="16" rx="1.5" />
      <rect x="13" y="4" width="8" height="16" rx="1.5" />
    </template>
    <template v-else-if="name === 'proxy'">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="12" r="2.4" />
      <path d="M8.2 7.2 15.8 10.8M8.2 16.8 15.8 13.2" />
    </template>
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </template>

    <!-- 场景图标 -->
    <template v-else-if="name === 'dev'">
      <path d="m9 8-3 4 3 4M15 8l3 4-3 4" />
    </template>
    <template v-else-if="name === 'ops'">
      <circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" /><path d="M15 20a5 5 0 0 1 6-4.5" />
    </template>
    <template v-else-if="name === 'self'">
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </template>

    <!-- 部署图标 -->
    <template v-else-if="name === 'cf'">
      <path d="M48 33.2c.1-.6.1-1.2.1-1.8 0-6.4-5.2-11.6-11.6-11.6-4.6 0-8.6 2.7-10.5 6.6-1-.8-2.3-1.3-3.7-1.3-3.2 0-5.8 2.5-6 5.6C12.3 31.9 9 35.6 9 40c0 4.8 3.9 8.7 8.7 8.7h28.6C50.7 48.7 54 45.4 54 41.2c0-3.5-2.4-6.5-5.7-7.4z" transform="scale(0.3) translate(2,2)" fill="currentColor" stroke="none"/>
    </template>
    <template v-else-if="name === 'docker'">
      <rect x="3" y="11" width="3" height="3.2" rx="0.4" />
      <rect x="7" y="11" width="3" height="3.2" rx="0.4" />
      <rect x="11" y="11" width="3" height="3.2" rx="0.4" />
      <rect x="7" y="7.5" width="3" height="3.2" rx="0.4" />
      <rect x="11" y="7.5" width="3" height="3.2" rx="0.4" />
      <path d="M2.5 14.5h15a4 4 0 0 1-1.5 4.2c-2 1.4-5 1.6-7.5 1.6-3.5 0-6-.4-7.5-1.6a4 4 0 0 1-1.5-4.2Z" />
      <path d="M17 13c1.5-.2 2.5.6 3 2" />
    </template>

    <!-- 通用 -->
    <template v-else-if="name === 'github'">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </template>
    <template v-else-if="name === 'play'">
      <path d="M6 4l14 8-14 8V4Z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'arrow'">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="m5 12 5 5 9-11" />
    </template>
    <template v-else-if="name === 'star'">
      <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
    </template>
    <template v-else-if="name === 'bolt'">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'lock'">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="9" />
    </template>
  </svg>
</template>
