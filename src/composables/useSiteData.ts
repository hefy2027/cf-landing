import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCN from '@/i18n/locales/zh-CN'
import en from '@/i18n/locales/en'

const META = {
  github: 'https://github.com/hefy2027/cf-manager',
  demo: 'https://cloud.umami.is/q/9GbJ5YAyt',
  demoPwd: 'cfmgrbest',
  relatedStore: 'https://github.com/hefy2027/cf-store',
  docs: {
    deploy: 'https://github.com/hefy2027/cf-manager/blob/master/docs/deploy.md',
    api: 'https://github.com/hefy2027/cf-manager/blob/master/docs/api-v1.md',
    auth: 'https://github.com/hefy2027/cf-manager/blob/master/docs/account-auth.md',
    changelog: 'https://github.com/hefy2027/cf-manager/blob/master/CHANGELOG.md'
  }
}

const ICONS = {
  pillars: ['layers', 'grid', 'spark'],
  features: [
    'gauge', 'dns', 'worker', 'tunnel', 'rules', 'database',
    'ai', 'browser', 'api', 'store', 'shield', 'dual'
  ],
  scenarios: ['dev', 'ops', 'tunnel', 'self'],
  deploys: ['cf', 'docker']
} as const

export function useSiteData() {
  const { locale } = useI18n()

  const data = computed(() => (locale.value === 'zh-CN' ? zhCN.data : en.data))

  const site = computed(() => ({
    ...META,
    name: 'CF Manager',
    slogan: locale.value === 'zh-CN' ? '一个面板，管完你的 Cloudflare' : 'One Panel, All Your Cloudflare',
    tagline: locale.value === 'zh-CN' ? '一站式 Cloudflare 多账户统一运维平台' : 'All-in-One Multi-Account Cloudflare Operations Platform',
    version: '1.4.0'
  }))

  const pillars = computed(() =>
    data.value.pillars.map((item, i) => ({ icon: ICONS.pillars[i], ...item }))
  )

  const features = computed(() =>
    data.value.features.map((item, i) => ({
      icon: ICONS.features[i],
      ...item,
      badge: i === 3 ? data.value.badges.tunnel : i === 4 ? data.value.badges.rules : undefined
    }))
  )

  const scenarios = computed(() =>
    data.value.scenarios.map((item, i) => ({ icon: ICONS.scenarios[i], ...item }))
  )

  const deploys = computed(() =>
    data.value.deploys.map((item, i) => ({ icon: ICONS.deploys[i], ...item }))
  )

  const stack = computed(() => data.value.stack)

  const stats = computed(() => {
    const raw = data.value.siteFeatures
    return [
      { v: raw[0], l: locale.value === 'zh-CN' ? '功能模块' : 'Modules' },
      { v: raw[1], l: locale.value === 'zh-CN' ? '部署方式' : 'Deploy Options' },
      { v: raw[2], l: locale.value === 'zh-CN' ? '后端架构' : 'Backends' },
      { v: raw[3], l: locale.value === 'zh-CN' ? '开源' : 'Open Source' }
    ]
  })

  return { site, pillars, features, scenarios, deploys, stack, stats }
}
