import { ref, onMounted } from 'vue'
import { site } from '../data/site'

const CACHE_KEY = 'cfmgr:gh:repo'
const CACHE_TTL = 1000 * 60 * 60 // 1 小时

interface RepoCache {
  owner: string
  repo: string
  stars: number
  forks: number
  updatedAt: number
}

function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/)
  if (!m) return null
  return { owner: m[1], repo: m[2] }
}

/** 1.2k / 3.4k 之类的紧凑格式 */
export function formatCount(n: number | null): string {
  if (n === null || Number.isNaN(n)) return ''
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

export function useGitHubRepo() {
  const stars = ref<number | null>(null)
  const forks = ref<number | null>(null)
  const loading = ref(false)
  const error = ref(false)

  function load() {
    const repo = parseRepo(site.github)
    if (!repo) return

    // 命中本地缓存则直接返回，避免频繁打 GitHub API
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const cached = JSON.parse(raw) as RepoCache
        if (
          cached.owner === repo.owner &&
          cached.repo === repo.repo &&
          Date.now() - cached.updatedAt < CACHE_TTL
        ) {
          stars.value = cached.stars
          forks.value = cached.forks
          return
        }
      }
    } catch {
      /* 忽略损坏缓存 */
    }

    loading.value = true
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((d: { stargazers_count: number; forks_count: number }) => {
        stars.value = d.stargazers_count
        forks.value = d.forks_count
        try {
          const payload: RepoCache = {
            owner: repo.owner,
            repo: repo.repo,
            stars: d.stargazers_count,
            forks: d.forks_count,
            updatedAt: Date.now()
          }
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
        } catch {
          /* 忽略写入失败（隐私模式等） */
        }
      })
      .catch(() => {
        error.value = true
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(load)

  return { stars, forks, loading, error, formatCount }
}
