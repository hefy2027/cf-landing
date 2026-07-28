<script setup lang="ts">
import { useGitHubRepo } from '../composables/useGitHubRepo'

const { stars, forks, loading, error, formatCount } = useGitHubRepo()
</script>

<template>
  <span v-if="!error" class="gh-badge" :class="{ 'is-loading': loading }">
    <span class="gh-s" :title="stars !== null ? `${stars} stars` : ''">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        />
      </svg>
      <span>{{ stars === null ? '–' : formatCount(stars) }}</span>
    </span>
    <span class="gh-s" :title="forks !== null ? `${forks} forks` : ''">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 0a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
        />
      </svg>
      <span>{{ forks === null ? '–' : formatCount(forks) }}</span>
    </span>
  </span>
</template>

<style scoped>
.gh-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: 8px;
  padding-left: 10px;
  border-left: 1px solid var(--border);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
  white-space: nowrap;
}
.gh-s {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.gh-s svg {
  color: var(--accent);
  opacity: 0.9;
}
.is-loading {
  opacity: 0.55;
}
</style>
