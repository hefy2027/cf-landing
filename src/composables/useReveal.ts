import { onMounted, onUnmounted, type Ref, watch } from 'vue'

/**
 * 滚动入场动效：观察 ref 容器内所有 [data-reveal] 元素，
 * 进入视口时添加 .revealed 类触发 CSS 过渡。
 *
 * 使用 MutationObserver 监听容器内新增的 [data-reveal] 元素
 * （如语言切换导致 v-for 重建），自动加入观察队列。
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null
  const observed = new WeakSet<HTMLElement>()

  function observeAll() {
    if (!observer || !root.value) return
    const targets = root.value.querySelectorAll<HTMLElement>('[data-reveal]')
    targets.forEach((t) => {
      if (!observed.has(t)) {
        observer!.observe(t)
        observed.add(t)
      }
    })
  }

  onMounted(() => {
    const el = root.value
    if (!el) return
    const initial = el.querySelectorAll<HTMLElement>('[data-reveal]')

    if (!('IntersectionObserver' in window) || initial.length === 0) {
      initial.forEach((t) => t.classList.add('revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const node = entry.target as HTMLElement
            const delay = node.dataset.revealDelay
            if (delay) node.style.transitionDelay = `${delay}ms`
            node.classList.add('revealed')
            observer?.unobserve(node)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    initial.forEach((t) => {
      observer!.observe(t)
      observed.add(t)
    })

    // 监听容器内 DOM 变化（如语言切换重建列表），新出现的 [data-reveal] 元素加入观察
    if ('MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        observeAll()
      })
      mutationObserver.observe(el, { childList: true, subtree: true })
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
  })
}
