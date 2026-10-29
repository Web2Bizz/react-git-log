import { ColumnBackgroundProps } from 'types/ColumnBackground'
import styles from './ColumnBackground.module.scss'
import { CSSProperties, useMemo } from 'react'
import { BACKGROUND_HEIGHT_OFFSET, ROW_HEIGHT } from 'constants/constants'
import { useGitContext } from 'hooks/use-git-context'
import { useGraphContext } from 'hooks/use-graph-context'

export const ColumnBackground = ({ id, index, colour }: ColumnBackgroundProps) => {
  const { showTable } = useGitContext()
  const { nodeSize, highlightedBackgroundHeight } = useGraphContext()

  const height = useMemo<number>(() => {
    if (highlightedBackgroundHeight) {
      return highlightedBackgroundHeight
    }

    const dynamicHeight = nodeSize + BACKGROUND_HEIGHT_OFFSET
    return dynamicHeight > ROW_HEIGHT ? ROW_HEIGHT : dynamicHeight
  }, [highlightedBackgroundHeight, nodeSize])

  const style = useMemo<CSSProperties>(() => {
    if (!showTable) {
      return {
        height,
        background: colour,
        width: 'calc(100% + 12px)',
        left: -12,
        borderRadius: 0
      }
    }

    // With the table shown the highlight must be a continuous strip
    // across the whole graph (from its left edge into the table).
    // Every column renders a full-width background so the hover does
    // not start at the commit circle. No rounding, square edges to
    // merge with the table row background. First column extends
    // left with a padding so the strip starts before the graph.
    if (index === 0) {
      return {
        height,
        background: colour,
        width: 'calc(100% + 12px)',
        left: -12,
        borderRadius: 0
      }
    }

    return {
      height,
      background: colour,
      width: '100%',
      left: 0,
      borderRadius: 0
    }
  }, [nodeSize, showTable, index, height, colour])

  return (
    <div
      id={`column-background-${index}-${id}`}
      data-testid={`column-background-${index}-${id}`}
      style={style}
      className={styles.background}
    />
  )
}
