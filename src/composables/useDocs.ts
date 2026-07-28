import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCN from '@/i18n/locales/zh-CN'
import en from '@/i18n/locales/en'
// Chinese doc content
import introRawZh from '../../docs/intro.md?raw'
import quickStartRawZh from '../../docs/quick-start.md?raw'
import deployRawZh from '../../docs/deploy.md?raw'
import authRawZh from '../../docs/account-auth.md?raw'
import accountMgmtRawZh from '../../docs/account-management.md?raw'
import dnsRawZh from '../../docs/dns.md?raw'
import workersPagesRawZh from '../../docs/workers-pages.md?raw'
import tunnelRawZh from '../../docs/tunnel.md?raw'
import storageRawZh from '../../docs/storage.md?raw'
import aiRenderingRawZh from '../../docs/ai-rendering.md?raw'
import appStoreRawZh from '../../docs/app-store.md?raw'
import apiRawZh from '../../docs/api-v1.md?raw'
import securityRawZh from '../../docs/security.md?raw'
import troubleshootingRawZh from '../../docs/troubleshooting.md?raw'
import changelogRawZh from '../../docs/changelog.md?raw'
import architectureRawZh from '../../docs/architecture.md?raw'
// English doc content
import introRawEn from '../../docs/en/intro.md?raw'
import quickStartRawEn from '../../docs/en/quick-start.md?raw'
import deployRawEn from '../../docs/en/deploy.md?raw'
import authRawEn from '../../docs/en/account-auth.md?raw'
import accountMgmtRawEn from '../../docs/en/account-management.md?raw'
import dnsRawEn from '../../docs/en/dns.md?raw'
import workersPagesRawEn from '../../docs/en/workers-pages.md?raw'
import tunnelRawEn from '../../docs/en/tunnel.md?raw'
import storageRawEn from '../../docs/en/storage.md?raw'
import aiRenderingRawEn from '../../docs/en/ai-rendering.md?raw'
import appStoreRawEn from '../../docs/en/app-store.md?raw'
import apiRawEn from '../../docs/en/api-v1.md?raw'
import securityRawEn from '../../docs/en/security.md?raw'
import troubleshootingRawEn from '../../docs/en/troubleshooting.md?raw'
import changelogRawEn from '../../docs/en/changelog.md?raw'
import architectureRawEn from '../../docs/en/architecture.md?raw'

export interface DocMeta {
  slug: string
  title: string
  desc: string
  group: string
  order: number
  content: string
}

const RAW_CONTENT_ZH: Record<string, string> = {
  intro: introRawZh,
  'quick-start': quickStartRawZh,
  deploy: deployRawZh,
  'account-auth': authRawZh,
  'account-management': accountMgmtRawZh,
  dns: dnsRawZh,
  'workers-pages': workersPagesRawZh,
  tunnel: tunnelRawZh,
  storage: storageRawZh,
  'ai-rendering': aiRenderingRawZh,
  'app-store': appStoreRawZh,
  'api-v1': apiRawZh,
  security: securityRawZh,
  troubleshooting: troubleshootingRawZh,
  changelog: changelogRawZh,
  architecture: architectureRawZh
}

const RAW_CONTENT_EN: Record<string, string> = {
  intro: introRawEn,
  'quick-start': quickStartRawEn,
  deploy: deployRawEn,
  'account-auth': authRawEn,
  'account-management': accountMgmtRawEn,
  dns: dnsRawEn,
  'workers-pages': workersPagesRawEn,
  tunnel: tunnelRawEn,
  storage: storageRawEn,
  'ai-rendering': aiRenderingRawEn,
  'app-store': appStoreRawEn,
  'api-v1': apiRawEn,
  security: securityRawEn,
  troubleshooting: troubleshootingRawEn,
  changelog: changelogRawEn,
  architecture: architectureRawEn
}

interface DocLocaleItem { slug: string; title: string; desc: string; group: string }

export function useDocs() {
  const { locale } = useI18n()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locales = locale.value === 'zh-CN' ? (zhCN as any).data : (en as any).data

  const docs = computed((): DocMeta[] => {
    const items = locales.docs as DocLocaleItem[]
    const rawMap = locale.value === 'zh-CN' ? RAW_CONTENT_ZH : RAW_CONTENT_EN
    return items.map((item: DocLocaleItem, i: number) => ({
      ...item,
      order: i + 1,
      content: rawMap[item.slug] || ''
    }))
  })

  const groups = computed(() => locales.docGroups as string[])

  function getDoc(slug: string): DocMeta | undefined {
    return docs.value.find((d) => d.slug === slug)
  }

  return { docs, groups, getDoc }
}
