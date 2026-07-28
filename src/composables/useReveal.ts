import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * 滚动入场动效：观察 ref 容器内所有 [data-reveal] 元素，
 * 进入视口时添加 .revealed 类触发 CSS 过渡。
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((t) => t.classList.add('revealed'))
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
    targets.forEach((t) => observer!.observe(t))
  })

  onUnmounted(() => observer?.disconnect())
}
