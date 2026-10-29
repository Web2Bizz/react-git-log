import { PropsWithChildren, useEffect, useMemo } from 'react'
import styles from './GraphCore.module.scss'
import { useGitContext } from 'hooks/use-git-context'
import { useVisibleCommits } from 'hooks/use-visible-commits'
import { useColumnData } from 'hooks/use-column-data'
import { useResize } from 'hooks/use-resize'
import { DEFAULT_NODE_SIZE } from 'constants/constants'
import { GraphContext, GraphContextBag } from 'context/graph-context'
import { GraphCoreProps } from 'types/GraphCore'

export const GraphCore = <T,>({
  node,
  children,
  nodeSize = DEFAULT_NODE_SIZE,
  nodeTheme = 'default',
  breakPointTheme = 'dot',
  orientation = 'normal',
  enableResize = false,
  showCommitNodeHashes = false,
  showCommitNodeTooltips = false,
  highlightedBackgroundHeight,
  tooltip
}: PropsWithChildren<GraphCoreProps<T>>) => {
  const {
    paging,
    filter,
    setNodeSize,
    headCommit,
    indexCommit,
    isIndexVisible,
    setGraphOrientation,
    graphData: { graphWidth, commits }
  } = useGitContext<T>()

  useEffect(() => {
    // Informs the wrapping GitContext about the
    // change in certain props so other components can respond.
    setNodeSize(nodeSize)
    setGraphOrientation(orientation)
  }, [nodeSize, orientation, setGraphOrientation, setNodeSize])

  const { width, ref, startResizing } = useResize()

  const { visibleCommits } = useVisibleCommits({
    commits,
    filter,
    paging,
    indexCommit,
    isIndexVisible
  })

  const isHeadCommitVisible = useMemo<boolean>(() => {
    return visibleCommits.find(commit => commit.hash === headCommit?.hash) !== undefined
  }, [headCommit, visibleCommits])

  const { columnData, virtualColumns } = useColumnData({
    visibleCommits: visibleCommits.length
  })

  const contextValue = useMemo<GraphContextBag<T>>(() => ({
    node,
    showCommitNodeTooltips,
    showCommitNodeHashes,
    nodeTheme,
    breakPointTheme,
    nodeSize,
    graphWidth: graphWidth + virtualColumns,
    orientation,
    visibleCommits,
    columnData,
    isHeadCommitVisible,
    highlightedBackgroundHeight,
    tooltip
  }), [node, showCommitNodeTooltips, breakPointTheme, isHeadCommitVisible, showCommitNodeHashes, nodeTheme, nodeSize, graphWidth, virtualColumns, orientation, visibleCommits, columnData, highlightedBackgroundHeight, tooltip])

  return (
    <GraphContext.Provider value={contextValue as GraphContextBag}>
      <div className={styles.container} style={{ width }} ref={ref}>
        {children}

        {enableResize && (
          <button
            onMouseDown={startResizing}
            className={styles.dragHandle}
          />
        )}
      </div>
    </GraphContext.Provider>
  )
}
