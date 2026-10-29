import { useCallback, useEffect, useRef, useState } from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { ResizeState } from 'types/useResize'
import { useGitContext } from 'hooks/use-git-context'
import { RESIZE_MAX_WIDTH, RESIZE_MIN_WIDTH } from 'constants/constants'

export const useResize = (): ResizeState => {
  const [mouse] = useMouse()
  const [dragging, setDragging] = useState(false)
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ left: number; width: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  const { graphWidth, setGraphWidth } = useGitContext()

  useEffect(() => {
    if (!dragging) {
      return
    }

    // Measure once at drag start to avoid layout thrash
    // from getBoundingClientRect on every mousemove.
    if (graphContainerRef.current && !dragStartRef.current) {
      const rect = graphContainerRef.current.getBoundingClientRect()
      dragStartRef.current = { left: rect.x, width: rect.width }
    }

    const start = dragStartRef.current
    if (!start) {
      return
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const containerRight = start.left + start.width
      const newWidth = start.width + (mouse.x - containerRight)

      if (newWidth <= RESIZE_MAX_WIDTH && newWidth >= RESIZE_MIN_WIDTH) {
        setGraphWidth(newWidth)
      }
    })

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [dragging, mouse.x, setGraphWidth])

  useEffect(() => {
    const stopDragging = () => {
      setDragging(false)
      dragStartRef.current = null
    }

    window.addEventListener('mouseup', stopDragging)

    return () => {
      window.removeEventListener('mouseup', stopDragging)
    }
  }, [])

  const startResizing = useCallback(() => {
    dragStartRef.current = null
    setDragging(true)
  }, [])

  return {
    width: graphWidth,
    ref: graphContainerRef,
    startResizing
  }
}
