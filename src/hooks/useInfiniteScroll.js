import { useState, useEffect, useRef, useCallback } from 'react'

export function useInfiniteScroll(items, perPage = 20) {
  const [visibleCount, setVisibleCount] = useState(perPage)
  const loaderRef = useRef(null)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + perPage, items.length))
  }, [items.length, perPage])

  useEffect(() => {
    setVisibleCount(perPage)
  }, [items.length, perPage])

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  return { visibleItems, hasMore, loaderRef }
}
